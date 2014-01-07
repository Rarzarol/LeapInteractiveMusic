function SongPart(trackArray){
	this.trackStacks = new Array();
	this.filecounter = 0;
	this.trackstacks = trackArray.length;
	this.mixer;
	
	//Not used right now, when we have more SongParts these might come in useful
	this.startTime;
	this.endTime;

	this.createTrackStacks = function(){
		for (var i = 0; i <= files.length - 1; i++){
			trackStacks.push(new TrackStack(trackArray[i]),this);
		};
	}

	this.trackStackLoaded = function(){
		this.filecounter += 1;
		//for each track, start it! Because everything's loaded now, duh.
		if (this.filecounter == this.trackstacks.length){
			//Safe buffer, every track is started 1 second from now
			var starttime = acontext.getCurrentTime + 1;
			this.trackStacks.forEach(function(trackStack){
				trackStack.startTrackStack(starttime);
			});
		this.mixer.placeItemsOnAxis();
		}
	}

	//Constructor contd.
	this.createTrackStacks();
	this.mixer = new Mixer(trackStacks,this);

}