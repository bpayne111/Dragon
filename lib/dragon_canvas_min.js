$(document).on('DOMContentLoaded',init);window.onbeforeunload=function(){saveGame();};var tglSpeed=1250;var frameCount=0;var unit=100,xAxis,yAxis,height,width,FPS;var ctx=[],theToons=[],theGames=[];var requestAniFrame=(function(callback){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();var KEYMAP={'UP':['up','w',false,false],'DOWN':['down','s',false,false],'LEFT':['left','a',false,false],'RIGHT':['right','d',false,false],'SPACE':['space',null,false,false]};for
function isDirection(key){if(key==='UP'||key==='DOWN'||key==='LEFT'||key==='RIGHT'){return true;}
return false;}
function COORDINATETOGGLE(){if(paused){$('#menu').toggle(0,function(){pause();});}else{pause();$('#menu').toggle(tglSpeed);}}
function keyDowner(command,valarr,j){$(document).bind('keydown',valarr[j],function(e){valarr[2]=true;});}
function keyUpper(command,valarr,j){$(document).bind('keyup',valarr[j],function(e){valarr[2]=false;bp(valarr[j],'was released');});}
$.each(KEYMAP,function(command,valarr){var j;for(j=0;j<=1;j++){if(valarr[j]){keyDowner(command,valarr,j);keyUpper(command,valarr,j);}}});$(document).bind('keydown','esc',function(e){COORDINATETOGGLE();});bp('keys binded');var paused=false;function pause(keepState){if(!keepState){return(paused=!paused);}
return paused;}
function KEYPRESSED(btn){if(btn){var foo;foo=KEYMAP[btn.toUpperCase()];if(foo[2]||foo[3]){return true;}}
return false;}
function restKeys(){KEYMAP.UP[2]=false;KEYMAP.UP[3]=false;KEYMAP.DOWN[2]=false;KEYMAP.DOWN[3]=false;KEYMAP.LEFT[2]=false;KEYMAP.LEFT[3]=false;KEYMAP.RIGHT[2]=false;KEYMAP.RIGHT[3]=false;return'Keys rested';}
function BETAToon(base,media,sprite){this.x=base.x;this.y=base.y;this.index=base.index;this.xMove=0;this.yMove=0;this.sx=0;this.sy=0;this.speed=2;this.ctxt=ctx[this.index];if(media&&media.spriteURL){this.sprite=new Image();this.sprite.src=media.spriteURL;}
if(media&&media.sounds){this.snd=new Audio();this.snd.src=media.sounds;this.soundPack=[];this.snd.volume=0.3;}
theToons.push(this);if(sprite){this.sw=sprite.clipW;this.sh=sprite.clipH;this.max=sprite.framePerRow;}
this.getDirections=function(){var OLDKEY;if(KEYPRESSED('up')){this.yMove=-this.speed}
if(KEYPRESSED('down')){this.yMove=this.speed;}
if(KEYPRESSED('left')){this.xMove=-this.speed;}
if(KEYPRESSED('right')){this.xMove=this.speed}};this.setDirections=function(){this.x+=this.xMove;this.y+=this.yMove;};this.spriteClip=function(){if(this.yMove<0){this.sy=this.sh*3;}
if(this.yMove>0){this.sy=0;}
if(this.xMove<0){this.sy=this.sh;}
if(this.xMove>0){this.sy=this.sh*2;}
if(frameCount%6===0)
{this.sx+=this.sw;}
if(this.sx>=this.sw*this.max){this.sx=0;}};this.playSounds=function(){};this.rest=function(){this.xMove=0;this.yMove=0;};this.draw=function(){this.ctxt.beginPath();if(this.xMove||this.yMove)
{this.spriteClip();}
this.ctxt.drawImage(this.sprite,this.sx,this.sy,this.sw,this.sh,this.x,this.y,this.sw,this.sh);this.ctxt.closePath();};}
function makeToons()
{bp("Making Toons...");var badguyBase=new toonBase(10,25,2),badguyMedia=new toonMedia(null,'lib/dragonRedSprite.png'),badguySprite=new toonSprite(96,96,3),badguy=new BETAToon(badguyBase,badguyMedia,badguySprite);badguy.getDirections=function(){if(frameCount%6===0){switch(Math.floor(Math.random()*4)+1){case 1:this.yMove=-2;break;case 2:this.yMove=2;break;case 3:this.xMove=-2;break;case 4:this.xMove=2;break;}}}
var p1Base=new toonBase(10,10),p1Media=new toonMedia(null,'lib/dragonGreenSprite.png'),p1Sprite=new toonSprite(96,96,3),player1=new BETAToon(p1Base,p1Media,p1Sprite),fireBase=new toonBase(115,13),fireMedia=new toonMedia('lib/torch.mp3',null);fire_breath=new BETAToon(fireBase,fireMedia,null);fire_breath.draw=function(){if(!paused&&KEYMAP.SPACE[2])
{this.snd.play();this.ctxt.fillStyle='#fa0';this.ctxt.beginPath();this.ctxt.moveTo(this.x,this.y);this.ctxt.quadraticCurveTo(220,100,this.x-10,this.y-20);this.ctxt.fill();this.ctxt.closePath();}else{this.snd.pause();}};sineMountain=new BETAToon(new toonBase(0,0),null,null);sineMountain.draw=function(){var mtBot;var x=0;var i=0;mtBot=Math.floor(height*0.4);this.ctxt.save();this.ctxt.beginPath();this.ctxt.lineWidth=4;this.ctxt.lineJoin='round';this.ctxt.fillStyle='#964';this.ctxt.strokeStyle='#964';this.ctxt.moveTo(x,mtBot);this.ctxt.lineTo(x,mtBot+Math.sin(x/9));for(i=0;i<width;i+=1)
{this.ctxt.lineTo(i,90*Math.sin(i/9));}
this.ctxt.stroke();this.ctxt.closePath();this.ctxt.restore();};}
function init(){bp("Initializing Canvas and Variables...");var j,catfront,concat,catback;catfront='<canvas id ="cv';catback='" width="900" height="300" style="position: absolute; left: 0; top: 0;"></canvas>';for(j=0;j<3;j++){concat=catfront+j+catback;$('body').append(concat);}
ctx.length=$('canvas').length;$('canvas').each(function(index){ctx[index]=this.getContext("2d");});FPS=30;xAxis=Math.floor(height/2);yAxis=Math.floor(width/4);height=$('canvas')[0].height;width=$('canvas')[0].width;drawMenu();makeToons();bp("Animating...");animate();makeResetButton();loadGame();}
function drawMenu(){$('body').append(' <div id="menu" class="menu" style=""></div>');$('<br /><br />').appendTo('#menu');$('<button id="reset" class="menuBtn">New Game</button>').appendTo('#menu');$('<br /><br />').appendTo('#menu');$('<button id="bar" class="menuBtn">Options</button>').appendTo('#menu');$('#reset').click(function(){resetGame();COORDINATETOGGLE();});}
function resetGame(){localStorage.clear();localStorage.setItem("player1x",10);localStorage.setItem("player1y",10);theToons[0].x=10;theToons[0].y=10;}
function animate()
{var j,prop;frameCount+=1;if(frameCount>99){frameCount=0;}
for(j=0;j<ctx.length;j++)
{ctx[j].clearRect(0,0,width,height);}
for(prop in theToons)
{if(!paused){theToons[prop].getDirections();theToons[prop].setDirections();theToons[prop].playSounds();}
theToons[prop].draw();theToons[prop].rest();}
requestAniFrame(function(){animate();});}
function saveGame(){localStorage.setItem("player1x",theToons[0].x);localStorage.setItem("player1y",theToons[0].y);console.log("Game Saved");}
function loadGame(){theToons[0].x=parseInt(localStorage.getItem("player1x"));theToons[0].y=parseInt(localStorage.getItem("player1y"));console.log("Player 1 x",localStorage.getItem("player1x"),"Player 1 y",localStorage.getItem("player1y"));}
function makeResetButton(){}