function WGTwitter() {
	
	var cracks;
	
  this.init = function() {
		cracks = new Array();
		setTimeout ( modifyUI, 1500 );
//  	modifyUI();
  }
  
  function sketchProc(processing) {
    var x, y, width, height, label;
    processing.setup = function(_x,_y){
			
    }
    processing.draw = function(){

    }
  }
  
	function modifyUI() {	
		console.log('modifyUI');
		$('.stream-item').click(function(e) {
			this.style.position = 'relative';
			var x = e.pageX - findPosX(this);
			var y = e.pageY - findPosY(this);
			cracks.push(new WGCrack(this, x, y));
			
		});
		
	}
	
	
  // function ungoogleablePost(postStr){
  //   var post = $('<div class="post" style="color:#F90"></div>');
  //   var ww = Math.random()*$('body').width();
  //   var hh = Math.random()*$('body').height();
  // 
  //   post.text(postStr).css('position', 'absolute').css('top', hh+'px').css('left', ww+'px').hide();
  //   $('body').append(post);
  //   post.fadeIn();
  // }
}