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

//Das hier ist der DrawLoop. Er wird angestoßen durch
//image.onload = drawLoop(); (weiter unten) und ruft sich
//dann immer wieder selbst auf [siehe (requestAnimationFrame(drawLoop)]
//nachdem der Browser uns nen neuen Frame gerendert hat.
//Damit es hier aufgeraeumt bleibt habe ich eine Klasse imageController
//erstellt, die die aktuelle Beschaffenheit des Bildes repräsentiert.
//Der DrawLoop holt sich die informationen, wie das Bild im jetzigen Frame
//zu rendern ist immer vom imgCon (siehe: var scale = imgCon.scale (...)
//context.globalAlpha = imgCon.getAlpha()).
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
//Der imageController wird durch Events angesteuert und verändert,
//was hier beim newPositionHandler() deutlich wird.
//Er wird ausgeführt, wenn ein Event "newposition" gefeuert wurde
// (das macht der Leap-Loop in der init.js, immer wenn ein neuer LeapFrame und somit
// neue Positionen da sind, automatisch).
// Immer dann gibts neue Werte im global verfügbaren parsedPosition-Array.
// parsedPosition[0] ist X wert 0-1, parsedPosition[1] ist Y wert 0-1, parsedPosition[2] ist Z wert 0-1.

//im newPositionHandler wird das imgController Objekt imgCon in seinen Attributen verändert.
//Auf diese wird Dann in der obigen drawLoop() Funktion zurückgegriffen, um den aktuellen Zustand des Bildes
//(wie ist es gezoomt? wo sind verschiedene Elemente? etc). zu untersuchen und dann entsprechende
//Renderanweisungen an den Canvas zu geben. Momentan hab ich nur den Zoom eingebaut.

//was du machen müsstest: den newPositionHandler() erweitern, um Werte im imgCon zu verändern, und
//dann im drawloop ganz viele html5 canvas draw methoden schreiben, die diese werte entgegennehmen und daraus
//das aktuelle Bild malen.
function newPositionHandler(){
    imgCon.scale = parsedPosition[2];
    //Zum Beispiel hier: imgCon.gradientPosition = canvas.width*parsedPosition[0];
    //um den imgCon zu aktualisieren. Die Anweisung zum Rendern müsste
    //dann im drawLoop stehen, z.B. context.createRadialGradient(imgCon.gradientPosition...[sowie weitere Parameter,
    // die die Funktion so braucht])
}

$(document).on("newposition", newPositionHandler());

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