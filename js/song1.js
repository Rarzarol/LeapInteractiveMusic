//Song Parts
var imgCon = new ImageController();

//////////////////////////////////////////////////////////////////////////////////////////
var part0 = new SongPart([
 ["newtest/SP0_linksUnten.wav","newtest/SP0_linksMitte.wav",["newtest/SP0_linksOben.wav",0.9] ],
 ["newtest/SP0_mitteUnten.wav","newtest/SP0_mitteMitte.wav",["newtest/SP0_mitteOben.wav",0.9] ],
 ["newtest/SP0_rechtsUnten.wav","newtest/SP0_rechtsMitte.wav",["newtest/SP0_rechtsOben.wav",0.9] ]
 ]);
//////////////////////////////////////////////////////////////////////////////////////////
var part1 = new SongPart([
    [["part1test/sp1_untenlinks.wav",1],["part1test/sp1_obenlinks.wav",1]],
    [["part1test/sp1_untenrechts.wav",1],["part1test/sp1_obenrechts.wav",1]],
    [["part1test/sp1_untenrechts.wav",0.3],["part1test/sp1_obenrechts.wav",0.3]]
]);

var backingTrackPart1 = new Track("part1test/sp1_backing.wav",part1,1);
part1.addBackingTrack(backingTrackPart1,1);
//Hack...
part1.zVolumeControl = true;
///////////////////////////////////////////////////////////////////////////////////////////

/*var part1FX = new Filter(2.440,2);
part1.createFXTrack("newtest/SP1_akDr_oben.mp3",part1FX,0.4);*/

//var part1FX = new Phaser();
//part1.createFXTrack("FXtest/test_fx_fxtrack.wav",part1FX,1);

//////////////////////////////////////////////////////////////////////////////////////////
var part2 = new SongPart([
    [["newtest/SP1_linksUnten.wav",1.4],"newtest/SP1_linksMitte.wav","newtest/SP1_linksOben.wav" ],
    [["newtest/SP1_mitteUnten.wav",1.4],"newtest/SP1_mitteMitte.wav","newtest/SP1_mitteOben.wav" ],
    [["newtest/SP1_rechtsUnten.wav",1.4],"newtest/SP1_rechtsMitte.wav","newtest/SP1_rechtsOben.wav" ]
    ]);

//////////////////////////////////////////////////////////////////////////////////////////
var part3 = new SongPart([
    ["part3new/part3links.wav"],
    ["part3new/part3mitte.wav"],
    ["part3new/part3rechts.wav"]
]);
var part3FX = new Filter(12,440,4);
part3.createFXTrack("part3test/sp3_FXTrack_Drums.wav",part3FX,0.6);
var backingTrackPart3 = new Track("part3test/sp3_FXTrack_Drums.wav",part3,1);
part3.addBackingTrack(backingTrackPart3,1.2);
//////////////////////////////////////////////////////////////////////////////////////////

var fakePart = new SongPart([
    ["nothing.wav"]
]);

//Global Reverb
var reverb = new Reverb("rev_saintsilvain.wav",0.1);

var partTree = [part0,part1,part2,fakePart,fakePart,part3,part3];

//var partTree = [part0,part1,part2,part4,part4,part3,part3];

//All Songs are here.

var song0 = new Song(partTree,120);
//var song1 = new Song(partTree2,120);

changeSong(song0);