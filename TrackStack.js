//Warning: No support for irregular intervals between tracks yet
function TrackStack(files){
	this.files 		  = files;
	this.readycounter = 0;
	this.tracks   = new Array();
	this.velocity 	  = 0.5;
	this.startTime;
	this.endTime;
	this.length = null; // longest track duration in seconds
	this.distance = 1 / (files.length-1);
	console.log("distance between each track is "+this.distance);

	//Currently active tracks between which mixing occurs
	this.aboveTrack;
	this.belowTrack;

	//Last active Tracks are remembered for mixing purposes
	this.lastAboveTrack;
	this.lastBelowTrack;

	//This mixes tracks depending on a value. 
	//The function is called when Leap detects change on axis/we get a new frame.
	//Expects value between 0 and 1 (absolute hand position).
	//Breaks it down into relative value between 0 and 1 depending on position between 2 tracks.
	this.mixTracks = function(value){
		//Do something with the tracks Array, mix according to value 0-1
		console.log("_____________________________________________________");
		console.log("Value: "+value);
		//check between which tracks the hand is positioned, first calculate Track above, then below is given
		for (var i = 0 ; i <= this.tracks.length - 1; i++){
			if(value - this.tracks[i].position < 0){
				console.log("Value is between Tracks "+ Number(i - 1)+ " and " + Number(i));
				this.aboveTrack = this.tracks[i];
				this.belowTrack = this.tracks[i-1];
				break;
			}
		}

		if (undefined == this.lastBelowTrack){ 
			this.lastBelowTrack = this.belowTrack 
		}
		if (undefined == this.lastAboveTrack){ 
			this.lastAboveTrack = this.aboveTrack 
		}

		//If current tracks have changed...
		if(this.aboveTrack != this.lastAboveTrack){
			//...Turn down their volume.

			//BUT: new abovetrack could be last belowtrack (and vice versa)
			//therefore: no need to turn down its volume. This is checked here:

			//if movement downwards/to the left:
			if (this.aboveTrack === this.lastBelowTrack) {
				console.log("Keeping last below track as current aboveTrack");
				this.lastAboveTrack.fadeOut();
			}
			
			//if movement upwards/to the right:
			else if (this.belowTrack === this.lastAboveTrack) {
				console.log("Keeping last above track as current belowTrack");
				this.lastBelowTrack.fadeOut();
			}
			//Turn both tracks down, because hand is between two different tracks
			else {
				console.log("Dismiss aboveTrack and belowTrack because value is between two different ones");
				this.lastBelowTrack.fadeOut();
				this.lastAboveTrack.fadeOut();
				this.lastBelowTrack = this.belowTrack;
				this.lastAboveTrack = this.aboveTrack;
			}
			//Refresh track references
			this.lastBelowTrack = this.belowTrack;
			this.lastAboveTrack = this.aboveTrack;
		}

		//Calculate percentage: 0 -> value on belowTrack 1 -> value on aboveTrack
		var relvalue = (value - this.belowTrack.position)*(files.length - 1);
		console.log("relative distance between 2 current tracks: " + relvalue);

		//Set volume accordingly
		console.log("setting aboveTrack to " + Number(relvalue));
		this.aboveTrack.setVolume(acontext.currentTime,relvalue);
		console.log("setting belowTrack to " + Number(1-relvalue));
		this.belowTrack.setVolume(acontext.currentTime,1-relvalue);
	}

	//Places the tracks on an axis, evenly distributed, bottom/left to top/right
	this.placeTracksOnAxis = function(){
		var currentpos = 0;
		for (var i = 0 ; i <= this.tracks.length - 1; i++){
			console.log("Track id "+i+" has position: "+currentpos);
			this.tracks[i].position = currentpos;
			currentpos += this.distance;
		};
	}

	this.loadTracks = function(){
		//loads all associated tracks from disk, starts loading process
		for (var i = 0; i <= files.length - 1; i++){
			var track = new track(files[i],this,0);
		    this.tracks.push(track);
		};
	}

	this.trackIsLoaded = function(){
		this.readycounter += 1;
		//for each track, start it! Because everything's loaded now, duh.
		if (this.readycounter == this.files.length){
			//Safe buffer, every track is started 1 second from now
			var starttime = acontext.getCurrentTime + 1;
			this.tracks.forEach(function(track){
				//Set TrackStack length to longest track length
				if(this.length == null) { this.length = track.length; }
				else if(this.length <= track.length) { this.length = track.length }
				track.startTrack(starttime);
			});
		this.placeTracksOnAxis();
		}
	}

	//Constructor continued... now that function loadTracks() is known
	if(this.files.length > 0) { this.loadTracks() };
	
}