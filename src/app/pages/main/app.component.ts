import { OnInit, Component, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ElectronService} from 'ngx-electron';

import { VideoService } from '../../video.service';
import { DownloadService } from '../../download.service';
import { DatabaseService } from '../../database.service';
import { Video } from '../../models/video';

@Component({
  selector: 'app-root',
  providers: [VideoService, DownloadService, DatabaseService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  videos: Video[];
  options: any;
  constructor(private http: HttpClient, private videoService: VideoService, private downloadService: DownloadService, private database: DatabaseService, private electronService: ElectronService, private zone: NgZone) {
      this.videos = [];
      this.options = {
        'dense': false
      };
  }
 
  ngOnInit(): void {
      this.loadCollection();
     if(this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.on('clipboard-paste', (event, arg) => {
        this.zone.run( () => { 
          if (arg.length < 80) {
            this.addVideo( arg );
          }
        })
      })
     }
  }
  switchToDense(dense: Boolean){
    this.options.dense = dense;
  }
  loadCollection(){
    this.database.findAll().then(
          (videos: Video[]) => {
              this.videos = videos;
          },
          (err) => {
              console.log(err);
          }
      )
  }
  addVideo(videoUrl: String){
      videoUrl = videoUrl.trim();
      if (videoUrl.length == 0 || videoUrl.length > 80) {
          return true;
      }
    let newVideo = new Video(videoUrl);
    this.videos.push( newVideo );
    this.database.insert(newVideo).then(
          (newItem) => {
              //return this.loadCollection();
          },
          (err) => {
              console.log(err);
          }
      )
    if ( newVideo.valid === true) {
      this.videoService.getVideo( newVideo ).subscribe(video => {
          newVideo = video;

          this.database.update( video );
        })
    }
  }
  onPasteAction(): void {
    if(this.electronService.isElectronApp) {
      let textToPaste = this.electronService.clipboard.readText();
      this.addVideo( textToPaste );
    }
  }
  startDownload(video: Video){
    if (video.valid === true && video.id.length > 0) {
      let mp3 = this.downloadService.getMP3( video );

      this.downloadService.onProgress(function(progress) {
          console.log(JSON.stringify(progress.progress.percentage));
      });

    }
  }
  remove(video: Video): void {
    const index: number = this.videos.indexOf(video);
    if (index !== -1) {
        this.videos.splice(index, 1);
        this.database.remove( video.id );
    }
  }
}