README & NOTES
/*
 context.moveTo(170, 80);
      context.bezierCurveTo(130, 100, 130, 150, 230, 150);
      context.bezierCurveTo(250, 180, 320, 180, 340, 150);
      context.bezierCurveTo(420, 150, 420, 120, 390, 100);
      context.bezierCurveTo(430, 40, 370, 30, 340, 50);
      context.bezierCurveTo(320, 5, 250, 20, 250, 50);
      context.bezierCurveTo(200, 5, 150, 20, 170, 80);
      context.closePath();
	    // save canvas image as data url (png format by default)
      var dataURL = canvas.toDataURL();

      // set canvasImg image src to dataURL
      // so it can be saved as an image
      document.getElementById('canvasImg').src = dataURL;

<script>

//http://www.html5canvastutorials.com/advanced/html5-canvas-animation-stage/
//http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

      window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

      function animate() {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        // update

        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw stuff

        // request new frame
        requestAnimFrame(function() {
          animate();
        });
      }
      animate();

    </script>

*/

/* //smoke
	var grd=ctx[1].createRadialGradient(75,50,5,90,60,100);
  grd.addColorStop(0,"white");
  grd.addColorStop(0.8,"gray");
  grd.addColorStop(1,"white");
  ctx[1].fillStyle=grd;
//ctx.fillRect(10,10,150,100);
ctx[1].beginPath();
ctx[1].arc(100,75,50,0,2*Math.PI);
ctx[1].fill();
ctx[1].closePath();
	
	this.xMove = 0;
	this.yMove = 0; */
	
	/* var fire = {
 xMove: 0,
 yMove: 0,
 flame: 0,
 color: "#F60",
 x: 285,
 y: 107,
 moutain: 100,
 
 draw: function() {

	if (directions[0]) {this.yMove -= 2; } 
	if (directions[1]) {this.yMove += 2; }
	if (directions[2]) {this.xMove -= 2; }
	if (directions[3]) {this.xMove += 2; }
	//use translate?
    this.x +=this.xMove;
	this.y +=this.yMove;
	
    if (directions[4])  //draw the fire
    {
    ctx[0].fillStyle= '#fa0';
    //use keys pressed to set xyMove
	ctx[0].save();
   //first flame
	ctx[0].beginPath();
    ctx[0].moveTo(this.x,this.y);
    ctx[0].lineTo(this.x+90,this.y+7);
    ctx[0].lineTo(this.x+140,this.y+32);
    ctx[0].fill();	
	
	ctx[0].translate(0,12);
	 ctx[0].rotate(Math.PI);
	ctx[0].lineTo(this.x+90,this.y+7);
    ctx[0].lineTo(this.x+140,this.y+32);
	ctx[0].fill();
	ctx[0].restore();
	ctx[0].closePath();
 */
	/*
	//second flame
	ctx[0].beginPath();
    ctx[0].moveTo(this.x,this.y);
    ctx[0].lineTo(this.x+80,this.y-17);
    ctx[0].lineTo(this.x+130,this.y-42);
    ctx[0].fill();
	ctx[0].closePath();	

	//third flame
	ctx[0].beginPath();
	ctx[0].fillstyle='#0f0';
    ctx[0].moveTo(this.x,this.y);
    ctx[0].lineTo(this.x+100,this.y+3);
    ctx[0].lineTo(this.x+150,this.y+22);
    ctx[0].fill();
	ctx[0].closePath();
	//ctx[0].transform(1.5,0,0,1.5,0,0);
	*/
	//} 

	/* /sine curve
	  context.beginPath();
        context.moveTo(mountain, y);
        mountain += 1;
        y = 50 * Math.sin(0.1 * mountain) + 50;
        context.lineTo(mountain, y);
        context.stroke();
		context.closePath();		
		*/	
		
		/*
 var canvas = document.getElementById('dragon');
  var context = canvas.getContext('2d');
  context.beginPath();
   context.font = '18px sans-serif';
    context.strokeStyle = '#00f';
    context.fillStyle = '#fff';
    context.lineWidth = 2;
    context.lineJoin = 'round';
	 context.save();
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = 25;
    var y = Math.sin(x);
    context.moveTo(yAxis, unit*y+xAxis);
    
    // Loop to draw segments
    for (i = yAxis; i <= width; i += 10) {
        x = t+(-yAxis+i)/unit;
        y = Math.sin(x);
        context.lineTo(i, unit*y+xAxis);
    }
	context.closePath();
	
	*/
	
	function drawSine() {

var mtBot;
var x = 0; var i = 0;

 mtBot = Math.floor(height*.4); //40% of canvas
 
 ctx[2].save();
 ctx[2].beginPath();
 ctx[2].lineWidth = 4;
 ctx[2].lineJoin = 'round';
 ctx[2].fillStyle = '#964';
 ctx[2].strokeStyle = '#964';
 
 ctx[2].moveTo(x,mtBot); //initial position
 ctx[2].lineTo(x, mtBot + Math.sin(x/9));
 
 //loop through x and plot for sin(x)
 
 for (i=0; i< width;i+=1)
{ 
  ctx[2].lineTo(i, 90 * Math.sin(i/9));
}
 //ctx[2].arc(100, mtBot*2, 60, Math.PI, 1.3*Math.PI, false);
 //move to 40% of height and x0
 //ctx[2].moveTo(0,mtBot);
 //ctx[2].lineTo(width,mtBot); 
// ctx[2].lineTo(19,34);
  
 ctx[2].stroke();
 
 ctx[2].closePath();
 ctx[2].restore();
 

}



	
