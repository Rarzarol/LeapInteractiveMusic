var songStarted = false;
var BUFFER_BETWEEN_PARTS = 0.8;

function gameLoop(){

	//see if we can start the song
	if(!songStarted){
		songStarted = song0.start();
	}

	//Main loop
	else{

		//Beat check

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

				$.event.trigger({
					type: "botchosen",
					message: "bot was chosen",
					time: new Date()
				});

			}
			else{
				//start upper next SongPart
				console.log("starting next top part...");
				song0.startNextPart("top");
				//trigger an event to let animation know wassup
				$.event.trigger({
					type: "topchosen",
					message: "top was chosen",
					time: new Date()
				});
			};
		}
		else{
			//do nothing?
		};
	};
}

window.setInterval(gameLoop,1000/60);