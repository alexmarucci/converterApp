import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map'

import { Video } from './models/video';

@Injectable()
export class VideoService {
  infoVideoUrl: string;
	searchVideoUrl: string;
  suggestionVideoUrl: string;

  constructor(private http: HttpClient) {
    this.infoVideoUrl = 'https://www.googleapis.com/youtube/v3/videos';
  	this.searchVideoUrl = 'https://www.googleapis.com/youtube/v3/search';
    this.suggestionVideoUrl = 'http://suggestqueries.google.com/complete/search';
  }

  getVideo( video ): Observable<Video>{
  	let params = new HttpParams();
  	params = params.append('id', video.id);
  	params = params.append('part', 'snippet,contentDetails');
  	params = params.append('key', 'AIzaSyADAurL3b0Rhqp20xRH3O0bJYXneiNrcBM');

  	return this.http.get<Video>( this.infoVideoUrl, { params: params } )
  		.map( (response: any) => {
  			video.title = response.items[0].snippet.title;
  			video.setDuration( response.items[0].contentDetails.duration );
  			video.thumbnail = response.items[0].snippet.thumbnails.medium;
  			return video;
  		});
  }

  searchByKeyword(query: string): Observable<Video[]>{
    let params = new HttpParams();
    let videos: Video[] = [];
    params = params.append('part', 'snippet');
    params = params.append('q', query);
    params = params.append('type', 'video');
    params = params.append('maxResults', '10');
    params = params.append('key', 'AIzaSyADAurL3b0Rhqp20xRH3O0bJYXneiNrcBM');

    return this.http.get<Video>( this.searchVideoUrl, { params: params } )
      .map( (response: any) => {
        for (var i = response.items.length - 1; i >= 0; i--) {
          response.items[i];
          let video = new Video('http://youtu.be/' + response.items[i].id.videoId);
          video.id = response.items[i].id.videoId;
          video.title = response.items[i].snippet.title;
          video.thumbnail = response.items[i].snippet.thumbnails.medium;
          videos.push( video );
        }
        return videos;
      }); 
  }

  getVideoSuggestion(query: string){
    let params = new HttpParams();
    let videos: Video[] = [];

    params = params.append('client', 'youtube');
    params = params.append('q', query);
    params = params.append('json', 't');
    params = params.append('format', '5');
    params = params.append('key', 'AIzaSyADAurL3b0Rhqp20xRH3O0bJYXneiNrcBM');

    return this.http.get<Video>( this.suggestionVideoUrl, { params: params } )
      .map(data => {
        
        return data[1];
      }); 
  }

}
