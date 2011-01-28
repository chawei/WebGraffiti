function WGFacebook() {
	
	var isInit = false;
	var adImage;
	var isMouseOver = false;
	var vibrateINT;
	
  this.init = function() {
		if (isInit == false) {
			modifyUI();
			console.log('init facebook');
			isInit = true;
		}
//  	setTimeout ( modifyUI, 3000 );
  }
  
	function vibrating() {
		if(isMouseOver) {
			$('.like_link, .commentActions .as_link').each(function(){
				var btn = $(this);
				var deg = Math.random()>0.5 ?Math.random()*(-20) :Math.random()*20;
				btn.css('-webkit-transform','rotate('+deg+'deg)');//.css("font-size",fs+"%");
			});
			$('#profile_connect, .profile_connect_button').each(function(){
				var btn = $(this);
				var deg = Math.random()>0.5 ?Math.random()*(-50) :Math.random()*50;
				btn.css('-webkit-transform','rotateY('+deg+'deg)');//.css("font-size",fs+"%");
			});	
		}
	}
	
	function modifyUI() {	
  	// var headID = document.getElementsByTagName("head")[0];    
  	// var cssNode = document.createElement('link');
  	// cssNode.type = 'text/css';
  	// cssNode.rel = 'stylesheet';
  	// cssNode.media = 'screen';
  	// cssNode.href = 'http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold';
  	// headID.appendChild(cssNode);	

		$('body').append('<img id="like-magnet" src="http://chaweihsu.com/yuinchien.com/assets/magnet.png" style="position:fixed;right:10px;top:300px;cursor:pointer;z-index:0;"/>');

		$('#like-magnet').live('mouseenter', function() {
			isMouseOver = true;
		});
		$('#like-magnet').live('mouseleave', function() {
			isMouseOver = false;
			$('.like_link, .cmnt_like_link').not('.magnet_attached').each(function(){
				var btn = $(this);
				btn.css('font-size','100%').css('-webkit-transform','rotate(0deg)');
			});
			$('#profile_connect, .profile_connect_button').not('.magnet_attached').each(function(){
				var btn = $(this);
				btn.css('font-size','100%').css('-webkit-transform','rotateY(0deg)');
			});
			
		});
		
		vibrateINT = setInterval(vibrating,30);
		
		console.log(  );
		
		$('#like-magnet').live('click', function() {
			var magnet = $(this);
			var magnet_x = magnet.offset().left;
			var magnet_y = magnet.offset().top;
			var buttons = $('.like_link, .cmnt_like_link, label#profile_connect, .profile_connect_button').not('.magnet_attached');
			buttons.addClass('magnet_attached');
//			$.get("http://magnet.detourlab.com/attached?num="+buttons.length);
			
			buttons.each(function(){
				var btn = $(this);
				var btn_x = btn.offset().left;
				var btn_y = btn.offset().top;
				
				btn.css('left', btn_x).css('top', btn_y).css('position', 'absolute').css('z-index', '10');
				btn.click(function(e){
					e.preventDefault();
				});
				
				var rand_x = Math.random()*(-30);
				var rand_y = Math.random()>0.5 ?Math.random()*(30) : 80+Math.random()*30; //Math.random()*(30);
				var shift_x = magnet_x - btn_x + rand_x;
				var shift_y = magnet_y - btn_y + rand_y;
				
				btn.animate({
			    left: '+='+shift_x,
			    top: '+='+shift_y,
					
			  }, 600, function() {
					var deg = Math.random()>0.5 ?Math.random()*(-15) :Math.random()*15;
					btn.css('position', 'fixed').css('top', 300 + rand_y).css('-webkit-transform','rotateZ('+deg+'deg)');
			    // Animation complete.
			  });
			});

		});
		
	}
	
}