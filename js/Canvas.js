var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');
var image = new Image();

function bottomChosenHandler(){

}

function topChosenHandler(){

}

$(document).on("topchosen", topChosenHandler);

$(document).on("botchosen", bottomChosenHandler);

function drawLoop() {
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
	context.clearRect(0, 0, canvas.width, canvas.height);
	var w = canvas.width;
    var h = canvas.height;
    var scale = imgCon.scale/2+0.5;
    var sw = 1.3* w * scale;
    var sh = 1.3 * h * scale;
    context.globalAlpha = imgCon.getAlpha();
    context.drawImage(image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
    requestAnimationFrame(drawLoop);
}

function newPositionHandler(){
    imgCon.scale = parsedPosition[2];
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

// Event handlers
/*slider_x.onchange = function(e) {
    parsedPosition[0] = e.target.value;
    $.event.trigger({
        type: "newposition",
        message: "newposition",
        time: new Date()
    });
};
slider_y.onchange = function(e) {
    parsedPosition[1] = e.target.value;
    $.event.trigger({
        type: "newposition",
        message: "newposition",
        time: new Date()
    });
};
slider_z.onchange = function(e) {
    parsedPosition[2] = e.target.value;
    $.event.trigger({
        type: "newposition",
        message: "newposition",
        time: new Date()
    });
};*/

// Initialization
image.src = 'img/bgsmall.jpg';
image.onload = controller.connect();
image.onload = drawLoop();