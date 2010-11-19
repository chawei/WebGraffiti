var style_element;
var canvasElement;

var modes = {};

window.addEventListener("resize", function() {
	
	canvasElement.height = Math.floor(window.innerHeight);
	canvasElement.width = Math.floor(window.innerWidth);
	
//	drawCanvas();
	
}, false);

function createBodyContainer(){
	
}

function createCanvas(){

	modifyUI();
	
	canvasElement = document.createElement('canvas');	
	canvasElement.height= Math.floor(window.innerHeight);
	canvasElement.width= Math.floor(window.innerWidth);
	canvasElement.style.position = "absolute";
	canvasElement.style.left = 0;
	canvasElement.style.top = 0;
	canvasElement.style.zIndex = -1;
	canvasElement.setAttribute('id','canvasId');

	document.body.appendChild(canvasElement);
	var processingInstance = new Processing(canvasElement, sketchProc);
	
	// <embed type="audio/x-wav" src="" autostart="true" loop="true" hidden="true" id="music"></embed>
	var sound = document.createElement('embed');
	sound.setAttribute('src', "http://people.artcenter.edu/~tchien/assets/yawn3.wav");
	sound.setAttribute("loop","false");
	sound.setAttribute("autostart","true");
	sound.setAttribute("type","audio/x-wav");
	sound.setAttribute("hidden","true");
	document.body.appendChild(sound);
	
}

function injectCss(cssToInject) {
	style_element = document.createElement("style");
  style_element.innerText = cssToInject;
  document.documentElement.insertBefore(style_element, null);

//	$("body *").wrapAll("<div id='bodyContainer'></div>");
	$('body center').addClass('invisible');
}

function modifyUI(){

	// add font link <link href='http://fonts.googleapis.com/css?family=Reenie+Beanie&subset=latin' rel='stylesheet' type='text/css'>
	var headID = document.getElementsByTagName("head")[0];    
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.media = 'screen';
	cssNode.href = 'http://fonts.googleapis.com/css?family=Reenie+Beanie&subset=latin';
	headID.appendChild(cssNode);
	
	// replace img
	var logoDiv = document.getElementById('lga');
	var img = logoDiv.getElementsByTagName('img')[0];
	logoDiv.removeChild(img);
	var newImg = document.createElement("img");
	newImg.setAttribute('src', "http://people.artcenter.edu/~tchien/assets/crap.png");
	newImg.setAttribute('alt', 'na');
	logoDiv.appendChild(newImg);
	
	// create new text
	var fontElement = document.getElementsByTagName('font')[0];
	removeChildNodes(fontElement);
	// var newText = document.createTextNode('WHO GIVE A SHIT ABOUT');
	// fontElement.appendChild(newText);
	// fontElement.style["font-size"] = '3em';
	
	// change button
	var buttonSubmit = getElementsByClass(document,'lsbb','span');
	var btn2 = buttonSubmit[1].childNodes[0];
	btn2.value = "Wish Me Luck";
	btn2.style["font-size"] = '1.5em';
	var btn1 = buttonSubmit[0].childNodes[0];
//	btn1.value = "I";
	btn1.style["font-size"] = '1.5em';

}

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

function findPosX(obj)
  {
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

  function findPosY(obj)
  {
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


function removeCss(){
    style_element.parentNode.removeChild(style_element);
    history.go(0);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "injectCss") {
		injectCss(request.css);
  } else if (request.action == "removeCss") {
		removeCss();
  } else if (request.action == "drawCanvas") {
//		drawCanvas();
	} else if (request.action == "createCanvas") {
		createCanvas();
	} 
	
});


