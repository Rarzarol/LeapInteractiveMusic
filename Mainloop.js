var songStarted = false;
var BUFFER_BETWEEN_PARTS = 0.003;

function gameLoop(){

	//see if we can start the song
	if(!songStarted){
		songStarted = song0.start();
	}
	//Animation

	//Main loop
	else{
		//Check if end of SongPart is near
		var currentPart = song0.getCurrentSongPart();
		var currentTime = acontext.currentTime;
		var diff = currentPart.endTime - currentTime;
		//console.log("Diff: "+diff);
		if(diff < BUFFER_BETWEEN_PARTS) {
			console.log("next part incoming...");
			if(song0.currentVals[1] < 0.5) {
				//start bottom next SongPart
				console.log("starting next bot part...");
				song0.startNextPart("bot");
			}
			else{
				//start upper next SongPart
				console.log("starting next top part...");
				song0.startNextPart("top");
			};
		}
		else{
			//do nothing?
		};
	};
}

window.setInterval(gameLoop,1000/60);