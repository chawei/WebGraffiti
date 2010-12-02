// function WGClock(parent,w,h){
// 	var parentNode = parent;
// 	var width = w;
// 	var height = h;
// 	init();
// 	function init() {
//     var canvasElement = document.createElement('canvas');	
// 		canvasElement.width= width;
//   	canvasElement.height= height;
//   	canvasElement.style.position = "absolute";
//   	canvasElement.style.zIndex = -3;
//   	parentNode.appendChild(canvasElement);
//   	var processingInstance = new Processing(canvasElement, sketchProc);
//   }
// 	function sketchProc(processing) {
//     processing.setup = function() {
// 			processing.smooth();
//   		processing.frameRate(20);
// 			
//     }
// 		processing.draw = function(){
// 			
// 		}
// }

function WGTextfield(txtField,flag){
  var x = 300;
  var y = 80;
  var width = txtField.offsetWidth;
  var height = txtField.offsetHeight;
  var htmlTxtfield = txtField;
  var scaleInt;
	var isActive = flag;
  init();
  
  function init() {
    var canvasElement = document.createElement('canvas');	
  	canvasElement.height= Math.floor(height)+160;
  	canvasElement.width= Math.floor(width)+600;
  	canvasElement.style.position = "absolute";
  	canvasElement.style.left = "-300px";
  	canvasElement.style.top = "-80px";
  	canvasElement.style.zIndex = -3;
  	htmlTxtfield.appendChild(canvasElement);
  	var processingInstance = new Processing(canvasElement, sketchProc);
  }
  
  function sketchProc(processing) {
    processing.setup = function() {
			processing.smooth();
  		processing.frameRate(20);
  		this.drawFreehandRect( x, y, width, height, false);
			if(isActive) {
	      scaleInt = new Integrator();
			}
			else
				processing.noLoop();
    }
    processing.draw = function() {
      if(scaleInt!=null){
  	    if(scaleInt.stage==3){
  	      processing.clear();
  				processing.drawFreehandRect(x, y, width, height, false);
  	      scaleInt = null;
  				$('body center').removeClass('invisible').hide().fadeIn();
  	    }
  	    else{
  	      processing.clear();
  	      scaleInt.update();
  	      processing.drawFreehandEllipse( processing.width/2, processing.height/2, processing.map(scaleInt.value, 0, 1, 1, 1.5)*width, processing.map(scaleInt.value, 0, 1, 1, 3.5)*height, 0, 2*Math.PI);
  	    }
  	  }
    };
  }
}

function WGCrack(element, cx, cy){
	var parent = element;
	var x = cx;
	var y = cy;
	var width = 100;
	var height = 100;
	
	init();
	function init() {
    var canvasElement = document.createElement('canvas');	
  	canvasElement.height = height;
  	canvasElement.width = width;
  	canvasElement.style.position = "absolute";
  	canvasElement.style.left = x-width/2+"px";
  	canvasElement.style.top = y-height/2+"px";
//  	canvasElement.style.zIndex = -1;
  	parent.appendChild(canvasElement);  
  	var processingInstance = new Processing(canvasElement, sketchProc);
  }
  
  function sketchProc(processing) {
		
    processing.setup = function() {
      processing.smooth();
  		processing.frameRate(10);
			processing.noFill();
			processing.stroke(33);
			
			var circles = Math.round(Math.random()*7+5);
			var r = 20;
			var delta = 2;
			for(var i=1; i<=circles; i++) {
				var arcs = Math.round(Math.random()*4+4);
				var arr = chunks(arcs);
				var start = 0;
				// arcs
				for(var j=0; j<arcs; j++) {
					var end = start + arr[j];
					var radius = r*processing.random(0.6,1.2) + delta*i*(1+Math.random()/3);
					var dx = Math.random()>0.5 ? i*Math.random()/2: -1*i*Math.random()/2;
					var dy = Math.random()>0.5 ? i*Math.random()/2: -1*i*Math.random()/2;
					processing.strokeWeight( processing.random(0.3,0.5) );
					processing.drawFreehandArc(width/2+dx, height/2+dy, radius, radius, start*2*Math.PI, end*2*Math.PI);
					
					if(Math.random()>0.5) {
						var lx1 = width/2+dx+radius*processing.cos(start*2*Math.PI)/2;
						var ly1 = height/2+dy+radius*processing.sin(start*2*Math.PI)/2;
						var lx2 = width/2+dx+radius*processing.cos(start*2*Math.PI)*(1+processing.random(-0.5,0.5));
						var ly2 = height/2+dy+radius*processing.sin(start*2*Math.PI)*(1+processing.random(-0.5,0.5));
						processing.strokeWeight( processing.random(0.1,0.2) );
						processing.drawFreehandLine(lx1, ly1, lx2, ly2);
					}
					
					start += arr[j];
				}

			}
			
			processing.noLoop();
    }
    processing.draw = function() {
	
		}
	}
	
}

