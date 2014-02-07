var songStarted = false;
var BUFFER_BETWEEN_PARTS = 0.3;
var TIME_UNTIL_RESTART = 20;
var timeOfHandNotRecognized;
var handsNotInFrameDiff;
var paused = true;
var initLoad = true;

function gameLoop(){

	//check if hand is in scene
    if(!handInScene && songStarted){
        handsNotInFrameDiff = acontext.currentTime - timeOfHandNotRecognized;
        if(handsNotInFrameDiff >= TIME_UNTIL_RESTART){
            //console.log("hand not recognized for set duration! restarting song");
            currentSong.stop(5);
            imgCon.fadeIn();
            paused = true;
        }
    }
    else if(handInScene && !songStarted){
        paused = false;
    }
	//see if we can start the song
	if(songStarted){
	//Main loop

		//Check if end of SongPart is near
		var currentPart = currentSong.getCurrentSongPart();
		var currentTime = acontext.currentTime;
		var diff = currentPart.endTime - currentTime;
        //console.log("diff is "+diff);
		if(diff < BUFFER_BETWEEN_PARTS) {
			console.log("next part incoming...");
			var isEnded = false;
            if(currentSong.currentVals[1] < 0.5) {
				//start bottom next SongPart
				console.log("starting next bot part...");
				isEnded = currentSong.startNextPart("bot");
				$.event.trigger({
					type: "botchosen",
					message: "bot was chosen",
					time: new Date()
				});
			}
			else{
				//start upper next SongPart
				console.log("starting next top part...");
				isEnded = currentSong.startNextPart("top");
				//trigger an event to let animation know wassup
				$.event.trigger({
					type: "topchosen",
					message: "top was chosen",
					time: new Date()
				});
			}
            //If last part has ended stop Song!
            if(isEnded){
                console.log("ENDEEE GELÄNDE");
                currentSong.stop(acontext.currentTime+ BUFFER_BETWEEN_PARTS);
            }
        }
		else{
			//do nothing?
		}
	}
    if(!paused && currentSong != undefined && !songStarted && currentSong.allFilesLoaded()){
        if(initLoad) {
            currentSong.start(); initLoad = false;
        }
        else {
            currentSong.restart();
        }
        imgCon.fadeOut();
        console.log("restarting song");
    }
}
window.setInterval(gameLoop,1000/60);