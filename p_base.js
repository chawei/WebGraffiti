
function WGButton(btn){
  
  var x = 10;//findPosX( btn );
  var y = 10;//findPosY( btn );
  var width = btn.offsetWidth;
  var height = btn.offsetHeight;
  var targetX = 0;
  var targetY = 0;
  var isMoving = false;
  var htmlBtn = btn;
  var moveBtn = btn.parentNode;
  init();
  
  function init() {
    var canvasElement = document.createElement('canvas');	
  	canvasElement.height= Math.floor(height)+20;
  	canvasElement.width= Math.floor(width)+20;
  	
  	canvasElement.style.position = "absolute";
  	canvasElement.style.left = "-10px";
  	canvasElement.style.top = "-10px";
  	canvasElement.style.zIndex = 3;
  	htmlBtn.appendChild(canvasElement);
  	var processingInstance = new Processing(canvasElement, sketchProc);
  }
  
  function sketchProc(processing) {
    processing.setup = function() {
      processing.smooth();
  		processing.frameRate(10);
  		this.drawFreehandRect( x, y, width, height, true);
    }
    processing.draw = function() {
      
      if(isMoving){
        updatePosition();
        processing.clear();
        this.drawFreehandRect( x, y, width, height, true);
      }
      else if(Math.random()>0.98){
        setTargetPosition();
      }
      
    }
    function setTargetPosition() {
      var gap = 30;
      targetX = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      targetY = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      
      while( processing.abs(findPosX(moveBtn)+targetX-window.innerWidth/2)>200 ){
        targetX = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      }
      while( findPosY(moveBtn)+targetY-window.innerHeight/2<30 ){
        targetY = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      }
      moveBtn.style.left = findPosX(moveBtn) + "px";
      moveBtn.style.top = findPosY(moveBtn) + "px";
      moveBtn.style.position = 'absolute';
      
      isMoving = true;
      
      console.log("SET: "+targetX,targetY);
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

Processing.prototype.drawFreehandEllipse = function(x, y, w, h, dots) {
  var currentAngle = 0;
  var totalDots = Math.floor( (w+h)/40 );
	if(totalDots<5)
    totalDots = 5;
    
  var angleGap = 2*Math.PI/totalDots;
  dots.clear();
  for(var i=0; i<totalDots; i++){
    var p = new Point( x+Math.cos(currentAngle)*w/2*(1+Math.random()*0.1), y+Math.sin(currentAngle)*h/2*(1+Math.random()*0.1) );
    currentAngle+=angleGap;
    dots.add(p);
  }
	
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
      this.curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
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

Processing.prototype.drawFreehandRect = function(x, y, w, h, isBtn) {
  var gap = 2;
  var freeFactor = 0.2;
  this.stroke(33);
  if(isBtn)
    this.fill(255, 255, 240);
  else
    this.fill(255);
//  this.noFill();
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