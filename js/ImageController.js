var FADE_DELTA = 0.05;

function ImageController(){
    this.visibleLines = 1;
    this.introAlpha = 0;
	this.scale = 1;
    this.gradientPosition = 0;
    this.isFadeOut = false;

    this.fadeOut = function(){
        this.isFadeOut = true;
    };

    this.fadeIn = function(){
        this.isFadeOut = false;
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