function WGButton(btn,left,top,mode){
  var x = 10;
  var y = 10;
  var width = btn.offsetWidth;
  var height = btn.offsetHeight;
  var targetX = 0;
  var targetY = 0;
  var isMoving = false;
  var htmlBtn = btn;
  var moveBtn = btn.parentNode;
  var counter = 0;
  var reverseCount = 0;
	var isActive = mode;
  moveBtn.style.position = 'absolute';
  moveBtn.style.left = left + "px";
  moveBtn.style.top = top + "px";
  init();
  
  this.getMovingStatus = function() {
    return isMoving;
  }
  this.getBtnX = function() {
    return findPosX(moveBtn);
  }
  this.getBtnY = function() {
    return findPosY(moveBtn);
  }
  this.getTargetX = function() {
    if(targetX!=0)
      return targetX/Math.abs(targetX);
    else
      return 0;
  }
  this.getTargetY = function() {
    if(targetY!=0)
      return targetY/Math.abs(targetY);
    else
      return 0;
  }

  this.reverseMoving = function(newTargetX,newTargetY) {
    if(reverseCount<=0){
      targetX = newTargetX;
      targetX = newTargetY;
//      console.log("re:",targetX,targetY);
      isMoving = true;
      reverseCount = 20;
    }
  }
  function init() {
    var canvasElement = document.createElement('canvas');	
  	canvasElement.height= Math.floor(height)+20;
  	canvasElement.width= Math.floor(width)+20;
  	canvasElement.style.position = "absolute";
  	canvasElement.style.left = "-10px";
  	canvasElement.style.top = "-10px";
  	canvasElement.style.zIndex = -1;
  	htmlBtn.appendChild(canvasElement);  
  	var processingInstance = new Processing(canvasElement, sketchProc);
  }
  
  function sketchProc(processing) {
    processing.setup = function() {
      processing.smooth();
  		processing.frameRate(10);
  		this.drawFreehandRect( x, y, width, height, true);
  		counter = 0;
			if(isActive==false)
				processing.noLoop();
    }
    processing.draw = function() {
      console.log("d");
      if(isMoving){
        updatePosition();
        processing.clear();
        this.drawFreehandRect( x, y, width, height, true);
      }
      else if(Math.random()>0.98) {
        setTargetPosition();
      }
      // if(reverseCount>0)
      //   reverseCount--;
      // if(counter<=45)
      //   counter++;
    
    }
    function setTargetPosition() {
      var gap = 30;
      targetX = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      targetY = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      
      while( processing.abs(findPosX(moveBtn)+targetX-window.innerWidth/2)>200 ){
        targetX = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      }
      while( (findPosY(moveBtn)+targetY)<200 ||  (findPosY(moveBtn)+targetY)>600){
        targetY = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      }

      isMoving = true;
    }
    function updatePosition() {
      if( targetX!=0 ) {
        var newX = targetX>0 ? parseFloat(moveBtn.style.left)+1 : parseFloat(moveBtn.style.left)-1;
        moveBtn.style.left = newX+"px";
        targetX = targetX>0 ? (targetX-1) : (targetX+1);
      }
      if( targetY!=0 ) {
        var newY = targetY>0 ? parseFloat(moveBtn.style.top)+1 : parseFloat(moveBtn.style.top)-1;
        moveBtn.style.top = newY+"px";
        targetY = targetY>0 ? targetY-1 : targetY+1;
      }
      if( targetX==0 && targetY==0)
        isMoving = false;
    }
  }
}

