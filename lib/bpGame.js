 //game object types

function toonBase(x, y, canvasIndex) {
  this.x = x;
  this.y = y;
  this.canvasIndex = canvasIndex;
  this.index = toonBase.length-1;
  
}

function toonMedia(sounds, spriteURL) {
//assign own index
  if(sounds){ this.sounds = sounds; }
  if(spriteURL){this.spriteURL = spriteURL; }
 
}

function toonSprite(clipW, clipH, framePerRow)
{
  this.clipW = clipW;
  this.clipH = clipH;
  this.framePerRow = framePerRow;

}



