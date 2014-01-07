//Globally used functions

//Currently only parses Y coordinate, 600 is max value (parsed to 1) and 40 min value (parsed to 0)
function parseLeapData(leapposX,leapposY){
	if (leapposY >= 40 && leapposY <= 600){
		leapposY -= 40;
		leapposY /= 600;
		console.log("Palm position: "+leapposY);
		return leapposY;
	}
	//check pos x and z
	else return -1;
}