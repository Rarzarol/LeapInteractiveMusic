//Initialization of AudioContext, 2d Canvas Context, Leap Controller

//Audio Init
var acontext = new window.webkitAudioContext();
var masterGain = acontext.createGain();
var premixBus = acontext.createGain();
var fxBus	= acontext.createGain();
fxBus.gain.setValueAtTime(1,acontext.currentTime);
premixBus.connect(masterGain);

masterGain.connect(acontext.destination);
fxBus.connect(acontext.destination);

//Leap Init
var controller = new Leap.Controller();

//Global position data
var palmPosX;
var palmPosY;
var parsedPosition = {};

//Slow polling to save CPU cycles
controller.on('connect', function(){
setInterval(function(){
    var frame = controller.frame();
    //c.clearRect(0,0,width,height);

	//Always use first hand
	if (frame.hands.length > 0){
		var hand = frame.hands[0];
		parsedPosition = parseLeapData(frame,hand);
		song0.mix(parsedPosition[0],parsedPosition[1],parsedPosition[2]);
		$.event.trigger({
			type: "newposition",
			message: "newposition",
			time: new Date()
		});
	}
}, 100);
});

var numinput = document.getElementById("numinput");
numinput.onchange = function changeHandler() {
    song1.mixTracks(this.value,0,0);
};

//Fast polling, more taxing on CPU
//Right now only "frame", not device/animation frames
/*
controller.on( 'frame' , function( frame ) {
	c.clearRect(0,0,width,height);
	 //Tells Canvas to draw the input string at the defined position
	c.fillText( y , width/2 , height/2 );

	//Always use first hand
	if (frame.hands.length > 0){
		var hand = frame.hands[0];
		var palmPosY = hand.palmPosition[1];
		var palmPosX = hand.palmPosition[0];
		//Debug output
		console.log("Ypos: "+palmPosY+ "Xpos: "+palmPosX);
	}
});
*/