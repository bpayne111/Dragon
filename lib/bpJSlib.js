// Javascript Library, ref sheet, notepad
/*global $:false*/
/*jslint browser: true, devel: true, newcap: true, plusplus: true, sloppy: true, todo: true, white: true */
/* jshint trailing: false, undef: true, smarttabs: true */

/* ***********NOTES**********
    create toolbox div that transitions smooth
	color picker
-------------------ZINDEX MAP-------------------
.hud 9109
#qunit 9501
bootProg 9689
*/
/* ref for Mouse Coords
this creates browser compatible mouse coord, currently designed for chrome
http://www.quirksmode.org/js/events_properties.html
function doSomething(e) {
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	// posx and posy contain the mouse position relative to the document
	// Do something with this information
  
}

*/
function makeProgress(){

var myProgBar = document.getElementsByClassName('bpProgress')[0]
  //document.getElementById('bpProgress').setAttribute("style","width:65%");
myProgBar.style.width='65%'; //for animation
myProgBar.setAttribute('width','65%'); // for span:before content
}

function createUser(){ //cool
$.ajax({
  url: 'http://api.randomuser.me/',
  dataType: 'json',
  success: function(data){
    console.log(data);
  }
});
}

function bp(obj) { //Global BP object
  var i, cat = '';

	this.error = function(words) { console.error( '%c' + words, 'background: #888; color: #333'); }; 
  if(!obj) { return this.error("bp requires at least 1 argument");} //return help text
  this.obj = obj;  

  for (i=0; i < arguments.length; i++) { cat += (arguments[i] +' '); }  
return  console.log('%c' + cat, 'background: #222; color: #bada55');       
  //	return this;	
//return this.error();
}

bp.filesLoaded = [];
bp.fileRequests = [];
bp.TESTLOAD = function(files, callback){
//http://stackoverflow.com/questions/18424712/how-to-loop-through-ajax-requests-inside-a-jquery-when-then-statment

var objData = { url: '', dataType: 'script', cache: true};

if (files instanceof Array) {
  for(var i in files){
    objData.url = files[i];
    bp.fileRequests.push( $.ajax(objData) );
   }}//end if

$.when.apply($, bp.fileRequests).then(function(){
  console.log('ALL SCRIPTS HAVE LOADED');
}).fail(function(){
  console.log('FAILURE');
}).always(function(){
  console.log('ALWAYS');
});
}//end TESTLOAD

bp.load = function(fileStr, callback){
//$.when( $.ajax( "/page1.php" ), $.ajax( "/page2.php" ) )
//.then( myFunc, myFailure );
//Execute the function myFunc when both ajax requests are successful, or myFailure if either one has an error.

/* $.ajax(objData).done(function(){
  if(callback) callback();
  });//end ajax.done */
var objData = { url: '', dataType: 'script', cache: true};

if (typeof fileStr == 'string') { //load the single file and execute it
  objData.url = fileStr;
  $.ajax(objData).done(function(){
    bp.filesLoaded.push(objData.url);
    if(callback) callback();
  });//end ajax.done  
}//end if
if (fileStr instanceof Array) {
  for(var i in fileStr){
    objData.url = fileStr[i];
    $.ajax(objData).done(function(){
      bp.filesLoaded.push(objData.url);
      //if(callback) callback();
    });
    
  }//end for

  theURL = fileStr[0] 
}

//var theURL = fileStr || 'lib/blerg.js';
 
 $.ajax({
      url: theURL,
      dataType: "script",
      cache: true
}).done(function() {
    
    blerg();
		//if(callback) callback();
});
  //load script file 
  //add properties and stuff for a library
}; //end bpload

bp.centerByMargin = function(childW, parentW) {
return ((parentW - childW) /2);
};

bp.kitty = function(width, height) {
 var daSrc = 'http://placekitten.com/g/' + width + '/' + height;
 return daSrc; 
 
};

bp.rngText = function (len) { //http://baconipsum.com/
  if (!len) {len = 2;}
var str = 'http://baconipsum.com/api/?type=all-meat&paras=' + len + '&start-with-lorem=1';
  $.ajax({
    url: str,
    datatype: 'json',
    success: function(data) { console.log(data);  },
    failure: function(data) { console.log('ajax request failed'); }
  }); //end ajax
}; //end rngText

bp.blah = function(){
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis sapien sit amet dui ultricies congue. Nulla sit amet felis diam. Ut iaculis adipiscing sodales. Pellentesque blandit elit nulla, sit amet congue risus elementum in. Etiam non nibh mi. Nunc fermentum tellus at velit euismod, et fringilla lorem hendrerit. Cras vel massa sollicitudin, tincidunt libero vitae, elementum turpis. Aliquam volutpat quis velit et iaculis. Aenean vehicula hendrerit risus, et vulputate ipsum cursus id. Fusce tristique tempus convallis. Pellentesque at eros eu lacus sagittis aliquam semper eu mi. Nunc eget porta mauris.';
};

