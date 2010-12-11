function WGNYTimes() {
	
	var adImageLeft;
	var adImageRight;	
	
  this.init = function() {
  	setTimeout ( modifyUI, 3000 );
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
	
	this.createMonster = function(img) {
		var newImage = new WGImage(img);
		img.css('visibility', 'hidden');
		
	}
	
}