import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { VideoService } from '../../../../video.service';
import { Video } from '../../../../models/video';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
   stateCtrl: FormControl;
   results: any;

  constructor(private videoService: VideoService) {
       this.stateCtrl = new FormControl();
       this.stateCtrl.valueChanges
              .subscribe( query => this.getSuggestion(query) );
  }
  getSuggestion(keyword: string): Video[] {
    if ( keyword.length > 3) {
      this.videoService.getVideoSuggestion( keyword )
            .subscribe(videosKeywordSuggestion => { this.results = videosKeywordSuggestion;console.log( '-> ' + this.results ); })
    }
    return [];
  }

  ngOnInit() {
  }
}
