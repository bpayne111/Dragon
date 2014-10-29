//game loader
//for (var i = 0; i < allImgs.length; i++)
//for(var i in allImgs)
/* head.ready(function() {
    console.log('SHIT IS DONE');
    // push a function to the end of the page for later execution
    // runs once all files have finished loading    
    // WARNING: if no files are cued for loading this will NOT trigger !
  });
head.ready(document, function() {
console.log('DOCUMENT READY');   
 // push a function to the end of the page for later execution
    // runs as soon as the document is ready
});

THIS BELOW DOESN'T SEEM TO WORK
head.ready('lib/bpGameTester.js', function() { console.log('OK HEAD READY HAPPENED');});

 */

console.log('loading shit');
var MESSENGER = 'blah';
MESSENGER.loaded = [];
MESSENGER.inQ = [];

head.ready(function() {
    console.log('SHIT IS DONE');
    // push a function to the end of the page for later execution
    // runs once all files have finished loading    
    // WARNING: if no files are cued for loading this will NOT trigger !
  });

 

var aSnd = new Audio('lib/thump3.ogg'), //this is obviously terrible but ok for now
  progress = 0;
function baseInit() {
//create progress bar MAKE THIS SHOW UP FASTER AND BE MORE USEFUL AND BETTER LOOKING
  $('<div id="bootProg" />').appendTo('body').progressbar().hide();   
  $('#bootProg').show('fade', { duration: 1000, complete: function(){ 
    showMenu();    
	  $(document).on('keydown', null, 'esc', function(e) {  //Bind Menu
      $('#menu2').length !== 0 ? hideMenu(): showMenu();  //if menu, hide else show
	  });  //END BIND MENU
    }//end bootProg complete
 }); //end bootProg show

  $('#bootProg').position({ my: 'center', at: 'center' , of: $(document)});

}

function updateProgress(increment) {
  progress += increment;
 $('#bootProg').progressbar( "option", "value", progress);
};

//https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js'

head.load('lib/bpGameTester.js', 'lib/bpGameMenu.js', 'lib/jquery-ui.css', 'lib/bpGame.css','lib/jquery-2.1.1.min.js', 'lib/jquery-ui.js', 'lib/bpJSlib.js', function() {
  
  bp('BAM - Badass Mode');  
  bp('Preparing for Tests'); 
  bp.testing();   
  test_Libraries();  
  baseInit();  
  updateProgress(63);
  test_Load();
 
  bp('Loading Keys');
  head.load('lib/jquery.hotkeys.js', function() {
    updateProgress(5);   
    head.load("lib/bpKeys.js", function () {  
      updateProgress(5);
	  	bp('Testing keys');    
      test_Keys();  

      bp('loading canvas');
     head.load("lib/dragon_canvas.js", "lib/SOMEJUNK.js", function(){     
        init();
        updateProgress(15); 
        test_Canvas();
      
        $('#bootProg').hide('fade', { duration: 1000 }); 

      });//end load canvas      
    }); //end keys load  
  }); //end jqhk load
}); //end jquery load
console.log('END FILE LOAD');

