function Filter(input,output,gain,hz,Q,bandwidth){

	this.filter = acontext.createBiquadFilter();
	this.filter.gain = gain;
	this.filter.type = "peaking";
	this.filter.Q = Q;
	this.filter.frequency = hz;

	input.connect(this.filter);
	this.filter.connect(output);

	this.changeFreqAtTime(freq,time){
		this.filter.frequency.linearRampToValueAtTime(freq,time);
	}

}