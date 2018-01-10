export class Video {
	
	id: String;
	url: String;
	title: String;
	duration: String;
	thumbnail: String;

	constructor(url: String) {
		this.url = url;
		this.id = this.parseIdFromUrl( url );
	}

	private parseIdFromUrl( url ){
		var test = url.match(/watch\?v=(.*)/);
		//return test[1];
		return 'PRXtbLqIx04';
	}
}