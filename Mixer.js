function Mixer(items,parent){

	this.distance = 1 / (files.length-1);
	console.log("distance between each track is "+this.distance);

	this.items = items;
	this.parent = parent;

	//Currently active items between which mixing occurs
	this.aboveItem;
	this.belowItem;

	//Last active items are remembered for mixing purposes
	this.lastAboveitem;
	this.lastBelowitem;

	//Places the items on an axis, evenly distributed, bottom/left to top/right
	this.placeitemsOnAxis = function(){
		var currentpos = 0;
		for (var i = 0 ; i <= this.items.length - 1; i++){
			console.log("item id "+i+" has mixPosition: "+currentpos);
			this.items[i].mixPosition = currentpos;
			currentpos += this.distance;
		};
	}
	
	//This mixes Items depending on a value. 
	//The function is called when Leap detects change on axis/we get a new frame.
	//Expects value between 0 and 1 (absolute hand position).
	//Breaks it down into relative value between 0 and 1 depending on position between 2 Items.
	this.mixItems = function(value){
		//Do something with the Items Array, mix according to value 0-1
		console.log("_____________________________________________________");
		console.log("Value: "+value);
		//check between which Items the hand is positioned, first calculate Item above, then below is given
		for (var i = 0 ; i <= this.items.length - 1; i++){
			if(value - this.items[i].mixPosition < 0){
				console.log("Value is between Items "+ Number(i - 1)+ " and " + Number(i));
				this.aboveItem = this.items[i];
				this.belowItem = this.items[i-1];
				break;
			}
		}

		if (undefined == this.lastBelowItem){ 
			this.lastBelowItem = this.belowItem 
		}
		if (undefined == this.lastAboveItem){ 
			this.lastAboveItem = this.aboveItem 
		}

		//If current Items have changed...
		if(this.aboveItem != this.lastAboveItem){
			//...Turn down their volume.

			//BUT: new aboveItem could be last belowItem (and vice versa)
			//therefore: no need to turn down its volume. This is checked here:

			//if movement downwards/to the left:
			if (this.aboveItem === this.lastBelowItem) {
				console.log("Keeping last below Item as current aboveItem");
				this.lastAboveItem.fadeOut();
			}
			
			//if movement upwards/to the right:
			else if (this.belowItem === this.lastAboveItem) {
				console.log("Keeping last above Item as current belowItem");
				this.lastBelowItem.fadeOut();
			}
			//Turn both Items down, because hand is between two different Items
			else {
				console.log("Dismiss aboveItem and belowItem because value is between two different ones");
				this.lastBelowItem.fadeOut();
				this.lastAboveItem.fadeOut();
				this.lastBelowItem = this.belowItem;
				this.lastAboveItem = this.aboveItem;
			}
			//Refresh Item references
			this.lastBelowItem = this.belowItem;
			this.lastAboveItem = this.aboveItem;
		}

		//Calculate percentage: 0 -> value on belowItem 1 -> value on aboveItem
		var relvalue = (value - this.belowItem.mixPosition)*(files.length - 1);
		console.log("relative distance between 2 current Items: " + relvalue);

		//Set volume accordingly
		console.log("setting aboveItem to " + Number(relvalue));
		this.aboveItem.setVolume(acontext.currentTime,relvalue);
		console.log("setting belowItem to " + Number(1-relvalue));
		this.belowItem.setVolume(acontext.currentTime,1-relvalue);
	}

}