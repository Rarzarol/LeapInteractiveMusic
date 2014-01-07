//Warning: No support for irregular intervals between tracks yet
function TrackStack(files, parent, mixPosition){
	this.files 		  = files;
	this.parent = parent;
	//x mixPosition
	this.mixPosition = mixPosition;
	this.filecounter = 0;
	this.tracks       = new Array();
	this.velocity 	  = 0.5;
	this.startTime;
	this.endTime;
	this.length = null; // longest track duration in seconds
	this.distance = 1 / (files.length-1);
	console.log("distance between each track is "+this.distance);

	this.loadTracks = function(){
		//loads all associated tracks from disk, starts loading process
		for (var i = 0; i <= files.length - 1; i++){
			var track = new track(files[i],this,0);
		    this.tracks.push(track);
		};
	}

	this.trackIsLoaded = function(){
		this.filecounter += 1;
		//for each track, start it! Because everything's loaded now, duh.
		if (this.filecounter == this.files.length){
			//Safe buffer, every track is started 1 second from now
			var starttime = acontext.getCurrentTime + 1;
			this.tracks.forEach(function(track){
				//Set TrackStack length to longest track length
				if(this.length == null) { this.length = track.length; }
				else if(this.length <= track.length) { this.length = track.length }
				track.startTrack(starttime);
			});
		this.placeTracksOnAxis();
		}
	}

	//Constructor continued... now that function loadTracks() is known
	if(this.files.length > 0) { this.loadTracks() };
	
}