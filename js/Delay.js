function Delay(time,times){
	this.delayNodes = new Array();
	this.times = times;
    this.input;
    this.time = time;
	this.output = fxBus;
	this.lastdelay;
    this.isConnected = false;
    this.TIMEDELTA = 0.7;

	this.connect = function(input){
        if(!this.isConnected){
            this.input = input;
            for (var i = 0; i <= this.times-1; i++) {
                var delay = acontext.createDelay();
                delay.delayTime = this.time;
                this.delayNodes.push(delay);

                //initialize with first delay connected to input
                if(i == 0) {
                    console.log("connecting first delay node to its input");
                    this.input.connect(delay);
                }
                //following delays will be connected to the one before
                else{
                    console.log("connecting additional delay...");
                    this.lastdelay.connect(delay);

                    //finally, when last delay is reached it is connected to actual output
                    if(i == this.times-1){
                        console.log("connecting last delaynode to output");
                        delay.connect(this.output);
                    }
                }

                //remember last delay for next connection
                this.lastdelay = delay;
                //TODO: hardcoded change
                this.time+=this.TIMEDELTA;
                console.log("SetupDelayNodes: newtime"+this.time);
            }

            this.isConnected = true;
        }
    };

	this.changeDelayTime = function(time){
		for (var i = this.delayNodes.length - 1; i >= 0; i--) {
			this.delayNodes[i].delayTime = time;
            time+=this.TIMEDELTA;
		}
	}
}