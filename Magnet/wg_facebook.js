function WGFacebook() {
	
	var _instance = this;
	var isInit = false;
	var adImage;
	var isMouseOver = false;
	var vibrateINT;
	var magnetINT, magnetRINT;
	var magnetRippleINT;
	var bounceINT;
	var magnet;
	var magnetTop = 240;
	var statTop = 400;
	var distFromMagnetToCounter = 118;
	
	// Status, Comment, Profile, Sponsor
	var targetButtonPatternArray = { 'status': '.like_link', 'comment': '.commentActions .as_link',
	                                 'profile': ".profile_connect_button:contains('Like'), .profileHeader .mlm.mainButton.uiButton",
	                                 'sponsor': "#pagelet_ads .inline .uiIconLink:contains('Like'), .phs .inline .uiIconLink:contains('Like'), .phs .inline .uiButton:contains('Like')" }
	
	var targetButtonPatterns = "";
	$.each(targetButtonPatternArray, function(key, value){
	  targetButtonPatterns += targetButtonPatternArray[key]+', ';
	});
	
	var API_URL = "http://magnet.detourlab.com/disabling_logs/add";
	var API_TOKEN = "ogoKH6Gei/sAnYtsK2WIhuFAZVmahD7eBCtrrQswoD4=";
	
  this.init = function() {
		if (isInit == false) {
			isInit = true;
      initStorage();
			modifyUI();
		}
  }
  
  setInterval(detectLikeButtons, 1000);
  
  function initStorage() {
    $.storage = new $.store();
    //$.storage.flush();
		if($.storage.get("numOfDisabledButtons") == undefined) {
		  $.storage.set("numOfDisabledButtons", 0);
		}
		if($.storage.get("numOfLikeButtons") == undefined) {
		  $.storage.set("numOfLikeButtons", 0);
		}
		if($.storage.get("panelOpened") == undefined) {
		  $.storage.set("panelOpened", true);
		}
		
		var d = new Date();
		
		var month = d.getMonth()+1+'';
		month = month.length == 1 ? '0'+month : month
		var day = d.getDate()+'';
		day = day.length == 1 ? '0'+day : day
		var currentDate  = d.getFullYear()+''+month+''+day;
		
		var minute = d.getMinutes()+'';
		minute = minute.length == 1 ? '0'+minute : minute
		var currentTime = d.getHours()+':'+minute;
		
		if ($.storage.get("firstTimeDate") == undefined) {
		  $.storage.set("firstTimeDate", currentDate);
		} else {
		  if ((currentDate - $.storage.get("firstTimeDate")) > 0) {
		    $.storage.set("numOfDisabledButtons", 0);
		    $.storage.set("numOfLikeButtons", 0);
				$.storage.set("firstTimeDate", currentDate);
				$.storage.set("sinceTime", currentTime);
		  }
		}
		
		if($.storage.get("sinceTime") == undefined) {
		  $.storage.set("sinceTime", currentTime);
		}
  }
  
  var maxDegree = 15;
  var rotateDeg = maxDegree;
  vibrateINT = setInterval(vibrate, 60);
	function vibrate() {
		if(isMouseOver) {
		  var detectedBtns = $('.magnet_detected');
		  if(detectedBtns.length > 0) {
		    rotateDeg == maxDegree ? rotateDeg = -1*maxDegree : rotateDeg = maxDegree;
  		  detectedBtns.css('-webkit-transform','rotate('+rotateDeg+'deg)');
		  }

      var attachedBtns = $('.magnet_attached');
      if(attachedBtns.length > 0) {
        attachedBtns.each(function(){
  				var btn = $(this);
  				var rotateDeg = (Math.random()*50-25);
  				//var rotateDeg = degrees[Math.round(Math.random()*9)];
          //rotateDeg == 15 ? rotateDeg = -15 : rotateDeg = 15;
  				//console.log(rotateDeg);
  				btn.css('-webkit-transform','rotate('+rotateDeg+'deg)');
  			});
			}
		}
	}
	
	function magnetIntroBounce() {
		magnetINT.update();
		magnetRINT.update();
		$('#like-magnet').css('right', magnetINT.getValue());

		$('#like-magnet').css('-webkit-transform', 'rotate('+magnetRINT.getValue()+'deg)');
		
		if( magnetINT.getCounter() > 100 ) {
			$('#like-magnet').css('right', 0);
			magnetINT = null;
			magnetRINT = null;
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
        
				var rand_x = 0;
				var rand_y = 0;
        if (key == 'profile') {
          rand_x = Math.random()*(-10) - 30;
					rand_y = Math.random()>0.5 ? 10+Math.random()*(20) : -5+magnet_h/3*2+Math.random()*20;
        } else {
          rand_x = Math.random()*(-30) + 16;
					rand_y = Math.random()>0.5 ? 10+Math.random()*(36) : -5+magnet_h/3*2+Math.random()*36;
        }
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
					btn.css('position', 'fixed').css('top', magnetTop + rand_y)
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
    
    var user = $('a.fbxWelcomeBoxName');
    if (user.length == 1) {
      title = "[H] " + user.text() + " - " + user.attr('href');
    }
    
    $.each(button_set, function(key, elems) {
  	  var elems_length = elems.length;
  	  if(elems_length > 0) {
  	    var json_data = { authenticity_token: API_TOKEN,
          disabling_log: {
            title: title,
            url: url,
            button_count: elems.length,
            button_type: key
          }
        };
  	    chrome.extension.sendRequest({'action': 'postToServer', 'json_data': json_data});
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
  
  function detectLikeButtons() {
    var notDetectedBtns = $(targetButtonPatterns).not('.magnet_detected');
    if (notDetectedBtns.length > 0) {
		  notDetectedBtns.addClass('magnet_detected');
		  $.storage.set("numOfLikeButtons", ($.storage.get("numOfLikeButtons")+notDetectedBtns.length));
			$('#stat-counter .stat-total').popupAnimationForTotal(notDetectedBtns.length);
	  }
  }
  
  function initPopupCounterForDisabled() {
  	var popupCounter = $('<div class="magnetized-count" \
	                  style="font-size:0em;z-index:0; \
	                  position:fixed; right:75px; top:'+(magnetTop+30)+'px; \
	                  text-align:center; width:150px; \
	                  height: 100px; line-height: 100px;"></div>');
		popupCounter.css('font-family', 'Inconsolata').css('color','#666').css('font-weight','bold');
		$('body').append(popupCounter);
		return popupCounter;
  }
	// function initPopupCounterForTotal() {
	//     var popupCounter = $('<div id="total-count" \
	// 	                  style="font-size:0em;z-index:0; \
	// 	                  position:fixed; right:0px; top:'+(magnetTop+distFromMagnetToCounter)+'px; \
	// 	                  text-align:center; width:150px; \
	// 	                  height: 100px; line-height: 100px;">0</div>');
	// 	popupCounter.css('font-family', 'Inconsolata').css('color','#666').css('font-weight','bold');
	// 	$('body').append(popupCounter);
	// 	return popupCounter;
	//   }
  
  function initStatCounter() {
    $('body').append('<div id="stat-counter" style="background-color:#fff;opacity:0.8; position:fixed;right:15px;top:'+statTop+'px; \
		                  cursor:pointer;z-index:10;display:block;height:17px;width:170px; \
		                  overflow:hidden;text-align:center;font-size:1.4em;color: #736F6E; font-family: Inconsolata, arial, serif;">\
		                    <div class="stat-disabled" style="float:left; text-align:right; width:71px; margin:0 10px 0 0; \
		                      padding:0 10px 5px 0; border-right:1px solid #736F6E">'
		                      +$.storage.get("numOfDisabledButtons")+
		                    '</div>\
		                    <div class="stat-total" style="float:left; text-align:left; padding:0 0 5px 0;">'
		                      +$.storage.get("numOfLikeButtons")+
		                    '</div>\
		                  </div>');
		$('#stat-counter').click(function(){
		  if($('#magnet-panel').css('display') == 'none') {
		    $('#magnet-panel').fadeIn();
		    $.storage.set("panelOpened", true);
		  } else {
		    $('#magnet-panel').fadeOut();
		    $.storage.set("panelOpened", false);
		  }
		});
  }
  
  function initMagnetTitle() {
    $('body').append('<a id="magnet-title" href="http://magnet.detourlab.com" target="_blank" \
		                  style="position:fixed;right:25px;top:457px;cursor:pointer;z-index:10; \
		                  display:block;height:40px;width:185px; overflow:hidden; \
		                  background: url(http://chaweihsu.com/yuinchien.com/assets/magnet_title.png) no-repeat 0 0;"></a>');
		$('#magnet-title').hide().delay(1000).fadeIn();
  }
  
  function initMagnetImage() {
    $('body').append('<div id="like-magnet" style="position:fixed;right:3px;top:'+magnetTop+'px; \
												background: url(http://chaweihsu.com/yuinchien.com/assets/magnet_icon_0215.png) no-repeat 0 0; \
		                  	height:160px;width:185px;cursor:pointer;z-index:10;display:block; overflow:hidden;\
											"></div>');
  }
	
	function initMagnetPanel() {
		var magnetPanel = $('<div id="magnet-panel" \
		                  style="background: url(http://chaweihsu.com/yuinchien.com/assets/magnet_panel_0215.png) no-repeat 0 0; font-family: Inconsolata, arial, serif;font-size:13px;z-index:1; \
		                  position:fixed; right:24px; top:'+(statTop+22)+'px; \
		                  text-align:center; width:160px; height:152px; color:#fff; padding: 5px 0 0 0">\
		                  	<div id="close-panel-btn" style="display:block;height:20px;width:20px;\
													background: url(http://chaweihsu.com/yuinchien.com/assets/cross.png) no-repeat 0 0;\
													position:absolute; right:6px; top:19px; cursor:pointer;"></div>\
											</div>');

		magnetPanel.append('<div style="margin: 17px 0 0 0;">\
													<div style="float:left; text-align:right; width:70px; margin:0 10px 0 0; padding:0 10px 5px 0; border-right:1px solid #fff">\
														<div style="margin:0 0 12px 0;">DISABLED</div>\
														<div>Likes<br>Disabled<br>Today</div>\
													</div>\
													<div style="float:left; text-align:left; padding:0 0 5px 0;">\
														<div style="margin:0 0 12px 0;">TOTAL</div>\
														<div>Likes<br>Seen<br>Today</div>\
													</div>\
													<div style="clear: both;"></div>\
												</div>');
		magnetPanel.append('<div style="display:block; \
													margin:10px auto 0px; color:#fff; font-size:11px;">SINCE</div>');
		magnetPanel.append('<div style="display:block; id="magnet_timestamp"\
													margin:16px auto 6px; color:#fff; font-size:10px;">'+$.storage.get("sinceTime")+'</div>');
		magnetPanel.append('<a href="http://magnet.detourlab.com" target="_blank" \
													style="text-decoration:underline; display:block; \
													margin:7px auto 10px; cursor:pointer; color:#fff; ">magnet.detourlab.com</a>');
		
		// check if this is the first time user launch Magnet
		// $('body').append('<div id="tip-message" style="background: url(http://chaweihsu.com/yuinchien.com/assets/tip_message.png) no-repeat 0 0;\
		// 										position:fixed; right:14px; top:480px;width:170px; height:62px;"></div>');
		
		$('body').append(magnetPanel);
		
		if($.storage.get("panelOpened")){
		  $('#magnet-panel').hide().delay(1000).fadeIn(1000);
		} else {
		  $('#magnet-panel').hide();
		}
		
		$('#close-panel-btn').click(function(){
		  $.storage.set("panelOpened", false);
		  $('#magnet-panel').fadeOut();
		});
	}
	
	function modifyUI() {
	  detectLikeButtons();
    
		// init font
		var headID = document.getElementsByTagName("head")[0];    
  	var cssNode = document.createElement('link');
  	cssNode.type = 'text/css';
  	cssNode.rel = 'stylesheet';
  	cssNode.media = 'screen';
  	cssNode.href = 'http://fonts.googleapis.com/css?family=Inconsolata';
  	headID.appendChild(cssNode);
		
//		var totalCountDiv = initPopupCounterForTotal();
	  var countDiv = initPopupCounterForDisabled();
		initStatCounter();
		initMagnetPanel();
		initMagnetImage();
		
		magnetINT = new DIntegrator(-200, 0.6, 0.55);
		magnetINT.setTarget(0);
		magnetRINT = new DIntegrator(180, 0.3, 0.5);
		magnetRINT.setTarget(0);
		
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
//			magnet.setMouseOver(true);
			$('.magnet_detected').css('display', 'inline-block');
		});
		
		$('#like-magnet').live('mouseleave', function() {
			isMouseOver = false;
//			magnet.setMouseOver(false);
//			magnet.setSwitch(1);
			$(targetButtonPatterns).not('.magnet_attached').each(function(){
				var btn = $(this);
				btn.css('font-size','100%').css('-webkit-transform','rotate(0deg)');
			});			
		});
		
		$('#like-magnet').live('click', function() {
			var magnet = $(this);
			var magnet_x = magnet.offset().left;
			var magnet_y = magnet.offset().top;
			var magnet_h = magnet.height();
      
	    var btn_set = {};
     	$.each(targetButtonPatternArray, function(key, value){
      	btn_set[key] = $(value).not('.magnet_attached');
      	btn_set[key].addClass('magnet_attached');
     	});
      
			var numBtn = 0;
			numBtn = countTotalNumOfButtons(btn_set);
			countDiv.popupAnimation(numBtn);
			$.storage.set("numOfDisabledButtons", ($.storage.get("numOfDisabledButtons")+numBtn));
			
//			sendDisablingLogToServer(btn_set);
			animateButtonSet(btn_set, magnet_x, magnet_y, magnet_h);
			
			var attached_btns = $('.magnet_attached');
			attached_btns.removeClass('.magnet_detected').each(function(){
				$(this).delay(10000).animate({
					opacity: 0.0,
					right: '+=' + (Math.random()*50-25),
			    top: '+='+ (Math.random()*50-25)
			  }, Math.random()*300 + 800, function() {
					$(this).remove();
			  });
			});	
		});
			
	}
}

var disabledCounterINT;
var totalCounterINT;

$.fn.popupAnimation = function(numBtn) {
  var elem = $(this);
	
	elem.html('+'+numBtn).css('z-index', 100);
	elem.delay(1200).animate({
		opacity: 0.0,
		fontSize: "39px"
		}, 1000, function() {
			elem.css({zIndex: 0, fontSize: '0px', opacity: 1.0}).html('');
			clearInterval(disabledCounterINT);
			disabledCounterINT = setInterval(disabledCounterAnimation, 30);
//			$('#stat-counter .stat-disabled').text($.storage.get("numOfDisabledButtons"));
	});
}

function disabledCounterAnimation() {
	var target = $.storage.get("numOfDisabledButtons");
	var current = parseInt( $('#stat-counter .stat-disabled').text() );
	if( current<target )
		$('#stat-counter .stat-disabled').text(current+1);
	if(current+1 == target)
		clearInterval(disabledCounterINT);
}

$.fn.popupAnimationForTotal = function(numBtn) {
  var elem = $(this);
	clearInterval(totalCounterINT);
	totalCounterINT = setInterval(totalCounterAnimation, 30);
}

function totalCounterAnimation() {
	var target = $.storage.get("numOfLikeButtons");
	var current = parseInt( $('#stat-counter .stat-total').text() );
	if( current<target )
		$('#stat-counter .stat-total').text(current+1);
	if(current+1 == target)
		clearInterval(totalCounterINT);
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


