function Song(songPartTreeArray){

	this.startTime;
	this.endTime;
	this.songParts = songPartTreeArray;
	this.currentIndex;

	this.currentVals = {};

	//Starts everything.
	//Loop takes care of subsequent actions.
	this.start = function(){
		//check if every file is loaded
		if(this.allFilesLoaded()){
			//calculate positions for first part
			this.startTime = acontext.currentTime+3;
			this.songParts[0].startTime = this.startTime;
			this.songParts[0].endTime = this.startTime+this.songParts[0].maxPartLength;
			this.currentIndex = 0;
			//start first songpart. the loop will take care of subsequent starts.
			this.songParts[0].startSongPart(this.startTime);
			return true;
		}
		else {
			return false;
		};
	}

	this.mix = function(x,y,z){
		this.currentVals[0] = x;
		this.currentVals[1] = y;
		this.currentVals[2] = z;
		this.songParts[this.currentIndex].mixTrackStacks(x,y,z);
	}

	this.startNextPart = function(bot_top_string){
		//todo: is there a next index??
		var nextIndex;
		if(bot_top_string === "top"){
			nextIndex = 2*this.currentIndex+2;
		}
		if(bot_top_string === "bot"){
			nextIndex = 2*this.currentIndex+1;
		}
		this.songParts[nextIndex].startTime = this.songParts[this.currentIndex].endTime;
		this.songParts[nextIndex].endTime = this.songParts[nextIndex].startTime + this.songParts[nextIndex].maxPartLength;

		this.songParts[nextIndex].startSongPart(this.songParts[this.currentIndex].endTime);

		this.currentIndex = nextIndex;
	}

	this.getCurrentSongPart = function(){
		return this.songParts[this.currentIndex];
	}

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
			console.log("not all files are loaded!!");
			return false;
		}
	}
}