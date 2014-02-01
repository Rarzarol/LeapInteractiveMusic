//Dieses Objekt repräsentiert den aktuellen Zustand des Bildes
//und wird im drawLoop abgefragt und von Events verändert.
function ImageController(){

    //Skalierung des Bildes
	this.scale = 1;
    //Position des radial gradients
    this.gradientPosition = 0;
    //hier ist Platz für mehr :D hinzufügen mit this.attributName = Wert;
    // es ist dann abfragbar mit imgCon.attributName

	var beatAnimRunning = false;

    this.alpha = 1;          /// current alpha
    this.delta = 0.1;        /// delta value = speed

    //Is being called by animation loop
	this.getAlpha = function(){

		if(beatAnimRunning){
			/// increase alpha with delta value
	        this.alpha += this.delta;
	        
	        //// if delta <=0 or >=1 then reverse
	        if (this.alpha <= 0 || this.alpha >= 1) this.delta = -this.delta;
	    	//set false if delta complete
	    	if(this.alpha == 1) { beatAnimRunning = false; };
    	}
    	//Beat anim not running, return opaque
    	else{ this.alpha = 1 };

    	return this.alpha;
	}



}