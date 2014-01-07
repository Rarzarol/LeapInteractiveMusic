//Initialization of AudioContext, 2d Canvas Context, Leap Controller

//Audio Init
var acontext = new window.webkitAudioContext();
var masterGain = acontext.createGain();
masterGain.connect(acontext.destination);

//Canvas Init
var canvas = document.getElementById( 'canvas' );
var width = canvas.width;
var height = canvas.height;
var c =  canvas.getContext( '2d' );
// Defines the font shape and size
c.font = "30px Arial";
c.textAlign = 'center';
c.textBaseline = 'middle';

var x = 0;
var y = 0;

//Leap Init
var controller = new Leap.Controller();

//Global position data
var palmPosX;
var palmPosY;

//Slow polling to save CPU cycles
controller.on('connect', function(){
setInterval(function(){
    var frame = controller.frame();
    //c.clearRect(0,0,width,height);

	//Always use first hand
	if (frame.hands.length > 0){
		var hand = frame.hands[0];
		var parsedPosition = parseLeapData(frame,hand);
		song1.mixTrackStacks(parsedPosition[0],parsedPosition[1],parsedPosition[2]);
	}
}, 50);
});

var numinput = document.getElementById("numinput");
numinput.onchange = function changeHandler() {
    song1.mixTracks(this.value);
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