function WGGoogle() {
//  $('body center').addClass('invisible');
  
	var flagTxtfield, flagBtn, flagClock;
	var wgTxtfieldSearch;
	
  this.init = function() {
		
		flagTxtfield = true;
		flagBtn = false;
		flagClock = false;
		
		modifyUI();
		
		if(flagTxtfield){
			var sound = document.createElement('embed');
	    sound.setAttribute('src', "yawn/yuin8.mov");
	    sound.setAttribute("loop","false");
	    sound.setAttribute("autostart","false");
	    sound.setAttribute("type","audio/x-wav");
	    sound.setAttribute("hidden","true");
			sound.setAttribute("name","yawn_audio");
	    document.body.appendChild(sound);
	
			// draw textfield
			var input = getElementsByClass(document,'ds','div')[0];
			input.style.position = 'relative';
			input.childNodes[0].style.zIndex = 2;
			wgTxtfieldSearch = new WGTextfield(input, flagTxtfield);
			
//			$('div.ds input').css('color','#fff');
			
			var buttons = $('.lsbb input');
			buttons.css('font-size','14px');
			
			var button1 = $(buttons[0]);
			var button2 = $(buttons[1]);
			var btn0_left = button1.position().left;
			var btn0_top = button1.position().top+2;
			var btn1_left = button2.position().left+7;
			var btn1_top = button2.position().top+2;	
			
			var btn1 = new WGButton( button1, btn0_left, btn0_top, flagBtn);
			var btn2 = new WGButton( button2, btn1_left, btn1_top, flagBtn);
			
			$('div.ds').append('<div id="dynamic_textfield"></div>');
			
			$('div.ds input').keypress(function(e){
				var newChar = String.fromCharCode(e.which);
				console.log(newChar);
				
				var value = $(this).val();
				var newSpanId = "dt_"+(value.length-1);	
				
				//var formatValue = '';
				//var scaleValue = wgTxtfieldSearch.getScaleValue();
				if(e.which == 32) {
					$('#dynamic_textfield').append('<span id="'+newSpanId+'">&nbsp;</span>');
				} else {
					$('#dynamic_textfield').append('<span id="'+newSpanId+'">' + newChar + '</span>');
				}			
			});
			
			$('div.ds input').keydown(function(e){
				if (e.which == 8) {
					$('#dynamic_textfield span:last').remove();
				}	
			});
			
		}
  }
   
  function modifyUI() {
  	// change img
  	var logoDiv = document.getElementById('lga');
  	// logoDiv.setAttribute('style', 'height: 205px');
  	var img = logoDiv.getElementsByTagName('img')[0];
		img.setAttribute('src', "google_logo_1.png");
  }
}