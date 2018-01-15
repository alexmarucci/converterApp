export class Video {
	
	id: String;
	url: String;
	title: String;
	duration: String;
	thumbnail: any;
	valid: Boolean;
	done: false;
	progress: any;
	status: any;

	constructor(url: String) {
		this.valid = false;
		this.url = url;
		this.title = url;
		this.id = this.parseIdFromUrl( url );
		this.progress = {percentage: '0.1', speed: '0'};
		this.status = 'Ready';
	}

	private parseIdFromUrl( url ){
		if (url) {
			// https://youtu.be/hNRHHRjep3E?t=2
			if (url.match(/youtu/) === null) {
				return null;
			}
			var test = url.match(/v=([^&]*)/);
			var test2 = url.match(/youtu\.be\/([^?]*)/);
			console.log( test2 );
			if (test && test.hasOwnProperty(1)) {
				this.valid = true;
				return test[1];
			} else if( test2 && test2.hasOwnProperty(1) ) {
				this.valid = true;
				return test2[1];
			}
		}

		return null;
	}

	setDuration(duration): void {
		this.duration = this.convert_time( duration );
	}

	private convert_time(duration) {
	    var a = duration.match(/\d+/g);

	    if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
	        a = [0, a[0], 0];
	    }

	    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
	        a = [a[0], 0, a[1]];
	    }
	    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
	        a = [a[0], 0, 0];
	    }

	    duration = 0;

	    if (a.length == 3) {
	        duration = duration + parseInt(a[0]) * 3600;
	        duration = duration + parseInt(a[1]) * 60;
	        duration = duration + parseInt(a[2]);
	    }

	    if (a.length == 2) {
	        duration = duration + parseInt(a[0]) * 60;
	        duration = duration + parseInt(a[1]);
	    }

	    if (a.length == 1) {
	        duration = duration + parseInt(a[0]);
	    }
	    return duration
	}
}