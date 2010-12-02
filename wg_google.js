function WGGoogle() {
//  $('body center').addClass('invisible');
  
	var flagTxtfield, flagBtn, flagClock;
	
  this.init = function() {
	
		flagTxtfield = false;
		flagBtn = true;
		flagClock = false;
		
    modifyUI();
    
		if(flagTxtfield){
			var sound = document.createElement('embed');
	    sound.setAttribute('src', "http://people.artcenter.edu/~tchien/assets/yawn3.wav");
	    sound.setAttribute("loop","false");
	    sound.setAttribute("autostart","true");
	    sound.setAttribute("type","audio/x-wav");
	    sound.setAttribute("hidden","true");
	    document.body.appendChild(sound);
		}
  }
  
  this.sketchProc = function(processing) {

  	var wgTxtfieldSearch;
  	var btnSubmit, btnLuck, wgButtonSubmit, wgButtonLuck;

  	processing.setup = function(){
			// draw textfield
			var input = getElementsByClass(document,'ds','div')[0];
			input.style.position = 'relative';
			input.childNodes[0].style.zIndex = 2;
			wgTxtfieldSearch = new WGTextfield(input, flagTxtfield);
	
			// draw button
			var buttons = getElementsByClass(document,'lsbb','span');
			btnSubmit = buttons[0];
			btnSubmit.style.position = 'relative';
			btnSubmit.childNodes[0].style.zIndex = 5;
			btnLuck = buttons[1];
			btnLuck.style.position = 'relative';
			btnLuck.childNodes[0].style.zIndex = 5;
		  var btnSubmitLeft = findPosX(btnSubmit.parentNode);
	    var btnSubmitTop = findPosY(btnSubmit.parentNode);
	    var btnLuckLeft = findPosX(btnLuck.parentNode);
	    var btnLuckTop = findPosY(btnLuck.parentNode);
			wgButtonSubmit = new WGButton(btnSubmit, btnSubmitLeft, btnSubmitTop, flagBtn);
			wgButtonLuck = new WGButton(btnLuck, btnLuckLeft, btnLuckTop, flagBtn);
		
			// draw clock
			if(flagClock){
				
			}
		 	processing.smooth();
		 	processing.frameRate(10);
		}

    processing.draw = function() {

      //detect button collision
			if(flagBtn) {
	      if(wgButtonSubmit.getMovingStatus() || wgButtonLuck.getMovingStatus()) {
	        var checkX = checkOverlap(wgButtonSubmit.getBtnX(), btnSubmit.offsetWidth, wgButtonLuck.getBtnX(), btnLuck.offsetWidth, 0); 
	        var checkY = checkOverlap(wgButtonSubmit.getBtnY(), btnSubmit.offsetHeight, wgButtonLuck.getBtnY(), btnLuck.offsetHeight, 0); 
	        if(checkX&&checkY){
	          var tx1 = -1*wgButtonSubmit.getTargetX()*Math.round(Math.random()*10+6);
	          var ty1 = -1*wgButtonSubmit.getTargetY()*Math.round(Math.random()*10+6);
	          var tx2 = -1*wgButtonLuck.getTargetX()*Math.round(Math.random()*10+6);
	          var ty2 = -1*wgButtonLuck.getTargetY()*Math.round(Math.random()*10+6);
	          wgButtonSubmit.reverseMoving(tx1,ty1);
	          wgButtonLuck.reverseMoving(tx2,ty2);
	        }
	      }
			}
    };

    // processing.keyReleased = function() {
    //       if(processing.keyCode==processing.ESC || processing.key == processing.ESC){
    //         scaleInt = new Integrator();
    //       }
    //    }

    // processing.mouseMoved = function() {
    //   if(dusts!=null){
    //     var d = dusts.get(0);
    //         d.escape();
    //       }
    // }
  }
  
  
  
  function modifyUI() {
  	// add font link <link href='http://fonts.googleapis.com/css?family=Reenie+Beanie&subset=latin' rel='stylesheet' type='text/css'>
  	var headID = document.getElementsByTagName("head")[0];    
  	var cssNode = document.createElement('link');
  	cssNode.type = 'text/css';
  	cssNode.rel = 'stylesheet';
  	cssNode.media = 'screen';
  	cssNode.href = 'http://fonts.googleapis.com/css?family=Reenie+Beanie&subset=latin';
  	headID.appendChild(cssNode);

  	// remove img
  	var logoDiv = document.getElementById('lga');
  	var img = logoDiv.getElementsByTagName('img')[0];
  	logoDiv.removeChild(img);
		
		// add new img

	    var newImg = document.createElement("img");
	    newImg.setAttribute('src', "http://people.artcenter.edu/~tchien/assets/sketch_ungoogleable.png");
	    newImg.setAttribute('alt', 'na');
	    newImg.setAttribute('width', 400);
	    logoDiv.appendChild(newImg);

    //  $('#lga').css('height', '50px').css('font-size', '3em').css('margin', '100px 0 50px 0').html('UN-Googleable Wall');

  	// create new text
  	var fontElement = document.getElementsByTagName('font')[0];
  	removeChildNodes(fontElement);
    //var newText = document.createTextNode('UN-Googleable Wall');
    //fontElement.appendChild(newText);
    //fontElement.style["font-size"] = '3em';

  	// change button
  	var buttonSubmit = getElementsByClass(document,'lsbb','span');
  	var btn2 = buttonSubmit[1].childNodes[0];
  	btn2.value = "Lucky Me";
  	btn2.style["font-size"] = '1.5em';

    // $('span input.lsb').click(function(e) {
    //   e.preventDefault();
    //   var searchField = $('input.lst');
    //     ungoogleablePost(searchField.val());
    // });

  	var btn1 = buttonSubmit[0].childNodes[0];
  	btn1.style["font-size"] = '1.5em';
  }
}