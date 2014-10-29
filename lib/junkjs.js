/*jslint browser: true, devel: true, newcap: true, plusplus: true, sloppy: true, todo: true, white: true */
function makeImgTransparent(acanvas, anImage) {

  var derpa, imgd, pix, i, r,g,b, animage;

//$('body').css({ backgroundColor: "green" });   
 
  derpa = acanvas.getContext("2d");
  
  animage =  new Image();     
  animage.onload = function(){
    console.log('image loaded');
    derpa.beginPath();
    derpa.drawImage(animage,0,0);    
    imgd = derpa.getImageData(0,0,500,500);
    pix = imgd.data;
    
    for ( i = 0; i <= pix.length; i += 4) {
      r = pix[i]; g = pix[i+1];  b = pix[i+2];
        if(r > 250 && g > 250 && b > 250 ){           
          // make the pixel transparentderpa.closePath();
          pix[i + 3] = 0;
        }

    }  //end for
console.log('done with the loop');
imgd.data = pix;
derpa.putImageData(imgd ,0,0);

console.log('writing dataURL');
 var dataURL = acanvas.toDataURL();
$('body').append('<br /><br /><br /><img src="'+dataURL+'"/>');
console.log('written');
derpa.closePath();
console.log('closed path');
};
animage.src = anImage.src;

 //document.getElementById('DACANVAS').src = dataURL;
 
}  //end makeImgTransparent

function convertImageToCanvas(image) {  //CHANGE THIS WHOLE THING
var acanvas = document.getElementById("dacanvas");	
//var acanvas = document.createElement("canvas");
  var somectx = acanvas.getContext("2d");
	//acanvas.width = image.width;
	//acanvas.height = image.height;
somectx.beginPath();	
somectx.drawImage(image, 0, 0);
somectx.closePath();
	return acanvas;
}

function previewFile() { 
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();
  reader.onloadend = function () {  
    //show image on left
    $('#incoming').attr("src", reader.result);  
    //save image as a canvas
    makeImgTransparent(convertImageToCanvas(document.getElementById('incoming')),document.getElementById('incoming'));

    
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    $('incoming').attr("src", "");
    
  }
}

function mkImgTransparent(acanvas, anImage, element) {
//OLD PREVIEWFILE
  var file    = document.querySelector('input[type=file]').files[0];
  var derpa, imgd, pix, i, r,g,b, animage;  
  var reader  = new FileReader();
  
  reader.onloadend = function () {  
    //show image on left
    //CHANGE #INCOMING TO VARIABLE
    $(element).attr("src", reader.result);  
    //save image as a canvas

//OLD makeImgTransparent  
  derpa = acanvas.getContext("2d");  
  animage =  new Image();     
  animage.onload = function(){
    console.log('image loaded');
    derpa.beginPath();
    derpa.drawImage(animage,0,0);    
    imgd = derpa.getImageData(0,0,500,500);
    pix = imgd.data;
    
    for ( i = 0; i <= pix.length; i += 4) {
      r = pix[i]; g = pix[i+1];  b = pix[i+2];
        if(r > 250 && g > 250 && b > 250 ){           
          // make the pixel transparentderpa.closePath();
          pix[i + 3] = 0;
        }

    }  //end for
  console.log('done with the loop');
  imgd.data = pix;
  derpa.putImageData(imgd ,0,0);

  console.log('writing dataURL');
  var dataURL = acanvas.toDataURL();
  console.log('written');
  derpa.closePath();
  console.log('closed path');
}; //end image load
animage.src = anImage.src;
 convertImageToCanvas(element), element; 
//END OLD maketrans   
  }//end reader onloadend

  if (file) {
    reader.readAsDataURL(file);
  } else {
      $('incoming').attr("src", "");
    
  }




}
function init() {

  //makeImgTransparent(gotCanvas);
console.log('binding file select');
$('body').css("background-color", "green"); //greenscreen to see easier
$('#selection').change(function(){previewFile();});
//$('#outcome').attr("src", daData);


/* function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
 */

/* 
var fileSelector = document.createElement('input');
 fileSelector.setAttribute('type', 'file');

 var selectDialogueLink = document.createElement('a');
 selectDialogueLink.setAttribute('href', '');
 selectDialogueLink.innerText = "Select File";

 selectDialogueLink.onclick = function () {
      fileSelector.click();
      return false;
 }

 document.body.appendChild(selectDialogueLink); */
}

$(document).on('DOMContentLoaded', init); 








