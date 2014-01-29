function Delay(time,times,input,output){
	this.delayNodes = new Array();
	this.input = input;
	this.times = times;
	this.output = output;
	this.lastdelay;
	for (var i = times.length - 1; i >= 0; i--) {
		var delay = acontext.createDelay();
		delay.delayTime = time;
		this.delayNodes.push(delay);

		//initialize with first delay connected to input
		if(i === 0) { 
			this.input.connect(delay);
		}
		//following delays will be connected to the one before
		else{
			this.lastdelay.connect(delay);

			//finally, when last delay is reached it is connected to actual output
			if(i === this.times.length){
				this.delay.connect(this.output);
			}
		}

		//remember last delay for next connection
		this.lastdelay = delay;
	};

	this.changeDelayTime = function(time){
		for (var i = delayNodes.length - 1; i >= 0; i--) {
			delayNodes[i].delayTime = time;
		};
	}

}