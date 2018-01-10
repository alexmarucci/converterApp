import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable()
export class DownloadService {

  serviceProvider = '';

  constructor(private http: HttpClient) { }

  getLink(video_id: String){
      console.log(this.serviceProvider + video_id);
      
      this.http.get(this.serviceProvider + video_id).subscribe(
            // Successful responses call the first callback.
            data => {
                console.log( data );
            },
            // Errors will call this callback instead:
            err => {
              console.log('Something went wrong!');
            }
          );
  }

 
}
