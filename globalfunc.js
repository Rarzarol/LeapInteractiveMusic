//Globally used functions

//Currently only parses Y coordinate, 600 is max value (parsed to 1) and 40 min value (parsed to 0)
function parseLeapData(frame,hand){
		palmPosX = hand.palmPosition[0];
		palmPosY = hand.palmPosition[1];
		palmPosZ = hand.palmPosition[2];

		var realY = palmPosY;
		if (realY >= 40 && realY <= 600){
			realY -= 40;
			realY /= 600;
		}
		else realY = 1;

		var realX = palmPosX;
		realX += 400;
		if (realX >= 0 && realX <= 800){
			realX /= 800;
			//console.log("Pos X: "+realX);
		}
		else if(realX > 800) realX = 1;
		else if(realX <= 0) realX = 0;

		//-200 -> 300, 500
		var realZ = palmPosZ;
		realZ += 200;
		if (realZ >= 0 && realZ <= 500){
			realZ /= 500;
			//console.log("Pos Z: "+realZ);
		}
		else if(realZ > 500) realZ = 1;
		else if(realZ <= 0) realZ = 0;

		//console.log("realY:"+realY);

/*		console.log("Original Leap Positions: "+palmPosX.toFixed(3)+"|"+palmPosY.toFixed(3)+"|"+palmPosZ.toFixed(3));
		console.log("Parsed Leap Positions: "+realX.toFixed(3)+"|"+realY.toFixed(3)+"|"+realZ.toFixed(3));*/

		var myPositions = [realX,realY,realZ];
		return myPositions;
}