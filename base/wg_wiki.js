function WGWiki() {
	
	var adImage;
	var adImage;	
	
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
		$('table.infobox a.image img').wrap('<div id="wg_monster" />');
		var originalDiv = $('#wg_monster');
		originalDiv.css('position', 'relative');
		adImage = new WGImage(originalDiv);
		originalDiv.find('img').css('visibility', 'hidden');
		
	}
	
}