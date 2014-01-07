//Warning: No support for irregular intervals between tracks yet
function TrackStack(files, parent){
	this.files 		 = files;
	this.parent 	 = parent;
	this.filecounter = 0;
	this.tracks      = new Array();
	this.mixPosition = 0;
	this.gainnode 	 = acontext.createGain();
	this.gainnode.gain.setValueAtTime(0,acontext.currentTime);
	this.gainnode.connect(masterGain);

	this.length = null; // longest track duration in seconds

	this.mixer;

	this.createTracks = function(){
		//loads all associated tracks from disk, starts loading process
		for (var i = 0; i <= files.length - 1; i++){
			var track = new Track(files[i],this);
		    track.gainnode.connect(this.gainnode);
		    this.tracks.push(track);
		};
	}

	this.trackIsLoaded = function(){
		this.filecounter += 1;
		//for each track, start it! Because everything's loaded now, duh.
		if (this.filecounter == this.files.length){
			this.parent.trackStackLoaded();
		}
	}

	this.startTrackStack = function(time){
		this.tracks.forEach(function(track){
			track.startTrack(time);
		});

	}

	this.setVolume = function(time,value){
		this.gainnode.gain.setValueAtTime(value,time);
	}

	this.fadeOut = function(){
		this.gainnode.gain.linearRampToValueAtTime(0,acontext.currentTime+0.2);
	}

	//Constructor continued
	this.createTracks();
	this.mixer = new Mixer(this.tracks,this);
	
}