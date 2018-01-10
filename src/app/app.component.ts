import { OnInit, Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { VideoService } from './video.service';
import { Video } from './models/video';


@Component({
  selector: 'app-root',
  providers: [VideoService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  videos: Video[];
  newVideoUrl: String;

  constructor(private http: HttpClient, private videoService: VideoService) {
    this.videos = [];
    this.newVideoUrl = 'https://www.youtube.com/watch?v=PRXtbLqIx04';
  }
 
  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('https://jsonplaceholder.typicode.com/photos').subscribe(data => {
      // Read the result field from the JSON response.
      //this.videos = data;
    });
  }

  addVideo(){
    let newVideo = new Video(this.newVideoUrl);

    this.videoService.getVideo( newVideo ).subscribe(video => this.videos.push( video ))

    this.newVideoUrl = '';
  }
}
