
var SUPERToons = {};//end SUPERToons

  SUPERToons.getDirections = function (toon) { //get keys pressed	
		if(toon){
			if (KEYPRESSED('up')) { toon.base.yMove = -toon.base.speed;}
			if (KEYPRESSED('down')) {toon.base.yMove = toon.base.speed; }
			if (KEYPRESSED('left')){ toon.base.xMove = -toon.base.speed; }
			if (KEYPRESSED('right')) { toon.base.xMove = toon.base.speed; }
		}		
  };

	SUPERToons.prepDraw = function (toon) { 
		if(toon){	   
			if ((toon.sprite.frameRow) && (toon.base.xMove || toon.base.yMove) )	  
		 	{  
			  if (toon.base.yMove < 0) {toon.sprite.cY = toon.sprite.sH*3; } //if left
				if (toon.base.yMove > 0) {toon.sprite.cY = 0; }
				if (toon.base.xMove < 0) {toon.sprite.cY = toon.sprite.sH; }
				if (toon.base.xMove > 0) {toon.sprite.cY = toon.sprite.sH*2; }
		
				if(FRAMECOUNT % 6 === 0) //if FRAMECOUNT divides into 6 
			    { toon.sprite.cX += toon.sprite.sW;}
			  if (toon.sprite.cX >= toon.sprite.sW * toon.sprite.frameRow){ //reset x if at end
			   toon.sprite.cX = 0;	
        }			
		} //end if moving/sprite
		}//end if toon
	};//end prepDraw

	SUPERToons.draw = function (toon, ctx) {

 if(!(toon.base.flag == 'player')) {
    toon.base.x += toon.base.xMove;
	    toon.base.y += toon.base.yMove;
}
		ctx.beginPath(); 
 		switch (toon.base.flag) {
      case 'bg': 
				var tx,ty;

 				toon.base.xOff -= toon.base.xMove;
 				toon.base.yOff -= toon.base.yMove; 
				
        if ((toon.base.xOff <= -toon.sprite.sW) || ( toon.base.xOff >= toon.sprite.sW))
          { toon.base.xOff = 0; }
        if ((toon.base.yOff <= -toon.sprite.sH) || ( toon.base.yOff >= toon.sprite.sH)) 
					{ toon.base.yOff = 0; }					
			
				for ( tx = ( toon.base.xOff - toon.sprite.sW); tx < window.width; tx += toon.sprite.sW)
				{ for ( ty = ( toon.base.yOff - toon.sprite.sH); ty < window.height; ty += toon.sprite.sH)
				  { ctx.drawImage(toon.media.image, tx, ty);}
				}	
      	break;

  /*     case 'flat':
        var tx,ty;

 				toon.base.xOff -= toon.base.xMove;
 				toon.base.yOff -= toon.base.yMove; 
				
        if ((toon.base.xOff <= -toon.sprite.sW) || ( toon.base.xOff >= toon.sprite.sW))
          { toon.base.xOff = 0; }
        if ((toon.base.yOff <= -toon.sprite.sH) || ( toon.base.yOff >= toon.sprite.sH)) 
					{ toon.base.yOff = 0; }					
			
				for ( tx = ( toon.base.xOff - toon.sprite.sW); tx < window.width; tx += toon.sprite.sW) //loop all x values
				{ ty = ( toon.base.yOff - toon.sprite.sH); //keep y constant
				  { ctx.drawImage(toon.media.image, tx, ty);} //draw
				}	//end for loop
        break; */

      case 'player':  
      			 
      case 'ai': 
				  ctx.drawImage(toon.media.image, toon.sprite.cX, toon.sprite.cY, toon.sprite.sW, toon.sprite.sH, toon.base.x, toon.base.y, toon.sprite.sW, toon.sprite.sH); 			
     	  	break;      
			case 'terrain':
				toon.base.x -= toon.base.xMove * 2;
				toon.base.y -= toon.base.yMove * 2;
				ctx.drawImage(toon.media.image, toon.base.x, toon.base.y);
				  break;
      default: 
      	break;
		}//end switch
	  ctx.closePath(); //move closePath to the loop?	
	}; //end draw function

  SUPERToons.rest = function (toon) {
   toon.base.xMove = 0; toon.base.yMove = 0;
    //ctx[index]closePath();
  };

 SUPERToons.playSounds = function (toon) {
    //console.log('playSounds ran');
    //this.snd.play(); 
  };