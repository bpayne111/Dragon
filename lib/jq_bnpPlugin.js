//MY JQUERY PLUGIN

//$('element').bnp('ninja'); to hide an element
(function ( $ ) {
if($ !== null){ 
 $.fn.bnp = function(options) {
    var opts = $.extend({}, $.fn.bnp.defaults, options);  //add defaults and arguments   
 
    if(options === 'ninja'){ return this.css({ display: "none"}); }
    return this.css( {display: opts.display,  color: opts.color }); 
  };  
 
  function derp() { console.log('finally');}

$.fn.bnp.defaults = {  display: "none"     } ;  
$.fn.bnp.yay = derp;  //$('element').bnp.yay(); 
 }//end if
else { console.error("jQuery Required.");}
} ( jQuery ));
