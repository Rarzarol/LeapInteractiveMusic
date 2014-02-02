function Track(file,parent){
	this.parent   = parent;
	this.file     = file;
	this.mixPosition = 0;
	//Audio Stuff
	this.gainnode = acontext.createGain();
	this.panner	  = acontext.createPanner();
	this.panner.panningModel = this.panner.EQUALPOWER;
	this.panner.setPosition(0, 0, 0);
	this.gainnode.gain.setValueAtTime(1,acontext.currentTime);
	this.length;
	this.source;

	//Panner takes arguments in degrees. -90 to 90 degrees for total left/right panning.
	this.pan = function(range){
	  //Converts degrees to radians in the process
	  var x = Math.sin(range.value * (Math.PI / 180));
	  this.panner.setPosition(x, 0, 0);
	};

	this.setVolume = function(time,value){
        this.gainnode.gain.linearRampToValueAtTime(value,time+0.2);
	};

	this.fadeOut = function(){
		this.gainnode.gain.linearRampToValueAtTime(0,acontext.currentTime+0.2);
	};

	this.loadAsSample = function(string){
		this.bufferLoader = new BufferLoader(acontext,[string],this.finishedLoading.bind(this));
		this.bufferLoader.load();
	};

	this.finishedLoading = function(bufferlist){
		this.source = acontext.createBufferSource();
		this.source.buffer = bufferlist[0];
		//this.source.playbackRate.value = 3.0;
		this.source.loop = false;
		this.source.connect(this.panner);
		this.length = this.source.buffer.duration/*/3*/;
		this.panner.connect(this.gainnode);
		if (parent instanceof TrackStack) {
			this.parent.trackIsLoaded(this.length);
		}
        else if(parent instanceof SongPart){
            this.parent.trackStackLoaded(this.length);
        }
	};

	//Accessed externally
	this.startTrack = function(time){
		this.source.start(time);
	};

	this.loadAsSample(file);

}