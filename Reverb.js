//Right now only uses premixBus gain, leave input param empty to do so
function Reverb(file,input){

	this.file = file;
	this.input = input;
	this.convolver = acontext.createConvolver();

	if (this.input === undefined){
		this.input = premixBus;
	}
	this.input.connect(this.convolver);
	this.convolver.connect(fxBus);

	this.loadIR = function(string){
		this.bufferLoader = new BufferLoader(acontext,[string],this.finishedLoading.bind(this));
		this.bufferLoader.load();
	}

	this.finishedLoading = function(bufferlist){
		this.convolver.buffer = bufferlist[0];
	}

	this.loadIR(file);

}