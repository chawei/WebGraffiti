function WGGoogle() {
  
	var flagTxtfield, flagBtn, flagClock;
	var wgTxtfieldSearch;
	var timerINT;
	var wgBtnSearch;
	var wgBtnLucky;
	var timerCount=-1;
	var sounds = new Array('1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16');
	var soundsSize   = [ 1.0,1.0,1.0,1.0,1.0,1.2,1.0,1.2,1.0,1.3,1.3,1.0,1.2,1.1,1.0,1.0];
	var soundsPeriod = [  10,  9,  9, 12, 17, 13, 12, 12, 12, 12, 10,  8,  8,  8, 10, 10];
	
	var currentSoundIdx = 0;
	var sound;
	
  this.init = function() {
		
		flagTxtfield = true;
		flagBtn = false;
		flagClock = false;
		
		// init sounds
		// sounds.sort( randOrd );
		// console.log(sounds);
		
		modifyUI();

		// draw textfield
		var input = getElementsByClass(document,'ds','div')[0];
		input.style.position = 'relative';
		input.childNodes[0].style.zIndex = 2;
		wgTxtfieldSearch = new WGTextfield(input, flagTxtfield);
		
		var buttons = $('.lsbb input');
		buttons.css('font-size','14px');
		
		var button1 = $(buttons[0]);
		var button2 = $(buttons[1]);
		var btn0_left = button1.position().left;
		var btn0_top = button1.position().top+2;
		var btn1_left = button2.position().left+7;
		var btn1_top = button2.position().top+2;	
		
		wgBtnSearch = new WGButtonForYawn( button1, btn0_left, btn0_top, flagBtn);
		wgBtnLucky = new WGButtonForYawn( button2, btn1_left, btn1_top, flagBtn);
		
		$('div.ds').append('<div id="dynamic_textfield"></div>');
		
		$('div.ds input').keypress(function(e){
			var newChar = String.fromCharCode(e.which);
			console.log(newChar);
			
			var value = $(this).val();
			var newSpanId = "dt_"+(value.length-1);	
			
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
		
		$('div.ds input').css('opacity', 1.0);
		$('#dynamic_textfield').hide();
		
		timerINT = setInterval(timerHandler,30);
		
  }
  
 	function timerHandler() {

		if(wgTxtfieldSearch.isActive()==false && Math.random()<0.003) {
			if(currentSoundIdx<sounds.length-1)
				currentSoundIdx++;
			else
				currentSoundIdx = 0;
			
			if(document.getElementById('yawn_audio')!=null)
				document.body.removeChild(document.getElementById('yawn_audio'));
			sound = document.createElement('embed');
			sound.setAttribute("loop","false");
	    sound.setAttribute("type","audio/x-wav");
	    sound.setAttribute("hidden","true");
			sound.setAttribute("id","yawn_audio");
			sound.setAttribute("autostart","true");
			sound.setAttribute('src', "assets/yawn/"+sounds[currentSoundIdx]+".mov");
	    document.body.appendChild(sound);
			
			var idx = parseInt(sounds[currentSoundIdx])-1;
			var yawnSize = soundsSize[idx];
			var yawnPeriod = soundsPeriod[idx];
			
//			console.log(sounds[currentSoundIdx],yawnSize,yawnPeriod);
			
			wgTxtfieldSearch.activeYawn(yawnSize,yawnPeriod);
			wgBtnSearch.setTargetPosition( -50+Math.random()*30, Math.random()*50+30);
			wgBtnLucky.setTargetPosition( 50-30*Math.random(), Math.random()*50+30);
			timerCount=0;
		}
		else if(timerCount==140) {
			wgBtnSearch.resetPosition();
			wgBtnLucky.resetPosition();
			timerCount=-1;
		}
		else if(timerCount!=-1)	
			timerCount++;
	}
	
  function modifyUI() {
  	// change img
  	var logoDiv = document.getElementById('lga');
  	var img = logoDiv.getElementsByTagName('img')[0];
		img.setAttribute('src', "assets/google_logo_1.png");
		$('#lga').css('margin-bottom','30px');
		$('#lga').css('margin-top','30px');		
  }

	function randOrd(){
		return (Math.round(Math.random())-0.5); 
	}
	
}