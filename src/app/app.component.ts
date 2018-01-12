import { OnInit, Component, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ElectronService} from 'ngx-electron';

import { VideoService } from './video.service';
import { DownloadService } from './download.service';
import { Video } from './models/video';

@Component({
  selector: 'app-root',
  providers: [VideoService, DownloadService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  videos: Video[];
  newVideoUrl: String;

  constructor(private http: HttpClient, private videoService: VideoService, private downloadService: DownloadService, private electronService: ElectronService, private zone: NgZone) {
      let dummyVideo = new Video('url://');
      dummyVideo.id = 'PRXtbLqIx04';
      dummyVideo.title = 'PEACH PIT - peach pit';
      dummyVideo.thumbnail = {url: 'https://i.ytimg.com/vi/PRXtbLqIx04/mqdefault.jpg', width: 30, height: 40};
      dummyVideo.duration = '330';
    this.videos = [dummyVideo];
    this.videos.push( dummyVideo );
    this.newVideoUrl = 'https://www.youtube.com/watch?v=PRXtbLqIx04';
  }
 
  ngOnInit(): void {
     if(this.electronService.isElectronApp) {
       console.log( this.electronService );
      this.electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
        this.zone.run( () =>{ 
        let video = new Video( arg );
          this.addVideo( video );
        })
      })
     }
  }

  addVideo(newVideo: Video = null){
        console.log('asynchronous-reply' + newVideo);
      if (this.newVideoUrl.trim().length == 0 && newVideo === null) {
          return true;
      }
      console.log( newVideo );
     if (newVideo === null) {
        newVideo = new Video(this.newVideoUrl);
     }
    this.videos.push( newVideo );
    if ( newVideo.valid == true) {
      this.videoService.getVideo( newVideo ).subscribe(video => newVideo = video )
    }

    this.newVideoUrl = '';
  }

  startConversion(video: Video){
    if (video.id) {
      this.downloadService.getLink( video.id );
    }
  }
  onPaste(e: any ): void {
      alert( e.clipboardData.getData('text/plain') );
  }
  remove(video: Video): void {
    const index: number = this.videos.indexOf(video);
    if (index !== -1) {
        this.videos.splice(index, 1);
    }
  }
}