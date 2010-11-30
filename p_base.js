
// button
function sketchProcButton(processing) {
  var x, y, width, height, label;
  processing.setup = function(_x,_y,_width,_height,_label){
    x = _x; 
    y = _y; 
    width = _width; 
    height = _height; 
    label = _label;
  }
  processing.draw = function(){
    
  }
}

function drawFreehandRect(x, y, w, h, isBtn, processing){
  var gap = 2;
  var freeFactor = 0.2;
  processing.stroke(33);
  if(isBtn)
    processing.fill(255, 255, 240);
  else
    processing.fill(255);
  processing.beginShape();
  processing.vertex(x,y);  
  var currentX = x;
  var currentY = y;
  var vertex = new Array();

  // MOUTH
	// TOP 
	while( currentX<(x+w) ){
		var randomX = Math.random()*gap;
		var randomY = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX;
		currentY += randomY*freeFactor;
		processing.vertex( currentX, currentY);
		vertex[0] = new Point(currentX, currentY);
	}
	// RIGHT
	while( currentY<(y+h) ){
		var randomY = Math.random()*gap;
		var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX*freeFactor;
		currentY += randomY;
		processing.vertex( currentX, currentY);
		vertex[1] = new Point(currentX, currentY);
	}
	// BOTTOM
	while( currentX>x ){
		var randomX = -1*Math.random()*gap;
		var randomY = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX;
		currentY += randomY*freeFactor;
		processing.vertex( currentX, currentY);
		vertex[2] = new Point(currentX, currentY);
	}
	// LEFT
	while( currentY>y ){
		var randomY = -1*Math.random()*gap;
		var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX*freeFactor;
		currentY += randomY;
		processing.vertex( currentX, currentY);
		vertex[3] = new Point(currentX, currentY);
	}
  processing.endShape();

  if(isBtn){
    for(var i=0; i<3; i++){
      processing.line(vertex[i].x, vertex[i].y, vertex[i].x+4, vertex[i].y+3);
    }
  }
}

function Point(x,y){
  this.x = x;
  this.y = y; 
}