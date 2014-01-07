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
			console.log("Palm position: "+palmPosY);
		}
		else realY = 1;

		console.log("realY:"+realY);

		console.log("Original Leap Positions: "+palmPosX.toFixed(3)+"|"+palmPosY.toFixed(3)+"|"+palmPosZ.toFixed(3));
		var interactionBox = new Leap.InteractionBox(frame.interactionBox);
		var normalizedPositions = interactionBox.normalizePoint(hand.palmPosition,true);
		console.log("Parsed Leap Positions: "+normalizedPositions[0].toFixed(3)+"|"+normalizedPositions[1].toFixed(3)+"|"+normalizedPositions[2].toFixed(3));

		var myPositions = [normalizedPositions[0],realY-0.02,normalizedPositions[2]];
		return myPositions;
}