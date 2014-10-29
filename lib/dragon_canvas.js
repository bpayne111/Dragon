/*jslint browser: true, devel: true, newcap: true, plusplus: true, sloppy: true, todo: true, white: true */
/* jshint trailing: false, undef: true, smarttabs: true */
/* NOTES
http://www.createjs.com/tutorials/Basics%20and%20Best%20Practices/
http://www.html5rocks.com/en/tutorials/canvas/performance/
https://github.com/tzuryby/jquery.hotkeys 
http://www.html5rocks.com/en/tutorials/canvas/notearsgame/
http://devbutze.blogspot.com.br/2013/09/requestanimationframe-is-what-you-need.html
https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame */	

/* TODO    
 -pause sound
 -restrict movement to map
 - collison detection 
 -allow 2 directions to be pressed, or create direction heirarchy
 -keyMaster?
-game state file for saving/loading/etc 
-ADD AI FOR RED GUY
 window.MYNAMESPACE = {}; CAN USE THIS INSIDE FUNCTIONS TO MAKE GLOBAL VARIABLES

*/
//bp.ready();
window.onbeforeunload = function() {
  saveGame(); 
 // return 'Saving Changes';  //creates popup on exit
}; //move to init
var toonsCatd, theToons = {}, FRAMECOUNT = 0, unit = 100, xAxis, yAxis, height, width, FPS, 
    ctx = [], theGames = [],
    requestAniFrame = (function(callback) {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setInterval(callback, 1000 / 60); //FUCK WITH THIS A BIT
    })();


function init(){

bp("Initializing Canvas and Variables...");  
//make canvas
  var j, gameBox = $('<div id="game" />').width('900px').height('450px');     
//append canvas'
  for (j=0; j< 3; j++){   
    var aCanvas = $('<canvas>').attr({ id: "cv" + j,
                                       width: gameBox.width(),
                                       height: gameBox.height()                                    
                             }).css({ 'position': 'absolute' });
                                      //'left': '1px', 'top': '1px'  }); 
    $(gameBox).append(aCanvas);    
  }//end loop
  
  $(gameBox).appendTo('body');

$(document.createElement('div')).addClass( 'hud').append('<div id="healthBar" />').appendTo('#game');
 $(document.createElement('div')).attr({id: 'cover'}).css({ opacity:'.9', 'position': 'absolute', 'width': '900px', 'height': '450px', 'background-color': '#d2b48c' }).appendTo('#game');

//$(document.createElement('div')).attr({ id: 'healthBar'}).addClass('hud').appendTo('#game');

//setup canvas
  ctx.length = $('canvas').length;
  $('canvas').each(function(index) { 
	  ctx[index] = this.getContext("2d");});
	
  $('#healthBar').progressbar({value: 37 }); //$('#healthBar').progressbar("value", 85) ANOTHER STYLE

//create toon object
  $.getJSON('lib/TESTTOONS.json', function(toonProps) {  //get JSON is async
     toonsCatd = $.extend(true,{}, toonProps, SUPERToons );
  
	 $.each(toonsCatd, function( index, value ) {
		if( (typeof value == "object") && (value.media.spriteURL)){    
				value.media.image = new Image();
				value.media.image.src = value.media.spriteURL;			
		}//end if
	});//end each
theToons = $.extend(true, {}, toonsCatd);  
})// end getJSON
 
  //initialize variables	
	FPS = 30;
  xAxis = Math.floor(height/2); yAxis = Math.floor(width/4);
  height = $('canvas')[0].height; width = $('canvas')[0].width; 
  
//loadGame();
bp("Animating...");
	animate();   

} //init

function animate()
{
 var j, prop;
 FRAMECOUNT += 1; 

 if (FRAMECOUNT > 99) {FRAMECOUNT = 0;}
  //clear canvas	

  for(j = 0; j < ctx.length; j++)
 	 {ctx[j].clearRect(0, 0, width, height);}		
  //redraw canvas
 $.each(theToons, function( index, value ) {
		//value is of type function   
		
		if( typeof value == "object"){

			 if (!paused) { //if not paused
     	theToons.getDirections(value);
			if(value.myThizzle){
				value.base.xMove = 0; value.base.yMove = 0;
				value.myThizzle();
			}
	  	theToons.prepDraw(value); 
//      theToons.playSounds(value);
	} //end if not paused
    theToons.draw(value, ctx[value.base.ctxIndex]); 
		theToons.rest(value); 
			//do stuff
		}	 
});

	requestAniFrame(function(){ animate();});
}

function saveGame() { //UNIT TEST THIS
  // Store
	$.each(theToons, function( index, value ) {
	  $.each(value, function( foo, bar) { 
			if (foo == "base")
				{	//saveGameItem(index, bar);
localStorage.setItem((index),JSON.stringify(bar));}				
		});
	});
  bp("Game Saved");
}// end saveGame

function loadGame() { 
	$.each(theToons, function( index, value) 
  { if(typeof value == "object") 
    { value.base = JSON.parse(localStorage.getItem(index));	} //end if
  })//end loop	
}//end loadGame

function resetGame() { theToons = $.extend(true, {}, toonsCatd); }


/*
 *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     *
    wins = [7, 56, 448, 73, 146, 292, 273, 84],
$('<div/>', { id: 'foo', text: 'YER' }).appendTo('body');
	jQuery('<div/>', {
    id: 'foo',
    href: 'http://google.com',
    title: 'Become a Googler',
    rel: 'external',
    text: 'Go to Google!'
}).appendTo('#mySelector');
*/
