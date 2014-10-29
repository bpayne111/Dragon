/*jslint browser: true, devel: true, newcap: true, plusplus: true, sloppy: true, todo: true, white: true */

function mkImgTrans(anImage, id){
  var imgd, pix, i, r, g, b, derpa, 
      somecanvas = document.createElement('canvas');
      somecanvas.width = anImage.width; somecanvas.height = anImage.height;
 
  derpa = somecanvas.getContext("2d");     
  derpa.beginPath();
  derpa.drawImage(anImage, 0, 0);  
  imgd = derpa.getImageData(0,0,anImage.width,anImage.height); 
  pix = imgd.data;    
  for ( i = 0; i <= pix.length; i += 4) { //loop i (+4) <= pix.length
    r = pix[i]; g = pix[i+1];  b = pix[i+2];
      if(r > 245 && g > 245 && b > 245 ){                  
        pix[i + 3] = 0; //make transparent
      }
  }  //end for
  imgd.data = pix;
  derpa.putImageData(imgd, 0, 0);  
  derpa.closePath();  //move above dataURL assignment?
    
	var dataURL = somecanvas.toDataURL();
	bp('foo is', dataURL);
	bp.id(id).src = dataURL; //$('body').append('<br /><br /><br /><img src="'+dataURL+'"/>');
}

function readerLoaded(element, reader){   
  $(element).attr("src", reader.result);  //show image on left  
  mkImgTrans(element);   //save image as a canvas  
}

function newHotness(id1, id2) { 
 var file = document.querySelector('input[type=file]').files[0]
	daElement = document.getElementById(id1),
	reader  = new FileReader();
  reader.onloadend = function(){
    $(daElement).attr("src", reader.result);  
    bp(daElement, reader);

    holderImg = new Image();
    holderImg.onload = function(){
      mkImgTrans(this, id2); 					
    };
	holderImg.src = daElement.src;    
  }; //end reader onloaded
  if (file) { //need to make sure it's actually an image
    reader.readAsDataURL(file);
  } else {
    $(id1).attr("src", "");    
    $(id2).attr("alt", "no image found");
  } //end if
}//end newHotness

function init() { 
  var img1ID, img2ID;
	img1ID = 'incoming'; img2ID = 'outcome';
  $('body').css("background-color", "green"); //greenscreen to see easier
  $('#selection').change(function(){newHotness(img1ID, img2ID);}); 
}
bp.ready();









