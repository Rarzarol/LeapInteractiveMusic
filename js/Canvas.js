var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');

var bgImage = new Image();
bgImage.src = 'img/background.png';

var instructions = new Image();
instructions.src = "img/introtext2_sm.png";

var mask = new Image();
mask.src = "img/mask.png";

//Load overlay images
var overlayImageArray = new Array();
for(var i = 0; i<=14; i++){
    overlayImageArray[i] = new Image();
    overlayImageArray[i].src = String("img/"+(i+1)+".png");
}
overlayImageArray[14].onload = function(){
    controller.connect();
    drawLoop();
}

function writeMessage(message,x,y){
    var text;
    message == undefined ? text = "" : text = message;
    context.font = '24pt Calibri';
    context.fillStyle = 'grey';
    context.fillText(text, x, y);
}

function printDebugMessages() {
    context.globalAlpha = 1;
    writeMessage("Hand in scene:" + handInScene, 90, 40);
    writeMessage("Song started:" + songStarted, 90, 140);
    writeMessage("Time Hand NIF:" + timeOfHandNotRecognized, 90, 240);
    writeMessage("NIF diff:" + handsNotInFrameDiff, 90, 340);
}
function drawGradient(bgw,bgh,min,max,posX,posY) {
    context.fillStyle = '#333333';
    lowX = -bgw/2;
    lowY = bgh/2;
    context.beginPath();
    context.moveTo(lowX+200, lowY);
    context.lineTo(lowX+565,lowY-213);
    context.lineTo(lowX+1835,lowY-213);
    context.lineTo(lowX+2200,lowY);
    context.closePath();
    context.clip();

    var gradient = context.createRadialGradient(posX, posY, min, posX, posY, max);
    gradient.addColorStop(0, 'rgba(150,150,150,225)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = gradient;
    context.globalAlpha = 0.4;
    context.beginPath();

    context.arc(posX, posY, max, 0, 2 * Math.PI, true);
    context.fill();
}
function drawLoop() {
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
	context.clearRect(0, 0, canvas.width, canvas.height);
	var w = canvas.width;
    var h = canvas.height;
    var scale = imgCon.scale;
    var bgw = bgImage.width;
    var bgh = bgImage.height;
    //save for scaled content
    context.save();
    context.translate(w/2,h/2);
    context.scale(scale,scale);
    context.drawImage(bgImage, -bgw/2, -bgh/2);

    var verticalLines = imgCon.visibleLines;
    var overlay = overlayImageArray[verticalLines];
    context.drawImage(overlay, -bgw/2, -bgh/2);
    drawGradient(bgw,bgh,1,300,imgCon.getGradientPos(),500);

    context.restore();

    context.globalAlpha = imgCon.getIntroAlpha();
    context.drawImage(instructions,canvas.width/2-instructions.width/2,canvas.height/2-instructions.height/2);

    printDebugMessages();
    requestAnimationFrame(drawLoop);
}

function newPositionHandler(){
    imgCon.scale = parsedPosition[2]/2+0.7;
    imgCon.calcVisibleLines(parsedPosition[1]);
    imgCon.gradientPosition = (parsedPosition[0]*bgImage.width)-bgImage.width/2;
}

$(document).on("newposition", newPositionHandler);

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();