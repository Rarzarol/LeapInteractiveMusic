//Song Parts
/*var part0 = new SongPart([
	["choir_sub_a.wav" ,"choir_sub_e.wav" ,"choir_sub_i.wav" ],
	["choir_both_a.wav","choir_both_e.wav","choir_both_i.wav"],
	["choir_alto_a.wav","choir_alto_e.wav","choir_alto_i.wav"]
	]);*/

var part1 = new SongPart([["testSounds/SongPart1_unten.wav","testSounds/SongPart1_mitte.wav","testSounds/SongPart1_oben.wav"],["testSounds/SongPart1_unten.wav","testSounds/SongPart1_mitte.wav","testSounds/SongPart1_oben.wav"]]);

var part2 = new SongPart([["testSounds/SongPart2_unten.wav","testSounds/SongPart2_mitte.wav","testSounds/SongPart2_oben.wav"],["testSounds/SongPart2_unten.wav","testSounds/SongPart2_mitte.wav","testSounds/SongPart2_oben.wav"]]);

var part3 = new SongPart([["testSounds/SongPart3_unten.wav","testSounds/SongPart3_mitte.wav","testSounds/SongPart3_oben.wav"],["testSounds/SongPart3_unten.wav","testSounds/SongPart3_mitte.wav","testSounds/SongPart3_oben.wav"]]);

//Global Reverb
var reverb = new Reverb("rev_saintsilvain.wav");

var partTree = [part1,part2,part3];

var song0 = new Song(partTree);