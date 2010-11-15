
var c=document.getElementById("canvasId");
var context=c.getContext("2d");

drawFreehandRect(100, 100, 500, 27);

function drawFreehandRect(x, y, width, height){
  	
	var gap = 4;
	var freeFactor = 0.3;
	
	context.lineJoin = "round";
	context.strokeStyle = "#333";
	
	context.beginPath();
	context.moveTo( x, y);
	
	var currentX = x;
	var currentY = y;
	
	// TOP 
	while( currentX<(x+width) ){
		
		var randomX = Math.random()*gap;
		var randomY = Math.random()>0.5 ? Math.random() : -1*Math.random();

		currentX += randomX;
		currentY += randomY*freeFactor;

		context.lineTo( currentX, currentY);
	}
	// RIGHT
	while( currentY<(y+height) ){
		
		var randomY = Math.random()*gap;
		var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
		
		currentX += randomX*freeFactor;
		currentY += randomY;
			
		context.lineTo( currentX, currentY);
	}
	// BOTTOM
	while( currentX>x ){
		
		var randomX = -1*Math.random()*gap;
		var randomY = Math.random()>0.5 ? Math.random() : -1*Math.random();

		currentX += randomX;
		currentY += randomY*freeFactor;

		context.lineTo( currentX, currentY);
	}
	
	// LEFT
	while( currentY>y ){
		
		var randomY = -1*Math.random()*gap;
		var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
		
		currentX += randomX*freeFactor;
		currentY += randomY;
			
		context.lineTo( currentX, currentY);
	}
	
	context.closePath();
	
	context.stroke();
}
