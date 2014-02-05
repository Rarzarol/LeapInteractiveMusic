function Song(songPartTreeArray,bpm){

	this.bpm = bpm;
	this.bps = bpm/60;
	this.startTime;
	this.endTime;
	this.songParts = songPartTreeArray;
	this.currentIndex;

	this.currentVals = {};

	//Starts everything.
	//Loop takes care of subsequent actions.
	this.start = function(){
		//check if every file is loaded
			//calculate positions for first part
			this.startTime = acontext.currentTime+3;
			this.songParts[0].startTime = this.startTime;
			this.songParts[0].endTime = this.startTime+this.songParts[0].maxPartLength;
			this.currentIndex = 0;
			//start first songpart. the loop will take care of subsequent starts.
			this.songParts[0].startSongPart(this.startTime);
            songStarted = true;
    };

    this.restart = function(){
        this.songParts.forEach(function(songPart){
            songPart.restart();
        });
        this.start();
    };

    this.stop = function(time){
        var currTime = acontext.currentTime;
        var fadeTime = currTime+time;
        var stopTime = fadeTime;
        console.log("current time: "+currTime.toFixed(2));
        console.log("FadeTime"+fadeTime.toFixed(2)+"StopTime"+stopTime.toFixed(2));
        this.songParts.forEach(function(songPart){
            //maybe add fade
            songPart.fadeOut(fadeTime);
            songPart.stop(stopTime);
            songStarted = false;
        })
    };

	this.mix = function(x,y,z){
		//maybe always mix 3? Current node and following nodes
		this.currentVals[0] = x;
		this.currentVals[1] = y;
		this.currentVals[2] = z;
		this.songParts.forEach(function(songPart){
			songPart.mixTrackStacks(x,y,z);
            songPart.changeFX(x,y,z);
		});
	};

	this.startNextPart = function(bot_top_string){
		var nextIndex;
		if(bot_top_string === "top"){
			nextIndex = 2*this.currentIndex+2;
		}
		if(bot_top_string === "bot"){
			nextIndex = 2*this.currentIndex+1;
		}
        if(this.songParts[nextIndex] == undefined){ return true; }
		this.songParts[nextIndex].startTime = this.songParts[this.currentIndex].endTime;
		this.songParts[nextIndex].endTime = this.songParts[nextIndex].startTime + this.songParts[nextIndex].maxPartLength;
		this.songParts[nextIndex].startSongPart(this.songParts[this.currentIndex].endTime);
		this.currentIndex = nextIndex;
        return false;
	};

	this.getCurrentSongPart = function(){
		return this.songParts[this.currentIndex];
	};

	this.allFilesLoaded = function(){
		var counter = 0;
		this.songParts.forEach(function(songPart){
			if (songPart.loaded){
				counter += 1;
			}
		});
		//If every Part is loaded, start the first.
		if(counter === this.songParts.length) {
			return true;
		}
		else {
			//console.log("not all files are loaded!!");
			return false;
		}
	}
}