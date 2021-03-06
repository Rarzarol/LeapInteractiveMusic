function SongPart(partFileArray){
	this.loaded = false;
	this.fileArray = partFileArray;
	this.trackStacks = new Array();
	this.filecounter = 0;
	this.mixPosition = 0;
	this.mixer;
	this.maxPartLength = 0;
	//When does this particular SongPart start and end?
	this.startTime;
	this.endTime;
    this.backingTrack;
    this.FXTrack;
    this.effect;

    this.gainnode = acontext.createGain();
    this.gainnode.gain.setValueAtTime(1,acontext.currentTime);
    this.gainnode.connect(masterGain);

    this.zVolumeControl = false;

    this.addBackingTrack = function(track,volume){
        this.backingTrack = track;
        this.backingTrack.gainnode.connect(masterGain);
        this.backingTrack.gainnode.gain.setValueAtTime(volume,acontext.currentTime);
    };

    this.changeFX = function(x,y,z){
       if(this.effect != undefined){
           if(this.effect instanceof Filter){
               this.effect.changeFreqAtTime(z*5000,acontext.currentTime);
               //this.effect.changeQAtTime(x*5,acontext.currentTime);
               //this.effect.changeGainAtTime(y*10,acontext.currentTime);
           }    this.FXTrack.setVolume(acontext.currentTime,y);
           if(this.effect instanceof Reverb){
               fxbus.gain.setValueAtTime(z*2,acontext.currentTime);
           }
           if(this.effect instanceof Delay){
               this.effect.changeDelayTime(z);
           }
           if(this.effect instanceof Phaser){
               this.effect.changeDepth(z);
               this.effect.changeRate(y);
           }

       }
    };

    this.restart = function(){
        this.trackStacks.forEach(function(trackStack){
            trackStack.restart();
        });
        if(this.FXTrack != undefined){this.FXTrack.reloadBuffer();}
        if(this.backingTrack != undefined){this.backingTrack.reloadBuffer();}
    };

    this.fadeOut = function(fadetime){
      this.trackStacks.forEach(function(trackStack){
          trackStack.fadeOut(fadetime);
      })
    };

    this.createFXTrack = function(file,effect,gain){
        this.effect = effect;
        this.FXTrack = new Track(file,this);
        this.FXTrack.setVolume(acontext.currentTime,gain);
        //maybe connect to source directly
        this.effect.connect(this.FXTrack.gainnode);
    };

	this.createTrackStacks = function(){
		for (var i = 0; i <= this.fileArray.length - 1; i++){
			this.trackStacks.push(new TrackStack(this.fileArray[i],this));
		}
	};

	this.trackStackLoaded = function(length){
		this.filecounter += 1;
		var numberOfFiles = this.trackStacks.length  +
            (this.FXTrack      == undefined ? 0 : 1) +
            (this.backingTrack == undefined ? 0 : 1);
        if(this.maxPartLength < length){ this.maxPartLength = length; }
		if (this.filecounter == numberOfFiles){
			this.loaded = true;
		}
	};

    this.stop = function(time){
        this.trackStacks.forEach(function(trackStack){
            trackStack.stop(time);
        });
        if(this.FXTrack != undefined){this.FXTrack.stop(time);}
        if(this.backingTrack != undefined){this.backingTrack.stop(time);}
    };

	this.startSongPart = function(time){
		this.trackStacks.forEach(function(trackStack){
			trackStack.startTrackStack(time);
		});
		if(this.backingTrack != undefined){
            console.log("backingTrackStarted"); this.backingTrack.startTrack(time); }
        if(this.FXTrack != undefined)     { console.log("FXTrackStarted"); this.FXTrack.startTrack(time); }
	};

	this.mixTrackStacks = function(x,y,z){
		this.mixer.mixItems(x);
		for (var i = 0; i <= this.trackStacks.length - 1; i++){
			this.trackStacks[i].mixer.mixItems(y);
		}
		//STUB: Reverb mixing, still hardcoded
		//fxBus.gain.setValueAtTime(z/3,acontext.currentTime);
		//masterGain.gain.setValueAtTime(1-z,acontext.currentTime);
        if(this.zVolumeControl){
            this.gainnode.gain.setValueAtTime(z,acontext.currentTime);
        }
	};

	//Constructor contd.
	this.createTrackStacks();
	this.mixer = new Mixer(this.trackStacks,this);

}