Processing.prototype.drawFreehandLine = function(x1, y1, x2, y2) {
		
	var dist = this.dist(x1, y1, x2, y2);
	var basic = 4;
	var pieces = dist/basic;
	
	var dx = (x2-x1)/pieces;
	var dy = (y2-y1)/pieces;
	
 	this.beginShape();
  this.vertex(x1,y1);
	
	for(var i=0; i<pieces; i++) {
		var tx = x1 + dx*(i + this.random(2,4));
		var ty = y1 + dy*(i + this.random(2,4));	
		this.vertex( tx, ty);
	}
	
	this.endShape();
}

Processing.prototype.drawFreehandEllipse = function(x, y, w, h, start, end) {
  var currentAngle = 0;
  var totalDots = Math.floor( (w+h)/40 );
	if(totalDots<5)
    totalDots = 5;
  var angleGap = 2*Math.PI/totalDots;
	var dots = new this.ArrayList();	

  for(var i=0; i<totalDots; i++) {
		if(currentAngle>=start && currentAngle<=end) {
    	var p = new Point( x+Math.cos(currentAngle)*w/2*(1+Math.random()*0.1), y+Math.sin(currentAngle)*h/2*(1+Math.random()*0.1) );
			dots.add(p);
    }
		currentAngle+=angleGap;
  }
	
	if(dots.size()>=4) {
  	for(var j=0; j<dots.size(); j++){
	    var p1,p2,p3,p4;
	    p1 = dots.get(j);
	    if( j==dots.size()-3){
	      p2 = dots.get(j+1);
	      p3 = dots.get(j+2);
	      p4 = dots.get(0);
	    }
	    else if(j==dots.size()-2){
	      p2 = dots.get(j+1);
	      p3 = dots.get(0);
	      p4 = dots.get(1);
	    }
	    else if(j==dots.size()-1){
	      p2 = dots.get(0);
	      p3 = dots.get(1);
	      p4 = dots.get(2);
	    }
	    else{
	      p2 = dots.get(j+1);
	      p3 = dots.get(j+2);
	      p4 = dots.get(j+3);
	    }
	    this.curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
	  }
	}
	dots = null;
}


Processing.prototype.drawFreehandArc = function(x, y, w, h, start, end) {
  var currentAngle = 0;
  var totalDots = Math.floor( (w+h)/40 );
	if(totalDots<5)
    totalDots = 40;
  var angleGap = 2*Math.PI/totalDots;
	var dots = new this.ArrayList();	

  for(var i=0; i<totalDots; i++) {
		if(currentAngle>=start && currentAngle<=end) {
    	var p = new Point( x+Math.cos(currentAngle)*w/2*(1+Math.random()*0.1), y+Math.sin(currentAngle)*h/2*(1+Math.random()*0.1) );
			dots.add(p);
    }
		currentAngle+=angleGap;
  }
	
	this.beginShape();
 	for(var j=0; j<dots.size(); j++){
    var p = dots.get(j);
		this.vertex(p.x, p.y);
  }
	this.endShape();
	dots = null;
}


Processing.prototype.drawFreehandRect = function(x, y, w, h, isBtn) {
  var gap = 2;
  var freeFactor = 0.2;
  this.stroke(33);
  if(isBtn)
    this.fill(255, 255, 240);
  else
    this.fill(255);

  this.beginShape();
  this.vertex(x,y);  
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
		this.vertex( currentX, currentY);
		vertex[0] = new Point(currentX, currentY);
	}
	// RIGHT
	while( currentY<(y+h) ){
		var randomY = Math.random()*gap;
		var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX*freeFactor;
		currentY += randomY;
		this.vertex( currentX, currentY);
		vertex[1] = new Point(currentX, currentY);
	}
	// BOTTOM
	while( currentX>x ){
		var randomX = -1*Math.random()*gap;
		var randomY = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX;
		currentY += randomY*freeFactor;
		this.vertex( currentX, currentY);
		vertex[2] = new Point(currentX, currentY);
	}
	// LEFT
	while( currentY>y ){
		var randomY = -1*Math.random()*gap;
		var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX*freeFactor;
		currentY += randomY;
		this.vertex( currentX, currentY);
		vertex[3] = new Point(currentX, currentY);
	}
  this.endShape();

  if(isBtn){
    for(var i=0; i<3; i++){
      this.line(vertex[i].x, vertex[i].y, vertex[i].x+4, vertex[i].y+3);
    }
  }
}

