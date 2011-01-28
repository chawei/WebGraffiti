function WGDust() {
  this.init = function() {
    
  }
  
  this.sketchProc = function(processing) {
  	var scaleInt;
  	var designateWidth = 600;
  	var designateHeight = 30;

  	var dots;
  	var dusts;
  	
  	var btnSubmit, btnLuck, wgButtonSubmit, wgButtonLuck;

  	processing.setup = function(){
  		canvasElement.style.zIndex = 10;
  		modeDustSetup();
  		
  		processing.smooth();
  		processing.frameRate(25);
  	}

  	// Override draw function, by default it will be called 60 times per second  
    processing.draw = function() {
  		modeDustDraw();
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

  }
}