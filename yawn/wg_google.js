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
	    sound.setAttribute('src', "http://people.artcenter.edu/~tchien/assets/yawn3.wav");
	    sound.setAttribute("loop","false");
	    sound.setAttribute("autostart","true");
	    sound.setAttribute("type","audio/x-wav");
	    sound.setAttribute("hidden","true");
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
			
			$('div.ds input').keyup(function(e){
				//console.log(String.fromCharCode(e.which));
				var value = $(this).val();
				var formatValue = '';
				var scaleValue = wgTxtfieldSearch.getScaleValue();
				
				for(var i=0; i<value.length; i++) {
					var id = "dt_"+i;
					if(value[i]==' ')
						formatValue += '<span id="'+id+'">&nbsp;&nbsp;</span>';
					else
						formatValue += '<span id="'+id+'">' + value[i] + '</span>';
				}
				$('#dynamic_textfield').html(formatValue);				
			});
			
			$('div.ds input').keydown(function(e){
				//console.log(String.fromCharCode(e.which));
				if (e.which == 8) {
					var value = $(this).val();
					var value = value.substring(0, value.length-1);
					var formatValue = '';
					var scaleValue = wgTxtfieldSearch.getScaleValue();
				
					for(var i=0; i<value.length; i++) {
						var id = "dt_"+i;
						if(value[i]==' ')
							formatValue += '<span id="'+id+'">&nbsp;</span>';
						else
							formatValue += '<span id="'+id+'">' + value[i] + '</span>';
					}
					$('#dynamic_textfield').html(formatValue);
				}				
			});
			
		}
  }
   
  function modifyUI() {
  	// change img
  	var logoDiv = document.getElementById('lga');
  	// logoDiv.setAttribute('style', 'height: 205px');
  	var img = logoDiv.getElementsByTagName('img')[0];
		img.setAttribute('src', "ssl_logo_lg_bw.png");
  }
}