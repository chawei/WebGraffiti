function WGFacebook() {
	
	var adImage;
	
  this.init = function() {
		modifyUI();
//  	setTimeout ( modifyUI, 3000 );
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
	  	// add font link <link href='http://fonts.googleapis.com/css?family=Reenie+Beanie&subset=latin' rel='stylesheet' type='text/css'>
  	var headID = document.getElementsByTagName("head")[0];    
  	var cssNode = document.createElement('link');
  	cssNode.type = 'text/css';
  	cssNode.rel = 'stylesheet';
  	cssNode.media = 'screen';
  	cssNode.href = 'http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold';
//		cssNode.href = 'http://fonts.googleapis.com/css?family=Covered+By+Your+Grace';
  	headID.appendChild(cssNode);	
		var buttons = $('.like_link');//.slice(0,3);
		
		buttons.each(function() {
			new WGButton($(this), $(this).position().left, $(this).position().top, true);
		});

		
		
	
		// var originalDiv = $('#pagelet_adbox');
		// originalDiv.css('position', 'relative');
		// adImage = new WGImage(originalDiv);
		// originalDiv.find('img').css('visibility', 'hidden');
		
	}
	
}