//Song Parts
var imgCon = new ImageController();

var part0 = new SongPart([
 ["newtest/SP0_linksUnten.wav","newtest/SP0_linksMitte.wav",["newtest/SP0_linksOben.wav",0.9] ],
 ["newtest/SP0_mitteUnten.wav","newtest/SP0_mitteMitte.wav",["newtest/SP0_mitteOben.wav",0.9] ],
 ["newtest/SP0_rechtsUnten.wav","newtest/SP0_rechtsMitte.wav",["newtest/SP0_rechtsOben.wav",0.9] ]
 ]);

/*var part1FX = new Filter(2.440,2);
part1.createFXTrack("newtest/SP1_akDr_oben.mp3",part1FX,0.4);*/

var part2 = new SongPart([
    [["newtest/SP1_linksUnten.wav",1.4],"newtest/SP1_linksMitte.wav","newtest/SP1_linksOben.wav" ],
    [["newtest/SP1_mitteUnten.wav",1.4],"newtest/SP1_mitteMitte.wav","newtest/SP1_mitteOben.wav" ],
    [["newtest/SP1_rechtsUnten.wav",1.4],"newtest/SP1_rechtsMitte.wav","newtest/SP1_rechtsOben.wav" ]
    ]);

var part1 = new SongPart([
    ["FXtest/test_fx_backing.wav"]
]);

var part1FX = new Phaser();
part1.createFXTrack("FXtest/test_fx_fxtrack.wav",part1FX,1);

//Global Reverb
var reverb = new Reverb("rev_saintsilvain.wav",0.1);

var partTree = [part0,part1,part2];

//All Songs are here.

var song0 = new Song(partTree,120);
//var song1 = new Song(partTree2,120);

changeSong(song0);