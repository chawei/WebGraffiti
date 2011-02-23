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
	
	var checkTimer = 0;
	
	var metaKey = false;	
	var searchTextField;
	
	var currentYawnPeriod = 0;
	
  this.init = function() {
		
		flagTxtfield = true;
		flagBtn = false;
		flagClock = false;
		
		// init sounds
		// sounds.sort( randOrd );
		// console.log(sounds);

		// draw textfield
		var input = document.getElementById('input_div');
		input.style.position = 'relative';
		input.childNodes[0].style.zIndex = 2;
		wgTxtfieldSearch = new WGTextfield(input, flagTxtfield);
		searchTextField = YawnTextField.create('div#input_div input', wgTxtfieldSearch);
		
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
		
		$('div#input_div').append('<div id="dynamic_textfield"></div>');
		$('div#input_div input').css('opacity', 1.0);
		$('#dynamic_textfield').hide();

//		setTimeout( activateYawn,3000);

		timerINT = setInterval(timerHandler,30);
		
		// new hyperlink
		$('.result').each(function(index) {
			var hl = new WGHyperLink($(this));
		});
		
  }
  
 	function timerHandler() {
		if(wgTxtfieldSearch.isActive()==false) {
			checkTimer++;
			if(Math.random()<0.003 || checkTimer>120*(Math.random()+1))
				activateYawn();
		}
		else if(timerCount==currentYawnPeriod*8) {
			wgBtnSearch.resetPosition();
			wgBtnLucky.resetPosition();
			timerCount=-1;
			checkTimer=0;
		}
		else if(timerCount!=-1)	{
			timerCount++;
		}
	}
	
	function randOrd(){
		return (Math.round(Math.random())-0.5);
	}
	
	function activateYawn() {
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
		currentYawnPeriod = yawnPeriod;
		
		wgTxtfieldSearch.activeYawn(yawnSize,yawnPeriod);
		wgBtnSearch.setTargetPosition( -50+Math.random()*30, Math.random()*40*yawnSize+40);
		wgBtnLucky.setTargetPosition( 50-30*Math.random(), Math.random()*40*yawnSize+40);
		timerCount = 0;
		checkTimer = 0;
	}	
}

var YawnTextField = {
  create: function(selector, wgTxtfieldSearch) {
    var yawnTextField= $(selector);
    
    function refreshDynamicField() {
//      console.log('refresh');
      var value = yawnTextField.val();
      var formatValue = '';
      for(var i=0; i<value.length; i++) {	 	
        var id = "dt_"+i;
        if(value[i]==' ') {
          formatValue += '<span id="'+id+'">&nbsp;&nbsp;</span>';
        } else {
          formatValue += '<span id="'+id+'">' + value[i] + '</span>';
        }
      }
      $('#dynamic_textfield').html(formatValue);
    }

    yawnTextField.keypress(function(e){      
		  var value = $(this).val();
			var newChar = String.fromCharCode(e.which);		

		  var range = $(this).getSelection();
		  var insertHTML = '';

			if (e.which == 32) {
				insertHTML = '<span>&nbsp;</span>';
			} else {
				insertHTML = '<span>' + newChar + '</span>';
			}

			var insertIndex = range.start-1;
			if (insertIndex < 0) {
			  $('#dynamic_textfield').append(insertHTML);
			} else {
			  $(insertHTML).insertAfter('#dynamic_textfield span:eq('+insertIndex+')'); 
			}
		});

		yawnTextField.keyup(function(e){
		  if (metaKey) {
        refreshDynamicField();
      }
	  });

		yawnTextField.keydown(function(e){
      if (e.metaKey) {
//        console.log('metakey');
			  metaKey = true;
      } else { 
        metaKey = false;
      }

      var range = yawnTextField.getSelection();
			if (e.which == 8 && wgTxtfieldSearch.isActive()) {
			  if (yawnTextField.val().length == range.length) {
          $('#dynamic_textfield span').remove();
        } else {
          if (range.length == 0) {
            $('#dynamic_textfield span:eq('+(range.start-1)+')').remove();
          } else {
    			  $('#dynamic_textfield span').slice(range.start, range.end).remove();
  			  }
			  }

			}	else if (!wgTxtfieldSearch.isActive()) {
			  refreshDynamicField();
			}
		});

		return yawnTextField;
  }
}