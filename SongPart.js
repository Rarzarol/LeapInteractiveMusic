function SongPart(partFileArray,parent,siblings){
	this.siblings = siblings;
	this.parent = parent;
	this.loaded = false;

	this.fileArray = partFileArray;
	this.trackStacks = new Array();
	this.filecounter = 0;
	this.mixPosition = 0;
	this.mixer;

	//Backing Track init
	/*this.backingTrack = new Track("choir_strings_backing.wav",this);
	this.backingTrack.gainnode.connect(premixBus);
	this.backingTrack.gainnode.gain.setValueAtTime(0.2,acontext.currentTime);*/

	this.maxPartLength = 0;
	//When does this particular SongPart start and end?
	this.startTime;
	this.endTime;

	this.createTrackStacks = function(){
		for (var i = 0; i <= this.fileArray.length - 1; i++){
			this.trackStacks.push(new TrackStack(this.fileArray[i],this));
		};
	}

	this.trackStackLoaded = function(length){
		this.filecounter += 1;
		if(this.maxPartLength < length){ this.maxPartLength = length; };
		if (this.filecounter == this.trackStacks.length){
			this.loaded = true;
		}
	}

	this.startSongPart = function(time){
		this.trackStacks.forEach(function(trackStack){
			trackStack.startTrackStack(time);
		});
		/*this.backingTrack.startTrack(time);*/
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