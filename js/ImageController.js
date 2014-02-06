var FADE_DELTA = 0.05;

function ImageController(){
    this.visibleLines = 1;
    this.introAlpha = 0;
	this.scale = 1;
    this.gradientPosition = 0;
    this.isFadeOut = false;
    this.showWarning = false;
    this.darkenCanvas = false;
    this.darkenAlpha = 0;

    this.fadeOut = function(){
        this.isFadeOut = true;
    };

    this.fadeIn = function(){
        this.isFadeOut = false;
    };

    this.getBlacknessAlpha = function(){
        if(this.darkenCanvas){
            this.darkenAlpha < 0.8 ? this.darkenAlpha += 0.05 : this.darkenAlpha=0.8;
        }
        //!darkenCanvas
        else{
            if(this.darkenAlpha - FADE_DELTA > 0){
                this.darkenAlpha -= FADE_DELTA;
            }
            else{
                this.darkenAlpha = 0;
            }
        }
        return this.darkenAlpha;
    };

    this.getGradientPos = function(){
        return this.gradientPosition;
    };

    this.getIntroAlpha = function(){
        if (this.isFadeOut){
            if (this.introAlpha - FADE_DELTA > 0) {
                this.introAlpha -= FADE_DELTA;
            }
            else {
                this.introAlpha = 0;
            }
        }
        else{
            (this.introAlpha < 1) ?  this.introAlpha += 0.05 : this.introAlpha = 1;
        }
        return this.introAlpha;
    };

    this.calcVisibleLines = function(value){
        //console.log("Value"+value.toFixed(2));
        this.visibleLines = Math.floor(value*14);
        //console.log("integer:"+this.visibleLines);
    };
}