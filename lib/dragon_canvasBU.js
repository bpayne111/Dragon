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
 -create animation frame logic
 -start menu as game
 -bpJSlib function to output objects as text
 -change fire canvas based on direction 
 -pause sound
 -restrict movement to map
 - collison detection 
 -add more style to menu for the hell of it 
 -reset needs to work with new toons 
 -allow 2 directions to be pressed, or create direction heirarchy
 -keyMaster?
  
*/
$(document).on('DOMContentLoaded', init); //try other document.ready method //onbeforeunload

window.onbeforeunload = function() {
  saveGame(); 
 // return 'Saving Changes';  //creates popup on exit
};

var tglSpeed = 1250;
var frameCount = 0;
var unit = 100, xAxis, yAxis, height, width, FPS;
var ctx = [], theToons = [], theGames = [];
var requestAniFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {window.setTimeout(callback, 1000 / 60);};
})();

var KEYMAP = { 'UP': ['up', 'w', false, false], 
               'DOWN': ['down', 's', false, false],	
			   'LEFT': ['left', 'a', false, false], 
			   'RIGHT': ['right', 'd', false, false],
			   'SPACE': ['space', null, false, false]               		   
			 }; 
for
// NOW 1 DIRECTION OVERRIDES ANOTHER, BUT IF ONE BUTTON IS RELEASED, THE OTHER DOESN'T REACTIVATE
function isDirection(key) { //return last direction?
  if(key === 'UP' || key === 'DOWN' || key === 'LEFT' || key === 'RIGHT') {return true; }
  return false;
}
function COORDINATETOGGLE() { 
//Pause and prevent game from playing while menu fades
  if(paused){ //if paused toggle and pause
    $('#menu').toggle(0, function(){pause();});	
  }else{ //else pause and toggle
	pause();
	$('#menu').toggle(tglSpeed);	
  }//end toggle shit
}
function keyDowner(command, valarr,j) {
  $(document).bind('keydown', valarr[j], function(e) {
    //add logic for direction changing here    
	valarr[2] = true;
  }); 
}
function keyUpper(command, valarr,j) {
  $(document).bind('keyup', valarr[j], function(e) {
    valarr[2] = false;
    bp(valarr[j], 'was released');
  });
}
//BIND KEYS
$.each(KEYMAP, function(command, valarr) {  
  var j;    
  for(j=0; j<=1; j++){ 
    if(valarr[j]) {
      keyDowner(command, valarr, j);
	  keyUpper(command, valarr, j);
	}//end if
  }//end for loop 
});//end each
 
$(document).bind('keydown', 'esc', function(e) {COORDINATETOGGLE(); });  //BIND MENU
  bp('keys binded');  

var paused = false;
function pause(keepState) {
  if(!keepState){return (paused = !paused);}
  return paused;
}

function KEYPRESSED(btn) {
	if (btn){ 
	  var foo;	  
	  foo = KEYMAP[btn.toUpperCase()];	 
	  if (foo[2] || foo[3]){return true; }// if button is pressed
  //DON'T LIKE USING 2 AND 3 HERE, SHOULD CHANGE IT TO BE READABLE	  
	}
	return false;	
}	

function restKeys() {
  KEYMAP.UP[2] = false; KEYMAP.UP[3] = false;   
  KEYMAP.DOWN[2] = false;  KEYMAP.DOWN[3] = false; 
  KEYMAP.LEFT[2] = false;  KEYMAP.LEFT[3] = false; 
  KEYMAP.RIGHT[2] = false;  KEYMAP.RIGHT[3] = false;   
  return 'Keys rested';
}

