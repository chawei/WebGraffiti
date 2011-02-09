function WGFacebook() {
	
	var isInit = false;
	var adImage;
	var isMouseOver = false;
	var vibrateINT;
	var magnetINT;
	var magnetRippleINT;
	var bounceINT;
	var magnet;
	
	// Status, Comment, Profile, Sponsor
	var targetButtonPatterns = ".like_link, \
	                            .commentActions .as_link, \
	                            label#profile_connect, .profile_connect_button, .profileHeader .mlm.mainButton.uiButton, \
	                            #pagelet_ads .inline .uiIconLink, .phs .inline .uiIconLink";
	
	var API_URL = "http://magnet.detourlab.com/disabling_logs/add";
	var API_TOKEN = "ogoKH6Gei/sAnYtsK2WIhuFAZVmahD7eBCtrrQswoD4=";
	
  this.init = function() {
		if (isInit == false) {
			modifyUI();
			isInit = true;
		}
  }
  
	function vibrating() {
		if(isMouseOver) {
			
      $('.magnet_detected').each(function(){
				var btn = $(this);
				var deg = (Math.random()*2-1)*15;
				btn.css('display', 'inline-block').css('-webkit-transform','rotate('+deg+'deg)');
			});
			
		}
	}
	
	function magnetIntroBounce() {
		magnetINT.update();
		$('#like-magnet').css('right', magnetINT.getValue());
		
		if( magnetINT.getCounter() > 100 ) {
			$('#like-magnet').css('right', 10);
			magnetINT = null;
			clearInterval(bounceINT);
		}
	}
	
	function animateButtonSet(button_set, magnet_x, magnet_y, magnet_h) {
    $.each(button_set, function(key, elems) {
							
		  elems.each(function(){
				var btn = $(this);
				var btn_x = btn.offset().left;
				var btn_y = btn.offset().top;

				btn.makeAbsolute(true);

				btn.click(function(e){
					e.preventDefault();
					e.stopPropagation();
				});
        
        if (key == 'profile') {
          var rand_x = Math.random()*(-20) - 20;
        } else {
          var rand_x = Math.random()*(-30) + 16;
        }
				
				var rand_y = Math.random()>0.5 ? 8+Math.random()*(30) : 3+magnet_h/3*2+Math.random()*30;
				var shift_x = magnet_x - btn_x + rand_x;
				var shift_y = magnet_y - btn_y + rand_y;

				btn.animate({
			    left: '+='+shift_x,
			    top: '+='+shift_y
			  }, 600, function() {
			    // Animation complete.
					var deg = (Math.random()*2-1)*15;
					dist_from_right = $(window).width() - parseInt(btn.css('left'));
					if (key == 'profile') {
						dist_from_right -= 20;
					}
					btn.css('position', 'fixed').css('top', 300 + rand_y)
					   .css('right', dist_from_right - btn.width())
					   .css('left', 'auto')
					   .css('-webkit-transform','rotate('+deg+'deg)');
			  });
			});
		});
  }

  function sendDisablingLogToServer(button_set) {
    var title = document.title;
    var url = document.location.href;
    
    if (window.location.pathname == '/') {
      var user = $('a.fbxWelcomeBoxName');
      title = "[Home] " + user.text();
      url = user.attr('href');
    }
    
    $.each(button_set, function(key, elems) {
  	  var elems_length = elems.length;
  	  if(elems_length > 0) {
        $.get(
          API_URL, 
          { authenticity_token: API_TOKEN,
            disabling_log: {
              title: title,
              url: url,
              button_count: elems.length,
              button_type: key
            }
          }
        );
      }
  	});
  }

  function countTotalNumOfButtons(button_set) {
    var numBtn = 0;
    $.each(button_set, function(key, elems) {
  	  numBtn += elems.length;
    });
    return numBtn;
  }
	
	function modifyUI() {
	  // Initialize countDiv
		var countDiv = $('<div class="magnetized-count" \
		                  style="font-size:0.5em;z-index:0; \
		                  position:fixed; right:50px; top:330px; \
		                  text-align:center; width:150px; \
		                  height: 100px; line-height: 100px;"></div>');
		countDiv.css('font-family', 'Trebuchet MS, sans-serif').css('color','#666').css('font-weight','bold');
		$('body').append(countDiv);
		
		$('body').append('<a id="magnet-title" href="http://magnet.detourlab.com" target="_blank" \
		                  style="position:fixed;right:25px;top:457px;cursor:pointer;z-index:10; \
		                  display:block;height:40px;width:185px; overflow:hidden; \
		                  background: url(http://chaweihsu.com/yuinchien.com/assets/magnet_title.png) no-repeat 0 0;"></a>');

		$('body').append('<div id="like-magnet" style="position:fixed;right:-200px;top:300px; \
		                  cursor:pointer;z-index:10;display:block;height:160px;width:185px; overflow:hidden;"></div>');
		
		magnet = new Magnet();
		
		$('#magnet-title').hide().delay(1000).fadeIn();
		
		magnetINT = new DIntegrator(-200, 0.6, 0.55);
		magnetINT.setTarget(10);
		bounceINT = setInterval(magnetIntroBounce,40);
		
		$('#magnet-title').hover(
			function(){
				$(this).css('background-position', '0 -40px');
			},
			function(){
				$(this).css('background-position', '0 0');
			}
		);
		
		$('#like-magnet').hover(
			function(){
				$(this).css('background-position', '0 -160px');
			},
			function(){
				$(this).css('background-position', '0 0');
			}
		);
		
		$('#like-magnet').live('mouseenter', function() {
			isMouseOver = true;
			magnet.setMouseOver(true);
			// Ripple Animation
			magnetRippleINT.setTarget(0.7);
			$(targetButtonPatterns).addClass('magnet_detected');
		});
		
		$('#like-magnet').live('mouseleave', function() {
			isMouseOver = false;
			magnet.setMouseOver(false);
			magnet.setSwitch(1);
			$(targetButtonPatterns).not('.magnet_attached').each(function(){
				var btn = $(this);
				btn.css('font-size','100%').css('-webkit-transform','rotate(0deg)');
			});			
		});
		
		vibrateINT = setInterval(vibrating, 30);
		
		magnetRippleINT = new DIntegrator(1, 0.6, 0.55);
		magnetRippleINT.setTarget(1);
		
		$('#like-magnet').live('click', function() {
			var magnet = $(this);
			var magnet_x = magnet.offset().left;
			var magnet_y = magnet.offset().top;
			var magnet_h = magnet.height();

			var status_buttons = $('.like_link').not('.magnet_attached');
			status_buttons.addClass('magnet_attached');
			
			var comment_buttons = $('.commentActions .as_link').not('.magnet_attached');
			comment_buttons.addClass('magnet_attached');
			
			var profile_buttons = $('label#profile_connect, .profile_connect_button, .profileHeader .mlm.mainButton.uiButton').not('.magnet_attached');
			profile_buttons.addClass('magnet_attached');
			
			var sponsor_buttons = $('#pagelet_ads .inline .uiIconLink, .phs .inline .uiIconLink').not('.magnet_attached');
			sponsor_buttons.addClass('magnet_attached');
			
			var btn_set = { 'status': status_buttons, 'comment': comment_buttons, 
			                'profile': profile_buttons, 'sponsor': sponsor_buttons };
			var numBtn = 0;
			numBtn = countTotalNumOfButtons(btn_set);
			countDiv.popupAnimation(numBtn);
			
			sendDisablingLogToServer(btn_set);
			animateButtonSet(btn_set, magnet_x, magnet_y, magnet_h);
			
			var attached_btns = $('.magnet_attached');
			attached_btns.delay(10000).animate({
				opacity: 0.0,
		    top: '+='+ Math.random()*150+90
		  }, Math.random()*300 + 800, function() {
				attached_btns.remove();
		  });
			
			
		});
			
	}
	
}

