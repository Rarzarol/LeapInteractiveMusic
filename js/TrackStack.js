function TrackStack(files, parent){
	this.files 		 = files;
	this.parent 	 = parent;
	this.filecounter = 0;
	this.tracks      = new Array();
	this.mixPosition = 0;
	this.gainnode 	 = acontext.createGain();
	this.gainnode.gain.setValueAtTime(0,acontext.currentTime);
	this.gainnode.connect(masterGain);
	this.maxFileLength = 0;
	this.mixer;

	this.createTracks = function(){
		//loads all associated tracks from disk, starts loading process
		for (var i = 0; i <= files.length - 1; i++){
            var volume;
            var filename;
            files[i] instanceof Array ? volume = files[i][1] : volume = 1;
            files[i] instanceof Array ? filename = files[i][0] : filename = files[i];
			var track = new Track(filename,this,volume);
		    track.gainnode.connect(this.gainnode);
		    this.tracks.push(track);
		}
	};

    this.stop = function(time){
        this.tracks.forEach(function(track){
            track.stop(time);
        })
    };

    this.restart = function(){
        this.tracks.forEach(function(track){
            track.reloadBuffer();
        })
    };

	this.trackIsLoaded = function(length){
		this.filecounter += 1;
		if(this.maxFileLength < length){ this.maxFileLength = length; };
		//for each track, start it! Because everything's loaded now, duh.
		if (this.filecounter == this.files.length){
			this.parent.trackStackLoaded(this.maxFileLength);
		}
	};

	this.startTrackStack = function(time){
		this.tracks.forEach(function(track){
			track.startTrack(time);
		});

	};

	this.setVolume = function(time,value){
		this.gainnode.gain.linearRampToValueAtTime(value,time+0.01);
	};

	this.fadeOut = function(fadeTime){
		this.gainnode.gain.linearRampToValueAtTime(0,fadeTime);
	};

	//Constructor continued
	this.createTracks();
	this.mixer = new Mixer(this.tracks,this);
	
}