function BETAToon(base, media, sprite){
  this.x = base.x; this.y = base.y; 
  this.index = base.index;
  this.xMove = 0; this.yMove = 0;
  this.sx = 0; this.sy = 0;
  this.speed = 2;
  this.ctxt = ctx[this.index];
  
  if(media && media.spriteURL){ 
    this.sprite = new Image();    
	this.sprite.src = media.spriteURL; 
	} 

  if(media && media.sounds) {
    this.snd = new Audio();
    this.snd.src = media.sounds;
	this.soundPack = [];
    this.snd.volume=0.3;
  }
  theToons.push(this);
  if(sprite){ 
    this.sw = sprite.clipW; this.sh = sprite.clipH;
    this.max = sprite.framePerRow;
  }	
	
  this.getDirections = function () { //get keys pressed
    
	var OLDKEY;
	
	if (KEYPRESSED('up')) {this.yMove = -this.speed}
	if (KEYPRESSED('down')) {this.yMove = this.speed; }
	if (KEYPRESSED('left')){ this.xMove = -this.speed; }
	if (KEYPRESSED('right')) {this.xMove = this.speed}
	/* 
	if (KEYPRESSED('up')) {this.yMove -= this.speed; }   
    if (KEYPRESSED('down')) {this.yMove += this.speed; }
	if (KEYPRESSED('left')) {this.xMove -= this.speed; }
    if (KEYPRESSED('right')) {this.xMove += this.speed; }
	 */
	/* 
	switch (KEYMAP) {
    case 'up':
        day = "Sunday";
        break;
		} */
		//make keypressed return current key if no arguments
		//only allow one direction to be selected at a time	    
  };
  
  this.setDirections = function () { 
    this.x += this.xMove; this.y += this.yMove;
  };
  
  this.spriteClip = function () {    
    if (this.yMove < 0) {this.sy = this.sh*3; } //if left
	if (this.yMove > 0) {this.sy = 0; }
	if (this.xMove < 0) {this.sy = this.sh; }
	if (this.xMove > 0) {this.sy = this.sh*2; }
		
	if(frameCount % 6 === 0) //if framecount divides into 6 
	{ this.sx += this.sw;}
	if (this.sx >= this.sw * this.max){ //reset x if at end
	  this.sx = 0;
	}
  }; //end spriteClip  
  
  this.playSounds = function () {
    //console.log('playSounds ran');
    //this.snd.play(); 
  };
  
  this.rest = function () {
    this.xMove = 0; this.yMove = 0;
    //ctx[index]closePath();
  };
  
  //if sprited
  this.draw = function () {     	
	this.ctxt.beginPath(); //move beginPath to the loop?	
	//prep sprite	
	if (this.xMove  || this.yMove)  //if moving
	  {this.spriteClip(); }
	//draw sprite clip
    this.ctxt.drawImage(this.sprite,this.sx,this.sy,this.sw,this.sh,this.x,this.y, this.sw, this.sh);   
    this.ctxt.closePath(); //move closePath to the loop?	
   };   
} 

function makeToons()
//tell a toon he's a slave at birth
{ bp("Making Toons...");   

//make badguy here as toon

var badguyBase = new toonBase(10,25,2),
    badguyMedia = new toonMedia(null, 'lib/dragonRedSprite.png'),
	badguySprite = new toonSprite(96,96,3),
	badguy = new BETAToon(badguyBase, badguyMedia, badguySprite);
	
  badguy.getDirections = function(){
    if(frameCount % 6 === 0) {   
    switch (Math.floor( Math.random() * 4 )+1) {
      case 1: this.yMove = -2;
      break;
	case 2: this.yMove = 2;
      break;	
	case 3: this.xMove = -2;
      break;
	case 4: this.xMove = 2;
      break;
	}
}//end if	
}

   var p1Base = new toonBase(10, 10),
       p1Media = new toonMedia(null,'lib/dragonGreenSprite.png'),
       p1Sprite = new toonSprite(96, 96, 3),
       player1 = new BETAToon(p1Base, p1Media, p1Sprite),
   
       fireBase = new toonBase(115,13),
       fireMedia = new toonMedia('lib/torch.mp3', null);
	   fire_breath = new BETAToon(fireBase, fireMedia, null);	   
 
	fire_breath.draw = function() {    	 
	if (!paused && KEYMAP.SPACE[2]) 
     {
       this.snd.play(); 	   //play sound		   
	   //draw fire
	   this.ctxt.fillStyle= '#fa0';          
       this.ctxt.beginPath();		
	   this.ctxt.moveTo(this.x,this.y);
       this.ctxt.quadraticCurveTo(220,100,this.x-10,this.y-20);  
       this.ctxt.fill();
       this.ctxt.closePath();
	 }	else { this.snd.pause(); }   
		 
	};

	//mountBase = new toonBase(0,0);	
	
 	sineMountain = new BETAToon(new toonBase(0,0), null, null);
	sineMountain.draw = function() {
	  var mtBot; var x = 0; var i = 0;

      mtBot = Math.floor(height* 0.4); //40% of canvas
 
      this.ctxt.save();
      this.ctxt.beginPath();
      this.ctxt.lineWidth = 4;
      this.ctxt.lineJoin = 'round';
      this.ctxt.fillStyle = '#964';
      this.ctxt.strokeStyle = '#964';
 
      this.ctxt.moveTo(x,mtBot); //initial position
      this.ctxt.lineTo(x, mtBot + Math.sin(x/9)); 
     
      for (i=0; i< width;i+=1) //loop through x and plot for sin(x) 
      { 
        this.ctxt.lineTo(i, 90 * Math.sin(i/9));
      }
         //this.ctxt.arc(100, mtBot*2, 60, Math.PI, 1.3*Math.PI, false);
         //move to 40% of height and x0
         //this.ctxt.moveTo(0,mtBot);
         //this.ctxt.lineTo(width,mtBot); 
        // this.ctxt.lineTo(19,34);  
      this.ctxt.stroke(); 
      this.ctxt.closePath();
      this.ctxt.restore();	
    }; 
}	

