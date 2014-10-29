//bpKeys requires JQuery, JQuery.hotkeys, bpJSlib
/*jslint browser: true, devel: true, newcap: true, plusplus: true, sloppy: true, todo: true, white: true */
/*NOTES
TOGGLESPEED IN ESC BIND
MENU DECLARation
*/

var KEYMAP = { 'UP': ['up', 'w', false, false], 
               'DOWN': ['down', 's', false, false],
			 			   'LEFT': ['left', 'a', false, false], 
			 				 'RIGHT': ['right', 'd', false, false],
			   			 'SPACE': ['space', null, false, false]			   
			       }; 

function isDirection(key) {
  if(key === 'UP' || key === 'DOWN' || key === 'LEFT' || key === 'RIGHT') { return true; }
  return false;
}
function restKeys() { //CHANGE NAME OF THIS FUNCTION
  KEYMAP.UP[2] = false; KEYMAP.UP[3] = false;   
  KEYMAP.DOWN[2] = false;  KEYMAP.DOWN[3] = false; 
  KEYMAP.LEFT[2] = false;  KEYMAP.LEFT[3] = false; 
  KEYMAP.RIGHT[2] = false;  KEYMAP.RIGHT[3] = false;   
  return 'Keys rested';
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

//BIND KEYS
// NOW 1 DIRECTION OVERRIDES ANOTHER, BUT IF ONE BUTTON IS RELEASED, THE OTHER DOESN'T REACTIVATE
$.each(KEYMAP, function(command, valarr) {  
 if(valarr[0]){ $(document).on('keydown', null, valarr[0], function(e) {    
    if(isDirection(command)){ restKeys(); }
	valarr[2] = true;		
  });//end first bind  
   $(document).on('keyup', null, valarr[0], function(e) { 
     valarr[2] = false;
	 //  bp(valarr[0], 'was released');
	   return (valarr[0] + ' was released'); //testing return for unit testing  
  });//end keyup bind  
  }//end if
  if(valarr[1]){ $(document).on('keydown', null, valarr[1], function(e) { 
    if(isDirection(command)){ restKeys(); }
	valarr[3] = true;
  });//end second bind  
   $(document).on('keyup', null, valarr[1], function(e) { 
     valarr[3] = false;
  	// bp(valarr[1], 'was released');
     return (valarr[1] + ' was released'); //testing return for unit testing
  });//end keyup bind   
  }//end if  
});//end each







