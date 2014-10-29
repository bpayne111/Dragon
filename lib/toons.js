
var defaultBase = {'x': 10, 'y': 10, 'ctxIndex':0, 'speed': 2, 'xMove':0, 'yMove':0 };
var defaultSprite = {'sW':96, 'sH':96, 'cX':0, 'cY': 0, 'frameRow': 3 };
var defaultMedia; //find some silly image to put here

	var initialToons = {
//change fire breath to real values

  'player1': {'base':  {'x':145, 'y': 145, 'ctxIndex': 1, 'speed': 1, 
											  'xMove': 0, 'yMove': 0, 'flag': 'player' }, 
              'media': {'spriteURL': 'lib/dragonGreenSprite.png' },
              'sprite': {'sW': 96, 'sH': 96, 'cX': 0, 'cY': 0, 'frameRow': 3}
            },	
  'firebreath': {'base': {'x': 25, 'y': 25, 'ctxIndex': 1, 'speed': 2, 'xMove': 0, 'yMove': 0, 							  'flag': 'something' }, 
                 'media': { 'spriteURL': 'lib/dragonRedSprite.png'},
                 'sprite':{'sW': 96, 'sH': 96, 'cX': 0, 'cY': 0, 'frameRow': 3} 
                },
	'grass': { 'base': {'ctxIndex': 0, 'speed': 3, 'xMove': 0, 'yMove': 0, 'flag': 'bg',
						 'xOff': 0, 'yOff': 0 },
             'media': { 'spriteURL': 'lib/grass_2.png'},	
						 'sprite':{'sW': 96, 'sH': 96}
  }, 
  'new_grass' { 'base': {'ctxIndex': 0, 'speed': 3, 'xMove': 0, 'yMove': 0, 'flag': 'flat',
						 'xOff': 0, 'yOff': 0 },
             'media': { 'spriteURL': 'lib/grass_2.png'},	
						 'sprite':{'sW': 96, 'sH': 96}
    
  },
  'cave': { 'base': {'x': 205, 'y':102, 'ctxIndex': 0, 'speed': 3, 'xMove': 0, 'yMove': 0, 
						'flag': 'terrain' },
             'media': { 'spriteURL': 'lib/cave.png'},	
						 'sprite':{'sW': 64, 'sH': 64} 										
  
  }, 
  'badguy': {'base':  {'x': 55, 'y': 55, 'ctxIndex': 2, 'speed':2, 'xMove': 0, 'yMove': 0, 						 'flag':'ai' }, 
             'media': {'sound': null, 'spriteURL': 'lib/dragonRedSprite.png'},
             'sprite':{'sW': 96, 'sH': 96, 'cX': 0, 'cY': 0, 'frameRow': 3},
             'myThizzle': function(){              
               if(FRAMECOUNT % 6 === 0) {  // console.log('this', this);
                 switch (Math.floor( Math.random() * 4 )+1) {
                   case 1: this.base.yMove = -2;
                     break;
	                 case 2: this.base.yMove = 2;
                     break;	
	                 case 3: this.base.xMove = -2;
                     break;
	                 case 4: this.base.xMove = 2;
                     break;
	               } //end switch
               } //end FRAMECOUNT if            
             }//end function 
  }//end badguy
};//end initialToons

  initialToons.getDirections = function (toon) { //get keys pressed	
		if(toon){
			if (KEYPRESSED('up')) { toon.base.yMove = -toon.base.speed;}
			if (KEYPRESSED('down')) {toon.base.yMove = toon.base.speed; }
			if (KEYPRESSED('left')){ toon.base.xMove = -toon.base.speed; }
			if (KEYPRESSED('right')) { toon.base.xMove = toon.base.speed; }
		}		
  };

	initialToons.prepDraw = function (toon) { 

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

	initialToons.draw = function (toon, ctx) {

 if(!(toon.base.flag == 'player')) {
    toon.base.x += toon.base.xMove;
	    toon.base.y += toon.base.yMove;
}
		ctx.beginPath(); 
 		switch (toon.base.flag) {
     case 'flat': 
				var tx,ty;

 				toon.base.xOff -= toon.base.xMove;
 				toon.base.yOff -= toon.base.yMove; 
				
        if ((toon.base.xOff <= -toon.sprite.sW) || ( toon.base.xOff >= toon.sprite.sW))
          { toon.base.xOff = 0; }
        if ((toon.base.yOff <= -toon.sprite.sH) || ( toon.base.yOff >= toon.sprite.sH)) 
					{ toon.base.yOff = 0; }					
			
				for ( tx = ( toon.base.xOff - toon.sprite.sW); tx < window.width; tx += toon.sprite.sW)
				{  ty = ( toon.base.yOff - toon.sprite.sH); 
				  { ctx.drawImage(toon.media.image, tx, ty);}
				}	
      	break;
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

  initialToons.rest = function (toon) {
   toon.base.xMove = 0; toon.base.yMove = 0;
    //ctx[index]closePath();
  };

 initialToons.playSounds = function (toon) {
    //console.log('playSounds ran');
    //this.snd.play(); 
  };

  