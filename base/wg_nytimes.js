function WGNYTimes() {
	
	var adImageLeft;
	var adImageRight;	
	
  this.init = function() {
  	setTimeout ( modifyUI, 3000 );
  	
  	$('img').each(function() {
  	  if ($(this).parent('.wg_monster_container').length == 0) {
  	    $(this).wrap("<span class='wg_monster_container' style='position: relative; display: inline-block;' />");
  	    var wg_container = $(this).parent('.wg_monster_container');
  	    wg_container.append("<div class='call_monster_btn' \
  	                        style='position: absolute; top:0; left:0; \
  	                        display: none; cursor: pointer; \
  	                        background: url(http://people.artcenter.edu/~tchien/assets/monster_icon_30.png); \
  	                        width: 30px; height: 30px;'></div>");
      }
  	});
  	
  	$('.wg_monster_container').hover(
  	  function() {
        var btn = $(this).find('.call_monster_btn');
        btn.show(); 
      },
      function() {
        var btn = $(this).find('.call_monster_btn');
        btn.hide();
    	}
  	);
  	
  	$('.call_monster_btn').hover(
  	  function() { 
  	    $(this).css('background-position', '0px 30px'); 
  	  },
  	  function() { 
  	    $(this).css('background-position', '0px 0px'); 
  	  }
  	);
  	
  	$('.call_monster_btn').click(function(e) {
  	  var imgs = $(this).siblings('img');
  	  imgs.css('visibility', 'hidden');
  	  createMonster($(this).parent());
  	  
  	  e.stopPropagation();
  	  $(this).remove();
  	  return false;
  	});
  }
  
  function createMonster(img) {
		var newImage = new WGImage(img);
	}
  
  function sketchProc(processing) {
    var x, y, width, height, label;
    processing.setup = function(){
			processing.noLoop();
    }
    processing.draw = function(){
			
    }
  }
  
	function modifyUI() {	

		var originalDivLeft = $('#TopLeft');
		originalDivLeft.css('position', 'relative');
		adImageLeft = new WGImage(originalDivLeft);
		originalDivLeft.find('img').css('visibility', 'hidden');
		var originalDivRight = $('#TopRight');
		originalDivRight.css('position', 'relative');
		adImageRight = new WGImage(originalDivRight);
		originalDivRight.find('img').css('visibility', 'hidden');
				
		// var mastheadDiv = $('#masthead');
		// mastheadDiv.css('position','relative');
		// var masheadImg = new WGImage(mastheadDiv);
		// mastheadDiv.find('img').css('visibility', 'hidden');
	
	}
	
}