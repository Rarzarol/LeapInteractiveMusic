function PartTrack(file,parent,position){
	this.parent   = parent;
	this.file     = file;
	this.gainnode = acontext.createGain();
	this.panner	  = acontext.createPanner();
	this.panner.panningModel = this.panner.EQUALPOWER;
	this.panner.setPosition(0, 0, 0);
	this.gainnode.gain.setValueAtTime(0,acontext.currentTime);
	this.length;
	//horizontal/vertical position. lower number left/bottom, higher number right/top.
	//float between 0 and 1.
	this.position = position;


	//Panner takes arguments in degrees. -90 to 90 degrees for total left/right panning.
	this.pan = function(range){
	  //Converts degrees to radians in the process
	  var x = Math.sin(range.value * (Math.PI / 180));
	  this.panner.setPosition(x, 0, 0);
	}

	this.setVolume = function(time,value){
		this.gainnode.gain.setValueAtTime(value,time);
	}

	this.fadeOut = function(){
		this.gainnode.gain.linearRampToValueAtTime(0,acontext.currentTime+0.2);
	}

	this.loadAsSample = function(string){
		this.bufferLoader = new BufferLoader(acontext,[string],this.finishedLoading.bind(this));
		this.bufferLoader.load();
	}

	this.finishedLoading = function(bufferlist){
		this.source = acontext.createBufferSource();
		this.source.buffer = bufferlist[0];
		this.source.loop = true;
		this.source.connect(this.panner);
		this.length = this.source.buffer.duration;
		this.panner.connect(this.gainnode);
		//TODO: set volume via function
		this.gainnode.connect(masterGain);
		parent.trackIsLoaded();
	}

	//Accessed externally
	this.startTrack = function(time){
		this.source.start(time);
	}

	this.loadAsSample(file);

}