bp.testing = function() {//append qunit to the dom 
    $('<div id="qunit"></div>').css({ bottom: 0, right: 0, position: "fixed", zIndex: 9501}).appendTo('body');
  bp('QUnit Ready');

//$('head').append('<link rel="stylesheet" type="text/css" href="lib/qunit-1.14.0.css">');  

};

bp.test = function(actual, expected, message) {//test a unit for equality
  //equal( actual, expected, message )
  QUnit.test(message, function( assert ) {
  bp(actual, expected, message);
    if (actual && expected && message) assert.equal(actual, expected, message);
/*   var now = "123";
    assert.equal(now,  "123");
    assert.ok(false, "tested assert.ok with the value false");
    assert.ok(1, "tested assert.ok with value 1");
    assert.ok(assert, "tested assert.ok with value assert");
     */
  });
};

bp.id = function(eleId) {	return document.getElementById(eleId);};
bp.clearData = function(){chrome.storage.local.clear();};
bp.derp = function() {debugger;};


bp.ready = function() { //$(document).on('DOMContentLoaded', init); 
$(document).ready(init);
};
 
bp.ninja = function(obj) { 
 console.log(obj);
 var ele;  
	try {
	//try for classes as well
  console.log(typeof obj);
	  if (typeof obj === 'object') { ele = document.getElementById(obj.id); }
console.log(typeof obj);
	  if (typeof obj === 'string') { ele = document.getElementById(obj);	}
	  //document.getElementByClassName();
	  ele.style.display="none";
		}
	  catch (e) { return "doesn't seem to be an element"; }    
  }; //end newNinja 

function HALP() {
 $('body').append('<div id="bpMenu"></div>'); 
  $('<br /><br />').appendTo('#bpMenu');
  $('<button id="reload">Reload</button>').appendTo('#bpMenu');
  $('#reload').click(function(){
     //change to timer and checkbox
     location.reload();	 
  });//end click event 
  $('#bpMenu').addClass('bpToolbox');
  $('#reload').addClass('bptbBtn');
 // $('#reload').css({position:'fixed', width:'115px', height: '95px'});
  //$('#bpMenu').css({backgroundColor:'blue'});
 
}

function JQChrome() { //add jquery to chrome console
var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function gameController()
{
  var allGames =[];
  
  this.games = allGames;
  this.reset = function(){};//full reset of game
}
function aGame(toons,keybinds,something) {
  this.Toons = toons;
  this.Keybinds = keybinds;
  
  this.Make = function(){};
}
//disable right click
//ref to pass function as argument
//http://stackoverflow.com/questions/5752030/passing-a-function-as-an-argument-in-a-javascript-function
function disableRC()
{ //disable right click

 if (document.addEventListener) {
   document.addEventListener('contextmenu', function(e)
   {
   	 rightClicked(e); //this works!, need to adapt for my needs
     //alert("You've tried to open context menu"); //here you draw your own menu
     e.preventDefault();
   }, false);
 } 
 else 
 {
   document.attachEvent('oncontextmenu', function() {
   alert("You've tried to open context menu");
   window.event.returnValue = false;
 });
 }  //end right click override
}

function testArguments () // <-- notice no arguments specified
{ 
    console.log(arguments); // outputs the arguments to the console
    var htmlOutput = "";
    for (var i=0; i < arguments.length; i++) { htmlOutput += '<li>' + arguments[i] + '</li>'; }
    document.write('<ul>' + htmlOutput + '</ul>');
}

//TODO: figure out this array min/max function
function maxAr(ar)
{//return largest number in an array
  Array.max = function( ar ){
 	 return Math.max.apply( Math, ar );
};
}

function minAr(ar)
{//return smallest number in an array
  Array.min = function( ar ){
 	 return Math.min.apply( Math, ar);
};
}

function supports_html5_storage() {
  try { //http://diveintohtml5.info/storage.html
    return 'chrome.storage.local' in window && window['chrome.storage.local'] !== null;
  } catch (e) {
    return false;
  }
}

function soundSprite(theSnd, startTimes, endTimes)
{//theSnd an Audio object
//starTimes: an array of integers (seconds) that dictates, which segment to play
//endTimes:  an array of integers (seconds) that dictates when to stop

this.startTimes = startTimes;
this.endTimes = endTimes;
this.currentTime = theSnd.currentTime;

//may need to refine this
this.isPlaying = !theSnd.paused;

this.pause = function(){theSnd.pause();};
//add event listeners and shit
}

function arPlusX(ar, x)
{//add an amount to each element in array
var ind, ret;
ret = [];
  for(ind=0; ind <= (ar.length-1); ind++)
  { ret[ind] = ar[ind]+x;    
  }
  return ret;
}