function Point(x,y){
  this.x = x;
  this.y = y; 
}

function DIntegrator(value, damping, attraction) {      
  this.value = value;
  this.vel = 0;
  this.accel = 0;
  this.force = 0;
  this.mass = 1;
  
  this.damping = damping;
  this.attraction = attraction;
  this.targeting = true;
  this.target;

  this.set = function(v) {
    this.value = v;
  }

  this.update = function() {

    if (this.targeting) {
      this.force += this.attraction * (this.target - this.value);
    }
		
    this.accel = this.force / this.mass;
    this.vel = (this.vel + this.accel) * this.damping;
    this.value += this.vel;

    this.force = 0;
  }

  this.setTarget = function(t) {
    this.targeting = true;
    this.target = t;
  }

  this.noTarget = function() {
    this.targeting = false;
  }
}

function Integrator() {
  this.value = 0;
  this.timer = 0;
  this.stage = 0;
	this.peakTime = 10;
	this.yawnTime = this.peakTime+6;
	
  this.update = function() {
    var tmpValue = 0;

    switch(this.stage){
      case 0:
        this.value = curveValue(this.timer-this.peakTime, this.peakTime);
        this.timer++;
        if(this.value==1)
          this.stage = 1;
        break;
      case 1:
        this.timer++;
        if(this.timer==this.yawnTime)
          this.stage = 2;
        break;
      case 2:
        this.value = curveValue(this.timer-this.yawnTime,this.peakTime+8);
        this.timer++; 
        if(this.value==0)
          this.stage = 3;
        break;
    }
  }

  function curveValue(x, xx){ // x range: -xx to xx, curveValue range: 0 - 1 - 0
    var yValue = -1/Math.pow(xx,2)*Math.pow(x,2) + 1;
    return yValue;
  }

}

function chunks(cuts) { // 0-1
	var avr = 1.0/cuts;
	var array = new Array(cuts);
	array[0] = 's';
	for(var i=0; i<cuts; i++) {
		array[i] = avr;
	}

	for(var j=0; j<cuts; j++) {
		var diff = array[j] * Math.random()/2;
		array[j] -= diff;
		if(j==cuts-1)
			array[0] += diff;
		else
			array[j+1] += diff;
	}

	return array;
}

/* Basic DOM functions 
 *
 * -------------------------- */
 
function removeChildNodes(node)
{
  while (node.childNodes[0])
  {
    node.removeChild(node.childNodes[0]);
  }
}

function getElementsByClass(node,searchClass,tag) {
	
  var classElements = new Array();
  var els = node.getElementsByTagName(tag); // use "*" for all elements	

  var elsLen = els.length;

	var pattern = new RegExp(searchClass);
    for (i = 0, j = 0; i < elsLen; i++) {
	
         if ( pattern.test(els[i].className) ) {
             classElements[j] = els[i];
             j++;
         }
    }
    return classElements;
}

function checkOverlap(x1, w1, x2, w2, buffer){
  var result;
  if(x1 < x2)
    result = x2<(x1+w1-buffer);
  else
    result = x1<(x2+w2-buffer);
  return result;
}

function findPosX(obj) {
  var curleft = 0;
  if(obj.offsetParent)
      while(1) 
      {
        curleft += obj.offsetLeft;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.x)
      curleft += obj.x;
  return curleft;
}

function findPosY(obj) {
  var curtop = 0;
  if(obj.offsetParent)
      while(1)
      {
        curtop += obj.offsetTop;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.y)
      curtop += obj.y;
  return curtop;
}