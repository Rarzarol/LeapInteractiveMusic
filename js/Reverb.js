//Right now only uses premixBus gain, leave input param empty to do so
function Reverb(file,volume){

    this.volume = volume;
	this.file = file;
	this.input;
    this.gain = acontext.createGain();
    this.gain.gain.setValueAtTime(volume,acontext.currentTime);
	this.convolver = acontext.createConvolver();

	if (this.input === undefined){
		this.input = masterGain;
	}
	this.input.connect(this.convolver);
	this.convolver.connect(this.gain);
    this.gain.connect(fxBus);

    this.setInput = function(input){
        this.input = input;
    };

    this.setVolume = function(value,time){
        this.gain.gain.setValueAtTime(value,time);
    };

	this.loadIR = function(string){
		this.bufferLoader = new BufferLoader(acontext,[string],this.finishedLoading.bind(this));
		this.bufferLoader.load();
	};

	this.finishedLoading = function(bufferlist){
		this.convolver.buffer = bufferlist[0];
	};

	this.loadIR(file);

}