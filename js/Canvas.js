var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');

var bgImage = new Image();
bgImage.src = 'img/background.png';

var instructions = new Image();
instructions.src = "img/introtext2_sm.png";

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

var showIntroGraphic = true;

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
function drawGradient(scale,posX,posY) {
    console.log(scale);
    var gradient = context.createRadialGradient(posX, posY, scale, posX, posY, 2*scale);
    gradient.addColorStop(0, 'rgba(150,150,150,225)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(posX, posY, 2*scale, 0, 2 * Math.PI, true);
    context.fill();
}
function drawLoop() {
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
	context.clearRect(0, 0, canvas.width, canvas.height);
	var w = canvas.width;
    var h = canvas.height;
    var scale = imgCon.scale;
    var sw = 1.3 * w * scale;
    var sh = sw /(bgImage.width/bgImage.height);

    context.drawImage(bgImage, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);

    var verticalLines = imgCon.visibleLines;
    context.drawImage(overlayImageArray[verticalLines], -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
    drawGradient(1,canvas.width/2,canvas.height/2);
    context.globalAlpha = imgCon.getIntroAlpha();
    context.drawImage(instructions,canvas.width/2-instructions.width/2,canvas.height/2-instructions.height/2);

    printDebugMessages();
    requestAnimationFrame(drawLoop);
}

function newPositionHandler(){
    imgCon.scale = parsedPosition[2]/2+0.7;
    imgCon.calcVisibleLines(parsedPosition[1]);
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