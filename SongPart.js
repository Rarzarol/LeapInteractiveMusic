function SongPart(fileArray){
	this.fileArray = fileArray;
	this.trackStacks = new Array();
	this.filecounter = 0;
	this.mixPosition = 0;
	this.mixer;

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
	}

	this.mixTrackStacks = function(x,y,z){
		this.mixer.mixItems(x);
		for (var i = 0; i <= this.trackStacks.length - 1; i++){
			this.trackStacks[i].mixer.mixItems(y);
		}
	}

	//Constructor contd.
	this.createTrackStacks();
	this.mixer = new Mixer(this.trackStacks,this);

}