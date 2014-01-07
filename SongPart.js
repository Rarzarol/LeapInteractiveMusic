function SongPart(trackArray){
	this.trackStacks = new Array();
	this.filecounter = 0;
	this.trackstacks = trackArray.length;
	this.mixer = new Mixer();


	this.parseTrackArray = function(){

	}

	this.createTrackStacks = function(){

	}

	this.trackStackLoaded = function(){
		this.filecounter += 1;
		//for each track, start it! Because everything's loaded now, duh.
		if (this.filecounter == this.trackstacks.length){
			//Safe buffer, every track is started 1 second from now
			var starttime = acontext.getCurrentTime + 1;
			this.tracks.forEach(function(track){
				//Set TrackStack length to longest track length
				if(this.length == null) { this.length = track.length; }
				else if(this.length <= track.length) { this.length = track.length }
				track.startTrack(starttime);
			});
		this.mixer.placeStacksOnAxis();
		}
	}




}