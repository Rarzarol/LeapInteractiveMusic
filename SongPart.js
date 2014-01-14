function SongPart(fileArray){
	this.fileArray = fileArray;
	this.trackStacks = new Array();
	this.filecounter = 0;
	this.mixPosition = 0;
	this.mixer;
	//Still hardcoded reverb
	this.reverb = new Reverb("rev_saintsilvain.wav");

	//Backing Track init
	this.backingTrack = new Track("choir_strings_backing.wav",this);
	this.backingTrack.gainnode.connect(premixBus);
	this.backingTrack.gainnode.gain.setValueAtTime(0.2,acontext.currentTime);

	//Not used right now, when we have more SongParts these might come in useful
	this.startTime;
	this.endTime;

	this.createTrackStacks = function(){
		for (var i = 0; i <= this.fileArray.length - 1; i++){
			this.trackStacks.push(new TrackStack(this.fileArray[i],this));
		};
	}

	this.trackStackLoaded = function(){
		this.filecounter += 1;
		//for each track, start it! Because everything's loaded now, duh.
		if (this.filecounter == this.trackStacks.length){
			//Safe buffer, every track is started 1 second from now
			var starttime = acontext.getCurrentTime + 1;
			this.trackStacks.forEach(function(trackStack){
				trackStack.startTrackStack(starttime);
			});
		}
		//Backing track - not affeced by anything
		this.backingTrack.startTrack(starttime);
	}

	this.mixTrackStacks = function(x,y,z){
		this.mixer.mixItems(x);
		for (var i = 0; i <= this.trackStacks.length - 1; i++){
			this.trackStacks[i].mixer.mixItems(y);
		}
		//STUB: Reverb mixing, still hardcoded
		fxBus.gain.setValueAtTime(z,acontext.currentTime);
		masterGain.gain.setValueAtTime(1-z,acontext.currentTime);
	}

	//Constructor contd.
	this.createTrackStacks();
	this.mixer = new Mixer(this.trackStacks,this);

}