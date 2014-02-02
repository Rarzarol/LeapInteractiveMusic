//Song Parts
/*var part0 = new SongPart([
	["choir_sub_a.wav" ,"choir_sub_e.wav" ,"choir_sub_i.wav" ],
	["choir_both_a.wav","choir_both_e.wav","choir_both_i.wav"],
	["choir_alto_a.wav","choir_alto_e.wav","choir_alto_i.wav"]
	]);*/
var imgCon = new ImageController();

var part1 = new SongPart(
	[
	["finaltest/SP0_untenLinks.mp3","finaltest/SP0_mitteLinks.mp3","finaltest/SP0_obenLinks.mp3"],
	["finaltest/SP0_untenMitte.mp3","finaltest/SP0_mitteMitte.mp3","finaltest/SP0_obenMitte.mp3"],
	["finaltest/SP0_untenRechts.mp3","finaltest/SP0_mitteRechts.mp3","finaltest/SP0_obenRechts.mp3"]
	]);

/*var part1FX = new Filter(2.440,2);
part1.createFXTrack("finaltest/SP1_akDr_oben.mp3",part1FX,0.4);*/

var part2 = new SongPart([["finaltest/SP1_akDr_unten.mp3","finaltest/SP1_akDr_oben.mp3"],["finaltest/SP1_akDr_unten.mp3","finaltest/SP1_akDr_oben.mp3"]]);



var part3 = new SongPart([["finaltest/SP2_elDr_unten.mp3","finaltest/SP2_elDr_oben.mp3"],["finaltest/SP2_elDr_unten.mp3","finaltest/SP2_elDr_oben.mp3"]]);

//Global Reverb
var reverb = new Reverb("rev_saintsilvain.wav",0.1);

var partTree = [part1,part2,part3];

var song0 = new Song(partTree,120);