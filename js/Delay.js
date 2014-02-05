function Delay(time,times){

    this.delay = new tuna.Delay({
        feedback: 0.9,    //0 to 1+
        delayTime: 430,    //how many milliseconds should the wet signal be delayed?
        wetLevel: 1,    //0 to 1+
        dryLevel: 1,       //0 to 1+
        cutoff: 20,        //cutoff frequency of the built in highpass-filter. 20 to 22050
        bypass: 0
    });

	this.times = times;
    this.input;
    this.time = time;
	this.output = fxBus;

    this.connect = function(input){
        input.connect(this.delay.input);
        this.delay.connect(this.output);
    };

    this.changeDelayTime = function(value){
        this.delay.delaytime = value*200
    };
}