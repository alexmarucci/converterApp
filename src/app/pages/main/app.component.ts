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
          if (arg.length < 200) {
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
  private isDuplicate( video: Video ){
    for (var i = this.videos.length - 1; i >= 0; i--) {
      if (this.videos[i].id === video.id ) {
        return true;
      }
    }
    return false;
  }
  addVideo(videoUrl: String){
      videoUrl = videoUrl.trim();

      if (videoUrl.length == 0 || videoUrl.length > 200) {
          return true;
      }
    let newVideo = new Video(videoUrl);
    if (this.isDuplicate( newVideo )) {
      return true;
    }
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
    if (video.valid === true && video.id.length > 0 && video.status == 'Ready') {
      video.status = 'Queue';
      let mp3 = this.downloadService.getMP3( video );

      this.downloadService.onProgress((progress) => {
           this.zone.run( () => { 
             if (video.id == progress.videoId) {
               if (video.status == 'Queue') {
                 video.status = 'Downloading..';
               }
                video.progress = progress.progress;
             }
          })
      });

      this.downloadService.onCompleted((err, data) => {
        this.zone.run( () => {
          if (err) {
            console.log( err );
          } else if(data.videoId == video.id){
            video.status = 'Completed';
            this.database.update( video );
          }
        })
      });
    }
  }
  remove(video: Video): void {
    const index: number = this.videos.indexOf(video);
    if (index !== -1) {
      this.downloadService.removeDownload( video );
      this.videos.splice(index, 1);
      this.database.remove( video.id );
    }
  }
  downloadAll(){
    for (var i = this.videos.length - 1; i >= 0; i--) {
      if (this.videos[i].status == 'Ready') {
        this.startDownload( this.videos[i] );
      }
    }
  }
}