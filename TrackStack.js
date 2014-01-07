//Warning: No support for irregular intervals between tracks yet
function TrackStack(files, parent){
	this.files 		 = files;
	this.parent 	 = parent;
	//x mixPosition
	this.mixPosition = mixPosition;
	this.filecounter = 0;
	this.tracks      = new Array();

	this.length = null; // longest track duration in seconds

	this.mixer = new Mixer();

	this.loadTracks = function(){
		//loads all associated tracks from disk, starts loading process
		for (var i = 0; i <= files.length - 1; i++){
			var track = new Track(files[i],this,0);
		    this.tracks.push(track);
		};
	}

	this.trackIsLoaded = function(){
		this.filecounter += 1;
		//for each track, start it! Because everything's loaded now, duh.
		if (this.filecounter == this.files.length){
			this.mixer.placeTracksOnAxis();
		}
	}

	this.startTrackStack = function(time){
		this.tracks.forEach(function(track){
			track.startTrack(time);
		});
	}

	//Constructor continued... now that function loadTracks() is known
	if(this.files.length > 0) { this.loadTracks() };
	
}