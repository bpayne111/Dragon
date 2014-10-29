//bpGamePresenter
function showMenu() {
  paused = paused || pause();
  createMenu();

  aSnd.play();
  $('#cover').show({ effect: 'fade', duration: 750});
  $('#menu2').show({ effect: 'bounce', times: 3, easing: 'easeOutBounce', duration: 1000}); 
} //end showMenu

function hideMenu() {
  $('#cover').hide({ effect: 'fade', duration: 750});
  $('#menu2').hide({ effect: 'bounce', times: 2, easing: 'easeOutBounce', duration: 750});
  setTimeout(function(){ removeMenu(); 
    paused = !paused || pause(); }, 750);  
}

function removeMenu(){ $('#menu2').remove(); }

function createMenu(){
//create menu div     
  $(document.createElement('div')).attr({ id: 'menu2' }).addClass('menu2').appendTo('body');
//declare buttons        
  var btnData = [ { 'id': 'reset', 'text': 'Start ', 'icon': 'fa fa-star-o fa-lg'},
                  { 'id': 'loadGame', 'text': 'Load Game ', 'icon': 'fa fa-cubes fa-lg' },
                  { 'id': 'closeGame', 'text': 'Exit ', 'icon': null },
                  { 'id': 'opt', 'text': null, 'icon': 'fa fa-cog fa-spin fa-lg' }
    ], aButton, anIcon, j;
//make buttons
  for (j = 0; j < btnData.length; j++){  
    anIcon = $(document.createElement('i')).addClass(btnData[j].icon);
    aButton = $('<button></button>').html( btnData[j].text )
      .append(anIcon)   
      .attr({ 'id': btnData[j].id});
    aButton.button();
    $('#menu2').append(aButton);
  }//end for 

//position buttons and show menu
  var btnLeft = bp.centerByMargin($('#reset').width(), $('#menu2').width()  );
  $('#reset').css({ position: 'absolute', 'font-size': '175%', marginLeft: btnLeft, marginTop:'50px'});
  $('#closeGame').css({'position': 'absolute', 'left': '5px', 'bottom': '5px'});
  $('#opt').css({'position': 'absolute', 'right': '5px', 'bottom': '5px'});
  $('#loadGame').position({ my: 'top', at: 'bottom+10', of: bp.id('reset') });
  $('#menu2').hide();
 
//bind click events for buttons
$('#reset').click(function(){ resetGame();  hideMenu(); });
$('#loadGame').click(function(){ loadGame(); hideMenu(); }); 
$('#closeGame').click(function(){ window.close(); });

if (!isGameSaved()) $('#loadGame').remove(); //remove load button if no game to load

//make start button bigger
//find a font that's more fun
// use ui-soft-whatever for borders

}//end createMenu