$.fn.popupAnimation = function(numBtn) {
  var elem = $(this);
  //if (btn_length > 0) {
	  elem.html('+'+numBtn).css('z-index', 100);
		elem.animate({
			opacity: 0.0,
			fontSize: "4em"
	  }, 600, function() {
	    elem.css({zIndex: 0, fontSize: '0.5em', opacity: 1.0}).html('');
	  });
  //}
}

$.fn.makeAbsolute = function(rebase) {
	return this.each(function() {
		var el = $(this);
    var pos = el.offset();
    el.css({ position: "absolute",
			marginLeft: 0, marginTop: 0,
			top: pos.top, left: pos.left, zIndex: 10 });
		if (rebase)
			el.remove().appendTo("body");
	});
}

function DIntegrator(value, damping, attraction) {      
  var _value = value;
  var _vel = 0;
  var _accel = 0;
  var _force = 0;
  var _mass = 1;
  var _damping = damping;
  var _attraction = attraction;
  var _targeting = true;
  var _target;
  var _counter = 0;

	this.getCounter = function() {
		return _counter;
	}
  this.set = function(v) {
  	_value = v;
  }
	this.getValue = function() {
		return _value;
	}
	this.getTarget = function() {
		return _target;
	}
  this.update = function() {
    if (_targeting)
      _force += _attraction * (_target - _value);

    _accel = _force / _mass;
    _vel = (_vel + _accel) * _damping;
    _value += _vel;

    _force = 0;
		_counter++;		
  }

  this.setTarget = function(t) {
    _targeting = true;
    _target = t;
  }

  this.noTarget = function() {
    _targeting = false;
  }
}