function init(){
bp("Initializing Canvas and Variables...");  

//make canvas
  var j, catfront, concat, catback;
  catfront = '<canvas id ="cv'; 
  catback ='" width="900" height="300" style="position: absolute; left: 0; top: 0;"></canvas>';

  //append canvas' STILL NEEDS LOTS OF WORK
  for (j=0; j<3; j++){  
    concat = catfront + j +catback;
    $('body').append(concat);    
  }
  //setup canvas   
  ctx.length = $('canvas').length;
  $('canvas').each(function(index) { ctx[index] = this.getContext("2d"); });
 
  //initialize variables
  FPS = 30;
  xAxis = Math.floor(height/2); yAxis = Math.floor(width/4);
  height = $('canvas')[0].height; width = $('canvas')[0].width; 
  
  drawMenu();  
  makeToons(); 
bp("Animating...");
  animate();  
  makeResetButton();  
  loadGame();
} //domloaded

function drawMenu() {
 
  $('body').append(' <div id="menu" class="menu" style=""></div>'); 
  $('<br /><br />').appendTo('#menu');
  $('<button id="reset" class="menuBtn">New Game</button>').appendTo('#menu');
  $('<br /><br />').appendTo('#menu');
  $('<button id="bar" class="menuBtn">Options</button>').appendTo('#menu');
  $('#reset').click(function(){
     resetGame();
     COORDINATETOGGLE();
  });//end click event   
}

function resetGame() { 

  localStorage.clear();
  localStorage.setItem("player1x", 10);
  localStorage.setItem("player1y", 10);
  theToons[0].x =10;
  theToons[0].y = 10;
//theToons.length = 0; //cleaner reset inc
}

function animate()
{
 var j, prop;
 frameCount += 1; 

 if (frameCount > 99) {frameCount = 0;}
  //clear canvas	
  for(j=0; j< ctx.length; j++)
  {ctx[j].clearRect(0, 0, width, height);}		
  //redraw canvas

  for (prop in theToons)
  { 
    if (!paused) { //if not paused
      theToons[prop].getDirections();
	  theToons[prop].setDirections(); 
      theToons[prop].playSounds();
	} //end if not paused
    theToons[prop].draw(); theToons[prop].rest(); 
  } //end loop	
	
  requestAniFrame(function(){ animate();});
}

function saveGame() {
  // Store
  localStorage.setItem("player1x", theToons[0].x);
  localStorage.setItem("player1y", theToons[0].y);
  console.log("Game Saved");
}

function loadGame() { //alpha

 theToons[0].x = parseInt(localStorage.getItem("player1x"));
 theToons[0].y = parseInt(localStorage.getItem("player1y"));
  console.log("Player 1 x", localStorage.getItem("player1x"),
    "Player 1 y", localStorage.getItem("player1y"));   
}

function makeResetButton() { 
//move to bplibjs 
/* $('body').append(' <button style="position:fixed; height:175px; bottom:0; right:0; z-index: 9999;" onclick="resetGame()">Clear Data</button>'); */

}

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

	jQuery('<div/>', {
    id: 'foo',
    href: 'http://google.com',
    title: 'Become a Googler',
    rel: 'external',
    text: 'Go to Google!'
}).appendTo('#mySelector');
*/