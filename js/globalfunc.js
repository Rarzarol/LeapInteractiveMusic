//Globally used functions

var smoothedX = 0;
var smoothedY = 0;
var smoothedZ = 0;
var samples = 8;

//Currently only parses Y coordinate, 600 is max value (parsed to 1) and 40 min value (parsed to 0)
function parseLeapData(frame,hand){
		palmPosX = hand.palmPosition[0];
		palmPosY = hand.palmPosition[1];
		palmPosZ = hand.palmPosition[2];

        /*sphereRadius = hand.sphereRadius;
        console.log(sphereRadius);*/

        smoothedX = smoothedX + ((palmPosX-smoothedX)/(samples/3));
        smoothedY = smoothedY + ((palmPosY-smoothedY)/(samples/3));
        smoothedZ = smoothedZ + ((palmPosZ-smoothedZ)/samples);

		var realY = palmPosY; //smoothedY;
		if (realY >= 40 && realY <= 600){
			realY -= 40;
			realY /= 600;
		}
		else if (realY < 40){ realY = 0;
        }
        else if(realY > 600){ realY = 1;
        }

		var realX = palmPosX; //smoothedX; //was 800
		realX += 350;
		if (realX >= 0 && realX <= 700){
			realX /= 700;
			//console.log("Pos X: "+realX);
		}
		else if(realX > 700) realX = 1;
		else if(realX <= 0) realX = 0;

		//-200 -> 300, 500
		var realZ = smoothedZ;
		realZ += 200;
		if (realZ >= 0 && realZ <= 500){
			realZ /= 500;
			//console.log("Pos Z: "+realZ);
		}
		else if(realZ > 500) realZ = 1;
		else if(realZ <= 0) realZ = 0;

		//console.log("realY:"+realY);

		//console.log("Original Leap Positions: "+palmPosX.toFixed(3)+"|"+palmPosY.toFixed(3)+"|"+palmPosZ.toFixed(3));
		//console.log("Parsed Leap Positions: "+realX.toFixed(3)+"|"+realY.toFixed(3)+"|"+realZ.toFixed(3));

		var myPositions = [realX,realY,realZ];
		return myPositions;
}

function changeSong(song){

    if (currentSong != undefined){
        song.stop(acontext.currentTime);
    }
    currentSong = song;
}