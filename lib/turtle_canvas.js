//TURTLE GAME
var toonsCatd, theToons = {}, FRAMECOUNT = 0, unit = 100, xAxis, yAxis, height, width, FPS, 
    ctx = [], theGames = [],
    requestAniFrame = (function(callback) {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setInterval(callback, 1000 / 60); //FUCK WITH THIS A BIT
    })();

//https://gist.github.com/paulirish/1579671 request ani frame polyfill

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
  }//end canvas creation  
  $(gameBox).appendTo('body'); //append canvas' to dom
//cover paused game 
$(document.createElement('div')).attr({id: 'cover'}).css({ opacity:'.9', 'position': 'absolute', 'width': '900px', 'height': '450px', 'background-color': '#d2b48c' }).appendTo('#game');

//setup canvas
  ctx.length = $('canvas').length;  //one context per canvas
  $('canvas').each(function(index) { 
	  ctx[index] = this.getContext("2d");});	  

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

function loadGame() { 
	$.each(theToons, function( index, value) 
  { if(typeof value == "object") 
    { value.base = JSON.parse(localStorage.getItem(index));	} //end if
  })//end loop	
}//end loadGame

function resetGame() { theToons = $.extend(true, {}, toonsCatd); }
