// processing jscode
function sketchProc(processing) {  
 
	var scaleInt;
	var designateWidth = 600;
	var designateHeight = 30;
	
	var dots;
	var dusts;
	
	var txtFieldX, txtFieldY, txtFieldW, txtFieldH;
	
	var btnSubmit, btnLuck, wgButtonSubmit, wgButtonLuck;
	
	processing.setup = function(){
		
		switch(MODE){
			case 0:
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
				wgButtonSubmit = new WGButton(findPosX( btnSubmit ), findPosY( btnSubmit ),btnSubmit.offsetWidth,btnSubmit.offsetHeight);
				wgButtonLuck = new WGButton(findPosX( btnLuck ), findPosY( btnLuck ),btnLuck.offsetWidth,btnLuck.offsetHeight);
				modeYawnSetup();
				break;
		  case 1:
				canvasElement.style.zIndex = 10;
				modeDustSetup();
				break;
		}
		processing.smooth();
		processing.frameRate(25);
	}
	
	// Override draw function, by default it will be called 60 times per second  
  processing.draw = function() {
		switch(MODE){
			case 0:
				modeYawnDraw();
				break;			
		  case 1:
				modeDustDraw();
				break;
		}
  };
	
	function Dust(x, y){

		this.position = new processing.PVector(x,y);
		this.location = 'L'; // left:'L', right:'R', top:'T'
				
		this.radiusX = 10;
		this.radiusY = 10;
		this.scaleInt = new DIntegrator(0.01, 0.8, 0.05);
    this.scaleInt.setTarget(1.0);

		this.moveState = 0; // 0 1 2 3
		this.moveCounter = 0;
		
		this.eyeX = 10;
		this.eyeY = -10;
	
		this.draw = function(){
			
			if(this.scaleInt.value > this.scaleInt.target)
	      this.scaleInt.setTarget( Math.random()/3+1 );
			this.scaleInt.update();
			this.move();
			var scale = processing.map(this.scaleInt.value, 0, 1, 1, 2);
			this.radiusX = 10 * scale;
			this.radiusY = 10 * scale;
			var eyeW = 7; 
			var eyeH = 7;
			
			switch(this.location){
				case 'T':
					this.drawEye( this.radiusX*1.2, 0, this.eyeX, this.eyeY, eyeW, eyeH);
					this.drawEye(-this.radiusX*1.2, 0, this.eyeX, this.eyeY, eyeW, eyeH);
					break;
				case 'L':
					this.drawEye( 0,  this.radiusX*1.2, this.eyeX, this.eyeY, eyeW, eyeH);
					this.drawEye( 0, -this.radiusX*1.2, this.eyeX, this.eyeY, eyeW, eyeH);
					break;
			}
		}
		
		this.move = function() {
		
			switch(this.moveState){
				case 0: // outside
					this.moveCounter++;
					if(this.moveCounter>50)
						this.moveState=1;
					
					canvasElement.style.zIndex = -1; // let links clickable
					break; 
				case 1: // inward
					if(this.location=='L'){
						this.position.x+=2;
						if(this.position.x>24)
							this.moveState=2;
					}
					else if(this.location=='T'){
						this.position.y+=2;
						if(this.position.y>24)
							this.moveState=2;
					}
					
					canvasElement.style.zIndex = 10; // make the canvas stay on the top layer
					break;
				case 2: // halt
					this.moveCounter+=2;
					this.rollEyes();
					if(this.moveCounter>200)
						this.moveState=3;
					break;
				case 3: // outward
					if(this.location=='L'){
						this.position.x-=2;
						if(this.position.x<-30){
							this.moveCounter=0;
							this.location = 'T'
							this.position.x= processing.random(100,processing.width-100);
							this.position.y=-30;							
							this.moveState=0;
							this.eyeX = -10;
							this.eyeY = 10;
						}
					}
					else if(this.location=='T'){
						this.position.y-=2;
						if(this.position.y<-30){ // reset
							this.moveCounter=0;
							this.location = 'L'
							this.position.y=processing.random(100,800);
							this.position.x=-30;
							this.moveState=0;
							this.eyeX = 10;
							this.eyeY = -10;
						}
					}
					break;
				case 4: //escape
				  if(this.moveCounter<7){
				    this.moveCounter++;
				    this.eyeX = 7*(1+processing.random());
				    this.eyeY = 7*(1+processing.random());
			    }
				  else{
  					if(this.location=='L'){
  						this.position.x-=9;
  						if(this.position.x<-30)
  							this.moveState=3;
  					}
  					else if(this.location=='T'){
  						this.position.y-=9;
  						if(this.position.y<-30)
  							this.moveState=3;
  					}
					}
					break;
			}
	}
		this.rollEyes = function(){
			// this.moveCounter   50-200
			if(this.location=='L'){
				if( this.moveCounter<125 )
					this.eyeY+=0.5;
				else
					this.eyeY-=0.5;
			}
			else if(this.location=='T'){
				if( this.moveCounter<125 )
					this.eyeX+=0.5;
				else
					this.eyeX-=0.5;
			}
		}
		
		this.drawEye = function(shiftX, shiftY, eyeX, eyeY, eyeW, eyeH){
		
		  // eye
			var currentAngle = 0;
		  var totalDots = 20;
		  var angleGap = 2*Math.PI/totalDots;
			
			processing.stroke(33);
			processing.fill(255);
			
			processing.pushMatrix();
			processing.translate(this.position.x+shiftX, this.position.y+shiftY);
			processing.beginShape();
			for(var i=0; i<totalDots; i++){
				var xx = Math.cos(currentAngle)*this.radiusX*(1+Math.random()*0.07);
				var yy = Math.sin(currentAngle)*this.radiusY*(1+Math.random()*0.07);
				processing.vertex(xx, yy);
				currentAngle += angleGap;
			}
			processing.endShape();
			
			// eye ball
      processing.fill(33);
      processing.noStroke();
		
			processing.ellipse(eyeX*(1+Math.random()*0.006), eyeY*(1+Math.random()*0.006), eyeW*(1+Math.random()*0.006), eyeH*(1+Math.random()*0.006));
			processing.popMatrix();
		}
		
		this.escape = function(){
		  this.moveState = 4;
		  this.scaleInt.setTarget(2);
		  this.moveCounter = 0;
		}
		
	}
	
  
	processing.keyReleased = function() {
    if(processing.keyCode==processing.ESC || processing.key == processing.ESC){
      scaleInt = new Integrator();
    }
	}
	
	processing.mouseMoved = function() {
	  if(dusts!=null){
	    var d = dusts.get(0);
      d.escape();
    }
	}
	
	function modeDustDraw(){
    var context = canvasElement.getContext('2d');
    context.clear = true;
    context.clearRect( 0, 0, processing.width, processing.height);
		
		for(var i=0; i<dusts.size(); i++){
			var dust = dusts.get(i);
			dust.draw();
		}
	}
	
	function modeDustSetup(){
		dusts = new processing.ArrayList();
		dusts.add(new Dust(-30, processing.random(100,800)));
	}

	function modeYawnSetup(){
    scaleInt = new Integrator();
    dots = new processing.ArrayList();
	}
	
	function modeYawnDraw(){
		if(scaleInt!=null){
	    if(scaleInt.stage==3){
	      processing.background(255);
				processing.noFill();
	      processing.stroke(33);
				drawFreehandRect(txtFieldX, txtFieldY, txtFieldW, txtFieldH, false, processing);
	      wgButtonSubmit.draw();
	      wgButtonLuck.draw();
	      scaleInt = null;
				
				$('body center').removeClass('invisible').hide().fadeIn();
	    }
	    else{
	      processing.background(255);
	      scaleInt.update();
//				processing.noFill();
        processing.fill(255, 255, 240);
				processing.stroke(33);
	      drawFreehandEllipse(txtFieldX+txtFieldW/2, txtFieldY+txtFieldH/2, processing.map(scaleInt.value, 0, 1, 1, 2)*txtFieldW, processing.map(scaleInt.value, 0, 1, 1, 5)*txtFieldH);
	    }
	  }
	  else{
	    if(wgButtonSubmit.isMoving){
	      processing.background(255);
	      wgButtonSubmit.draw();
        wgButtonLuck.draw();
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
          processing.curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
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
		
		function WGButton(x,y,width,height,label){
		  this.x = x;
		  this.y = y;
		  this.width = width;
		  this.height = height;
		  this.label = label;
		  this.targetX = 0;
		  this.targetY = 0;
		  this.isMoving = false;
		  
		  this.draw = function() {
        if(this.isMoving){
          this.updatePosition();
        }
        else if(Math.random()>0.99){
          this.setTargetPosition();
        }
		    drawFreehandRect( this.x, this.y, this.width, this.height, true, processing);
		  }
		  this.setTargetPosition = function() {
		    this.targetX = this.x+Math.random()*30;
		    this.targetY = this.y+Math.random()*30;;
		    this.isMoving = true;
		  }
		  this.updatePosition = function() {
		    if( processing.abs(this.x-this.targetX)>2 ){
		      this.x -= (this.x-this.targetX)/processing.abs(this.x-this.targetX);
		      this.y -= (this.y-this.targetY)/processing.abs(this.y-this.targetY);
		    }
		    else{
		      this.isMoving = false;
		    }
		  }
		}	
}