function Magnet() {
	init();
	var isMouseOver = false;
	var swtich = 0;
	
	this.setMouseOver = function(value) {
		isMouseOver = value;
	}
	this.setSwitch = function(value) {
		swtich = value;
	}
	
	function init() {
    var canvasElement = document.createElement('canvas');	
  	canvasElement.width= 185;
  	canvasElement.height= 160;
  	canvasElement.style.position = "absolute";
  	canvasElement.style.zIndex = -3;
  	$('#like-magnet').append(canvasElement);
  	var processingInstance = new Processing(canvasElement, sketchProc);
  }
  
  function sketchProc(processing) {
		var x1 = 20;
		var y1 = 4;
		var w = 40;
		var h = 40;	
		var r1 = 70;
		var r2 = r1 - h;
		var cx = 110;
		var cy = y1 + r1;
		var rd = 1.5;
		
    processing.setup = function() {
			processing.smooth();
  		processing.frameRate(20);

			processing.fill(200,150);
			processing.drawFreehandRect( x1, y1, w, h, false);
			processing.drawFreehandRect( x1, y1+r1*2-h, w, h, false);
		
			processing.strokeWeight(0.7);
			processing.stroke(0);
			processing.noFill();
			processing.beginShape();
			processing.vertex(x1+processing.random(-rd,rd),y1+processing.random(-rd,rd));
			processing.drawFreehandArcVetex( cx+processing.random(-rd,rd),cy+processing.random(-rd,rd),r1*2,r1*2, processing.PI/2*3, processing.PI, true);				
			processing.drawFreehandVertex(x1+ processing.random(-rd,rd),y1+r1*2+processing.random(-rd,rd));
			processing.drawFreehandVertex(x1+processing.random(-rd,rd),y1+r1*2-h+processing.random(-rd,rd));
			processing.drawFreehandVertex(x1+processing.random(-rd,rd),y1+r1*2-h+processing.random(-rd,rd));
			processing.drawFreehandArcVetex( cx+processing.random(-rd/2,rd/2),cy+processing.random(-rd/2,rd/2),r2*2,r2*2, processing.PI/2, processing.PI, false);
			processing.drawFreehandVertex(x1+processing.random(-rd,rd),y1+h+processing.random(-rd,rd));
			processing.endShape(processing.CLOSE);
    }
    processing.draw = function() {
			
			if(isMouseOver) {
				processing.clear();
				
				processing.strokeWeight(0.7);
				processing.stroke(0);
				processing.noFill();
				processing.beginShape();
				processing.vertex(x1+processing.random(-rd,rd),y1+processing.random(-rd,rd));
				processing.drawFreehandArcVetex( cx+processing.random(-rd,rd),cy+processing.random(-rd,rd),r1*2,r1*2, processing.PI/2*3, processing.PI, true);				
				processing.drawFreehandVertex(x1+ processing.random(-rd,rd),y1+r1*2+processing.random(-rd,rd));
				processing.drawFreehandVertex(x1+processing.random(-rd,rd),y1+r1*2-h+processing.random(-rd,rd));
				processing.drawFreehandVertex(x1+processing.random(-rd,rd),y1+r1*2-h+processing.random(-rd,rd));
				processing.drawFreehandArcVetex( cx+processing.random(-rd/2,rd/2),cy+processing.random(-rd/2,rd/2),r2*2,r2*2, processing.PI/2, processing.PI, false);
				processing.drawFreehandVertex(x1+processing.random(-rd,rd),y1+h+processing.random(-rd,rd));
				processing.endShape(processing.CLOSE);
				
				processing.noStroke();
				processing.stroke(0);
				processing.fill(255,255,0);
				processing.drawFreehandRect( x1, y1, w, h, false);
				processing.drawFreehandRect( x1, y1+r1*2-h, w, h, false);
			}
			
			if(swtich==1) {
				processing.clear();
			
				processing.strokeWeight(0.7);
				processing.stroke(0);
				processing.noFill();
				processing.beginShape();
				processing.vertex(x1+processing.random(-rd,rd),y1+processing.random(-rd,rd));
				processing.drawFreehandArcVetex( cx+processing.random(-rd,rd),cy+processing.random(-rd,rd),r1*2,r1*2, processing.PI/2*3, processing.PI, true);				
				processing.drawFreehandVertex(x1+ processing.random(-rd,rd),y1+r1*2+processing.random(-rd,rd));
				processing.drawFreehandVertex(x1+processing.random(-rd,rd),y1+r1*2-h+processing.random(-rd,rd));
				processing.drawFreehandVertex(x1+processing.random(-rd,rd),y1+r1*2-h+processing.random(-rd,rd));
				processing.drawFreehandArcVetex( cx+processing.random(-rd/2,rd/2),cy+processing.random(-rd/2,rd/2),r2*2,r2*2, processing.PI/2, processing.PI, false);
				processing.drawFreehandVertex(x1+processing.random(-rd,rd),y1+h+processing.random(-rd,rd));
				processing.endShape(processing.CLOSE);
				
				processing.fill(200);
				processing.stroke(0);
				processing.drawFreehandRect( x1, y1, w, h, false);
				processing.drawFreehandRect( x1, y1+r1*2-h, w, h, false);
				
				swtich = 0;
			}
			
		}
  }
}

