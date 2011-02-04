function WGFacebook() {
	
	var isInit = false;
	var adImage;
	var isMouseOver = false;
	var vibrateINT;
	var magnetINT;
	var magnetRippleINT;
	var bounceINT;
	
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
			// var deg = Math.random()>0.5 ?Math.random()*(-4) :Math.random()*4;
			// $('#like-magnet').css('-webkit-transform','rotate('+deg+'deg)');
			$('.like_link, .commentActions .as_link, .cmnt_like_link').each(function(){
				var btn = $(this);
				var deg = Math.random()>0.5 ?Math.random()*(-20) :Math.random()*20;
				btn.css('-webkit-transform','rotate('+deg+'deg)');//.css("font-size",fs+"%");
			});
			$('label#profile_connect, .profile_connect_button').each(function(){
				var btn = $(this);
				var deg = Math.random()>0.5 ?Math.random()*(-10) :Math.random()*10;
				btn.css('-webkit-transform','rotate('+deg+'deg)');//.css("font-size",fs+"%");
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
	
	function modifyUI() {	
		$('body').append('<a id="magnet-title" href="http://magnet.detourlab.com" target="_blank" style="position:fixed;right:25px;top:457px;cursor:pointer;z-index:0;display:block;height:40px;width:185px; overflow:hidden; background: url(http://chaweihsu.com/yuinchien.com/assets/magnet_title.png) no-repeat 0 0;"></a>');

		$('body').append('<div id="like-magnet" style="position:fixed;right:-200px;top:300px;cursor:pointer;z-index:0;display:block;height:160px;width:185px; overflow:hidden; background: url(http://chaweihsu.com/yuinchien.com/assets/magnet.png) no-repeat 0 0;"></div>');
		
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
			// Ripple Animation
			magnetRippleINT.setTarget(0.7);
		});
		$('#like-magnet').live('mouseleave', function() {
			isMouseOver = false;
			$('.like_link, .commentActions .as_link').not('.magnet_attached').each(function(){
				var btn = $(this);
				btn.css('font-size','100%').css('-webkit-transform','rotate(0deg)');
			});
			$('label#profile_connect, .profile_connect_button').not('.magnet_attached').each(function(){
				var btn = $(this);
				btn.css('font-size','100%').css('-webkit-transform','rotate(0deg)');
			});
			
		});
		
		vibrateINT = setInterval(vibrating,30);
		
		magnetRippleINT = new DIntegrator(1, 0.6, 0.55);
		magnetRippleINT.setTarget(1);
		
		$('#like-magnet').live('click', function() {
			var magnet = $(this);
			var magnet_x = magnet.offset().left;
			var magnet_y = magnet.offset().top;
			var magnet_h = magnet.height();
			var buttons = $('.like_link, .commentActions .as_link').not('.magnet_attached');
			buttons.addClass('magnet_attached');
			
			var profile_buttons = $('label#profile_connect, .profile_connect_button').not('.magnet_attached');
			profile_buttons.addClass('magnet_attached');
			
			var btn_set = {'comment': buttons, 'profile': profile_buttons};
			
			$.each(btn_set, function(key, elems) {
			  if(elems.length > 0) {
          $.get(
            API_URL, 
            { authenticity_token: API_TOKEN,
              disabling_log: {
                title: document.title,
                url: document.location.href,
                button_count: elems.length,
                button_type: key
              }
            }
          );
        }
			})
			
			var numBtn = 6;
			var countDiv = $('<div class="magnetized-count" style="font-size:0.5em;position:fixed;right:110px;top:360px;z-index:0; ">'+'+'+numBtn+'</div>');
			countDiv.css('font-family', 'Verdana').css('color','#666').css('font-weight','bold');
			$('body').append(countDiv);
			countDiv.animate({
				opacity: 0.0,
				fontSize: "5em",
		    // top: '-='+70,
		  }, 600, function() {
//				countDiv = null;
		    // Animation complete.
		  });
			

			$.each(btn_set, function(key, elems) {
								
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
  				
  				var rand_y = Math.random()>0.5 ? 6+Math.random()*(30) : magnet_h/3*2+Math.random()*30; //Math.random()*(30);
  				var shift_x = magnet_x - btn_x + rand_x;
  				var shift_y = magnet_y - btn_y + rand_y;

  				btn.animate({
  			    left: '+='+shift_x,
  			    top: '+='+shift_y,

  			  }, 600, function() {
  					var deg = Math.random()>0.5 ?Math.random()*(-15) :Math.random()*15;
  					btn.css('position', 'fixed').css('top', 300 + rand_y).css('-webkit-transform','rotate('+deg+'deg)');
  			    // Animation complete.
  			  });
  			});
			});
			
		});
			
	}
	
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