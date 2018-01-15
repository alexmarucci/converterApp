import { Injectable } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {YoutubeMp3Downloader} from 'youtube-mp3-downloader';
import {Video} from './models/video';

@Injectable()
export class DownloadService {

  serviceProvider = '';

  constructor(private electronService: ElectronService) { }

  getMP3(video: Video ){
    this.electronService.ipcRenderer.send('request-download', video);
  }
  removeDownload(video: Video){
    this.electronService.ipcRenderer.send('remove-download', video);
  }

  onProgress(closure){
    this.electronService.ipcRenderer.on('download-progress', (event, arg) => {
      closure( arg )
      })
  }

  onError(closure){
    this.electronService.ipcRenderer.on('download-error', (event, arg) => {
      closure( arg )
    })
  }
  onCompleted(closure){
    this.electronService.ipcRenderer.on('download-finished', (event, arg) => {
      closure( arg.err, arg.data )
    })
  }
 
}
