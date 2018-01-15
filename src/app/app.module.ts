import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';

import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './pages/main/app.component';
import { VideoService } from './video.service';
import { TimeFormatPipe } from './time-format.pipe';
import { SearchComponent } from './pages/main/components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeFormatPipe,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgxElectronModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
