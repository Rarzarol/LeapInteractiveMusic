function Filter(gain,hz,Q){
	this.filter = acontext.createBiquadFilter();
	this.filter.gain.setValueAtTime(gain,acontext.currentTime);
	this.filter.type = "peaking";
	this.filter.Q = Q;
	this.filter.frequency = hz;
    this.input;
    this.output = fxBus;

    this.connect = function(input){
        input.connect(this.filter);
        this.filter.connect(this.output);
    };

	this.changeFreqAtTime = function(freq,time){
		this.filter.frequency.setValueAtTime(freq,time);
	};

    this.changeQAtTime = function(q,time){
        this.filter.Q.setValueAtTime(q,time);
    };

    this.changeGainAtTime = function(gain,time){
        this.filter.gain.setValueAtTime(gain,time);
    };

}