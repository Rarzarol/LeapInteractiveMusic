function TrackStack(files, parent){
	this.files 		 = files;
	this.parent 	 = parent;
	this.filecounter = 0;
	this.tracks      = new Array();
	this.mixPosition = 0;
	this.gainnode 	 = acontext.createGain();
	this.gainnode.gain.setValueAtTime(0,acontext.currentTime);
	this.gainnode.connect(premixBus);
	this.maxFileLength = 0;
	this.mixer;

	this.createTracks = function(){
		//loads all associated tracks from disk, starts loading process
		for (var i = 0; i <= files.length - 1; i++){
			var track = new Track(files[i],this);
		    track.gainnode.connect(this.gainnode);
		    this.tracks.push(track);
		};
	}

	this.trackIsLoaded = function(length){
		this.filecounter += 1;
		if(this.maxFileLength < length){ this.maxFileLength = length; };
		//for each track, start it! Because everything's loaded now, duh.
		if (this.filecounter == this.files.length){
			this.parent.trackStackLoaded(this.maxFileLength);
		}
	}

	this.startTrackStack = function(time){
		this.tracks.forEach(function(track){
			track.startTrack(time);
		});

	}

	this.setVolume = function(time,value){
		this.gainnode.gain.setTargetAtTime(value,time,0.2);
	}

	this.fadeOut = function(){
		this.gainnode.gain.linearRampToValueAtTime(0,acontext.currentTime+0.2);
	}

	//Constructor continued
	this.createTracks();
	this.mixer = new Mixer(this.tracks,this);
	
}