// processing jscode
function sketchProc(processing) {  
 
  var mode = 1;

	var scaleInt;
	var designateWidth = 600;
	var designateHeight = 30;
	
	var dots;
	var dusts;
	
	var txtFieldX, txtFieldY, txtFieldW, txtFieldH;
	
	var btnSubmit, btnLuck;
	
	processing.setup = function(){
		// draw freehand textfield
		var inputs = getElementsByClass(document,'lst','input');
		txtFieldX = Math.floor(findPosX(inputs[0]));
		txtFieldY = Math.floor(findPosY(inputs[0]));
		
		txtFieldW = Math.floor(inputs[0].offsetWidth);
		txtFieldH = Math.floor(inputs[0].offsetHeight);

		// change button
		var buttons = getElementsByClass(document,'lsbb','span');
		btnSubmit = buttons[0].childNodes[0];
		btnLuck = buttons[1].childNodes[0];
		
		switch(mode){
			case 0:
				modeYawnSetup();
				break;			
		  case 1:
				modeDustSetup();
				break;
		}
	}
	
	// Override draw function, by default it will be called 60 times per second  
  processing.draw = function() {
		
		switch(mode){
			case 0:
				modeYawnDraw();
				break;			
		  case 1:
				modeDustDraw();
				break;
		}
		
  };
	
	function Dust(x, y, moveToX, moveToY){

		this.position = new processing.PVector(x,y);
		this.targetPosition = new processing.PVector(moveToX,moveToY);
		
		this.radiusX = 10;
		this.radiusY = 10;
		this.scaleInt = new DIntegrator(0.01, 0.8, 0.05);
    this.scaleInt.setTarget(1.0);
		
		this.moving = function(){
			console.log(this.position);
			console.log(this.targetPosition);
			var v = new processing.PVector(this.targetPosition.x-this.position.x, this.targetPosition.y-this.position.y);
//			console.log(" "+v.normalize());
			
//			this.position.add(v.normalize());
		}
		
		this.draw = function(){
			
			processing.fill(33);
			processing.stroke(33);
			
			var currentAngle = 0;
		  var totalDots = 20;
		  var angleGap = 2*Math.PI/totalDots;
			
			if(this.scaleInt.value > this.scaleInt.target)
	    {
	      this.scaleInt.setTarget( Math.random()/3+1 );
	    }
//			this.moving();
			this.scaleInt.update();
			this.radiusX = 11 * processing.map(this.scaleInt.value, 0, 1, 1, 2);
			this.radiusY = 10 * processing.map(this.scaleInt.value, 0, 1, 1, 2);
			
			processing.beginShape();
		
		
			for(var i=0; i<totalDots; i++){
		
				var xx = this.position.x + Math.cos(currentAngle)*this.radiusX*(1+Math.random()*0.07);
				var yy = this.position.y + Math.sin(currentAngle)*this.radiusY*(1+Math.random()*0.07);
				
				processing.vertex(xx, yy);
				currentAngle += angleGap;
			}
			processing.endShape(processing.CLOSE);
		
		}
	}
	
	function modeDustDraw(){
		processing.background(255);
		for(var i=0; i<dusts.size(); i++){
			var dust = dusts.get(i);
			dust.draw();
		}
	}
	
	function modeDustSetup(){
		dusts = new processing.ArrayList();
		dusts.add(new Dust(100, 100, 300, 200));
		
	}

	function modeYawnSetup(){
		scaleInt = new Integrator();
	  processing.smooth();
		processing.frameRate(25);
		
		dots = new processing.ArrayList();
	}
	
	function modeYawnDraw(){
		if(scaleInt!=null){
	    if(scaleInt.stage==3){
	      processing.background(255);
				processing.noFill();
	      processing.stroke(33);
				drawFreehandRect(txtFieldX, txtFieldY, txtFieldW, txtFieldH);
				drawFreehandRect( findPosX( btnSubmit ), findPosY( btnSubmit ),btnSubmit.offsetWidth,btnSubmit.offsetHeight);
				drawFreehandRect( findPosX( btnLuck ), findPosY( btnLuck ), btnLuck.offsetWidth,btnLuck.offsetHeight);
	      scaleInt = null;
				
				$('body center').removeClass('invisible').hide().fadeIn();
	    }
	    else{
	      processing.background(255);
	      scaleInt.update();
				processing.noFill();
				processing.stroke(33);
	      drawFreehandEllipse(txtFieldX+txtFieldW/2, txtFieldY+txtFieldH/2, processing.map(scaleInt.value, 0, 1, 1, 2)*txtFieldW, processing.map(scaleInt.value, 0, 1, 1, 5)*txtFieldH);
	    }
	  }
	}
	
	function drawFreehandEllipse(x, y, w, h){
	
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
				
		    processing.curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
	
		  }
		}
		
		function drawFreehandRect(x, y, w, h){

		  var gap = 2;
		  var freeFactor = 0.2;
		
		  processing.stroke(processing.color(33,33,33));

		  processing.beginShape();
		  processing.vertex(x,y);  

		  var currentX = x;
		  var currentY = y;

			   // MOUTH
			// TOP 
			while( currentX<(x+w) ){
				var randomX = Math.random()*gap;
				var randomY = Math.random()>0.5 ? Math.random() : -1*Math.random();
				currentX += randomX;
				currentY += randomY*freeFactor;
				processing.vertex( currentX, currentY);
			}
			// RIGHT
			while( currentY<(y+h) ){
				var randomY = Math.random()*gap;
				var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
				currentX += randomX*freeFactor;
				currentY += randomY;
				processing.vertex( currentX, currentY);
			}
			// BOTTOM
			while( currentX>x ){
				var randomX = -1*Math.random()*gap;
				var randomY = Math.random()>0.5 ? Math.random() : -1*Math.random();
				currentX += randomX;
				currentY += randomY*freeFactor;
				processing.vertex( currentX, currentY);
			}
			// LEFT
			while( currentY>y ){
				var randomY = -1*Math.random()*gap;
				var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
				currentX += randomX*freeFactor;
				currentY += randomY;
				processing.vertex( currentX, currentY);
			}
		  processing.endShape();

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
		
		function Point(x,y){
		    this.x = x;
		    this.y = y; 
		}
	
	
}