//Right now only uses premixBus gain, leave object param empty to do so
function Reverb(file,object){

	this.file = file;
	this.object = object;
	this.convolver = acontext.createConvolver();

	if (this.object === undefined){
		this.object = premixBus;
	}
	this.object.connect(this.convolver);
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