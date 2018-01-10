import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map'

import { Video } from './models/video';

@Injectable()
export class VideoService {
	infoVideoUrl: string;

  constructor(private http: HttpClient) {
  	this.infoVideoUrl = ' https://www.googleapis.com/youtube/v3/videos';
  }

  getVideo( video ): Observable<Video>{
  	let params = new HttpParams();
  	params = params.append('id', video.id);
  	params = params.append('part', 'snippet,contentDetails');
  	params = params.append('key', 'AIzaSyADAurL3b0Rhqp20xRH3O0bJYXneiNrcBM');

  	return this.http.get<Video>( this.infoVideoUrl, { params: params } )
  		.map( (response) => {
  			video.title = response.items[0].snippet.title;
  			video.setDuration( response.items[0].contentDetails.duration );
  			video.thumbnail = response.items[0].snippet.thumbnails.medium;
  			return video;
  		});
  }

}
