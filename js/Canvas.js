var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');
var image = new Image();
var slider_value = document.getElementById('slider_value');
var defaultval = 1.0;
var MIN_SCALE = 1.0;
var MAX_SCALE = 5.0;

function bottomChosenHandler(){

}

function topChosenHandler(){

}

$(document).on("topchosen", topChosenHandler);

$(document).on("botchosen", bottomChosenHandler);

function zoomHandler(){
    imgCon.scale = parsedPosition[2];
}

$(document).on("newposition", zoomHandler);

function drawLoop() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	var w = canvas.width;
    var h = canvas.height;
    var scale = imgCon.scale;
    var sw = w * scale;
    var sh = h * scale;
    context.globalAlpha = imgCon.getAlpha();
    context.drawImage(image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
    requestAnimationFrame(drawLoop);
}

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// Event handlers 
slider_value.onchange = function(e) {
defaultval = e.target.value;
if (defaultval < MIN_SCALE) imgCon.scale = MIN_SCALE;
else if (defaultval > MAX_SCALE) imgCon.scale = MAX_SCALE;
};

// Initialization
image.src = 'img/bgsmall.jpg';
image.onload = drawLoop();