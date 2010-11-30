function WGGoogle() {
//  $('body center').addClass('invisible');
  
  this.init = function() {
    modifyUI();
    var sound = document.createElement('embed');
    sound.setAttribute('src', "http://people.artcenter.edu/~tchien/assets/yawn3.wav");
    sound.setAttribute("loop","false");
    sound.setAttribute("autostart","true");
    sound.setAttribute("type","audio/x-wav");
    sound.setAttribute("hidden","true");
    document.body.appendChild(sound);
  }
  
  this.sketchProc = function(processing) {

  	var wgTxtfieldSearch;
  	var btnSubmit, btnLuck, wgButtonSubmit, wgButtonLuck;

  	processing.setup = function(){
			// draw freehand textfield
			var input = getElementsByClass(document,'ds','div')[0];
			input.style.position = 'relative';
			input.childNodes[0].style.zIndex = 2;
			wgTxtfieldSearch = new WGTextfield(input);
			
			// change button
			var buttons = getElementsByClass(document,'lsbb','span');
			btnSubmit = buttons[0];
			btnSubmit.style.position = 'relative';
			btnSubmit.childNodes[0].style.zIndex = 5;
			btnLuck = buttons[1];
			btnLuck.style.position = 'relative';
			btnLuck.childNodes[0].style.zIndex = 5;
	
			wgButtonSubmit = new WGButton(btnSubmit);
			wgButtonLuck = new WGButton(btnLuck);
			
  		processing.smooth();
  		processing.frameRate(25);
  	}

    processing.draw = function() {
      // update button location
      
      // if(wgButtonSubmit.isMoving || wgButtonLuck.isMoving){
      //   
      // }
      
      
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

  	// replace img
  	var logoDiv = document.getElementById('lga');
  	var img = logoDiv.getElementsByTagName('img')[0];
  	logoDiv.removeChild(img);
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