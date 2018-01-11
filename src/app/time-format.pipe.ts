import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
times = {
    year: 31557600,
    month: 2629746,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
}

  transform(seconds: any): string {
    seconds = parseInt(seconds);
    let time_string: string = '';
    let separator = ':';
    for(var key in this.times){
        if(Math.floor(seconds / this.times[key]) > 0){
            if (key == 'second') {
                separator = '';
            }
            time_string += Math.floor(seconds / this.times[key]).toString() + separator;
            seconds = seconds - this.times[key] * Math.floor(seconds / this.times[key]);

        }
    }
    return time_string;
  }
}