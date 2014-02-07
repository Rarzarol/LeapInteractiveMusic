//Initialization of AudioContext, 2d Canvas Context, Leap Controller

//Audio Init
var acontext    = new window.webkitAudioContext();
var tuna        = new Tuna(acontext);
var masterGain  = acontext.createGain();
var fxBus	    = acontext.createGain();

fxBus.gain.setValueAtTime(2,acontext.currentTime);

var currentSong;

masterGain.connect(acontext.destination);
fxBus.connect(acontext.destination);

//Leap Init
var controller = new Leap.Controller();

//Global position data
var palmPosX;
var palmPosY;
var parsedPosition = {};
var handInScene;

//Slow polling to save CPU cycles
controller.on('connect', function(){
setInterval(function(){
    var frame = controller.frame();
    //c.clearRect(0,0,width,height);

	//Always use first hand
	if (frame.hands.length > 0){
        handInScene = true;
        timeOfHandNotRecognized = 0;
		var hand = frame.hands[0];
		if (hand.palmPosition[1] > 750 || hand.palmPosition[0] <= -350 || hand.palmPosition[0] >= 350){
            $.event.trigger({
                type: "handtoohigh",
                message: "handtoohigh",
                time: new Date()
            });
        }
        else{
            parsedPosition = parseLeapData(frame,hand);
            if (currentSong != undefined){ currentSong.mix(parsedPosition[0],parsedPosition[1],parsedPosition[2]); }
            $.event.trigger({
                type: "newposition",
                message: "newposition",
                time: new Date()
            });
            $.event.trigger({
                type: "handinside",
                message: "handinside",
                time: new Date()
            });
        }
	}
    else{
        //set flag: hands not recognized
        if(timeOfHandNotRecognized == 0){
            timeOfHandNotRecognized = acontext.currentTime
        }
        handInScene = false;
        $.event.trigger({
            type: "handoutside",
            message: "handoutside",
            time: new Date()
        });
    }
},10); //20 safe
});

//Fast polling, more taxing on CPU
//Right now only "frame", not device/animation frames
/*
controller.on( 'frame' , function( frame ) {
...
});
*/