//self contained


//var aSnd = new Audio('lib/thump3.ogg');


function testAutobox() {
var sites = [ 'www.JSHint.com', 'jsbeautifier.org', 'closure-compiler.appspot.com', 
							'htmlcompressor.com/compressor', 'tinypng.com' ];

 $('body').append('<div id="toolbox" class="tb" style=""><button id="graphCalc" class="noneYet"></button></div>'); 
$( '<ul id="jsSites">sites</ul>').appendTo('#toolbox');
}
function makeToolbox() {

 $('body').append('<div id="toolbox" class="tb" style=""><button id="graphCalc" class="noneYet"></button></div>'); 
$( '<ul id="jsSites"></ul>').appendTo('#toolbox');
$('<li>js stuff <ul id="links"><li> <a id="JSHint" href="http://www.JSHint.com">jsHint</a> </li></ul></li>').appendTo('#jsSites');
$('<li> <a id="jsBeautify" href="http://jsbeautifier.org/">jsBeautify</a> </li>').appendTo('#links');
$('<li> <a href="http://csslint.net">CSS Lint</a> </li>').appendTo('#links');
$('<li> <a href="http://closure-compiler.appspot.com">GCompress</a></li>').appendTo('#links');
$('<li> <a href="http://htmlcompressor.com/compressor">html compress</a> </li>').appendTo('#links');
$('<li> <a href="https://tinypng.com">tinypng</a> </li>').appendTo('#links');

$('#jsSites').menu();
 $( '#toolbox' ).dialog({ modal: true, resizable: false,
													show: { effect: "bounce", times: 3, easing: 'easeOutBounce', duration: 1000},	
													hide: { effect: "bounce", times: 2, duration: 1000 },
													open: function( event, ui ) { console.log('aSnd.play();')},
													title: 'Workbox' } );

/* $('#toolbox').hide().show('scale', {
  duration: 1000,
  easing: 'easeOutBounce', 
}); */
//$('#toolbox').dialog();
// $( '#toolbox' ).dialog("option", "buttons", [  { icons: { primary: "ui-icon-gear"}, click: function() { $( this ).dialog( "close" ); } } ] );

 $( '#graphCalc' ).button({ icons: {primary: "ui-icon-calculator"}, text: false });

  $( '#toolbox' ).css({
      "background-color": "gray",
      "font-weight": "bolder"
    });
//$( "#toolbox" ).dialog({ hide: { effect: "bounce", times: 2, duration: 1000 } });


}

function BPTB() {

var isOpen;
bp('WELCOME TO BPS TOOLBOX');

if ( bp.id('toolbox')) {
 isOpen = $( '#toolbox' ).dialog( "isOpen" );
	if (isOpen) { bp('already open');}
  else { 

		$('#toolbox').dialog("open");
}
}
else {  makeToolbox(); }

/* try {

}
catch(e) { bp('fail');}
 */


}

