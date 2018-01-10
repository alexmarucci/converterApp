export class Video {
	
	id: String;
	url: String;
	title: String;
	duration: String;
	thumbnail: String;
	valid: Boolean;
	done: false;

	constructor(url: String) {
		this.valid = false;
		this.url = url;
		this.title = url;
		this.id = this.parseIdFromUrl( url );
	}

	private parseIdFromUrl( url ){
		if (url) {
			var test = url.match(/watch\?v=(.*)/);
			if (test && test.hasOwnProperty(1)) {
				this.valid = true;
				return test[1];
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