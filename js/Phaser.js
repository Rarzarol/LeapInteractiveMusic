var phaser = new tuna.Phaser({
    rate: 8,                     //0.01 to 8 is a decent range, but higher values are possible
    depth: 0.3,                    //0 to 1
    feedback: 0.7,                 //0 to 1+
    stereoPhase: 30,               //0 to 180
    baseModulationFrequency: 1000,  //500 to 1500
    bypass: 0
});

function Phaser(){

    this.output = fxBus;

    this.connect = function(input){
        input.connect(phaser.input);
        phaser.connect(this.output);
    };

    this.changeRate = function(rate){
        phaser.rate = rate*8;
        console.log("changed Phaser rate to"+rate);
    };

    this.changeDepth = function(depth){
        phaser.depth = depth;
        console.log("changed Phaser depth to"+depth);
    };

}