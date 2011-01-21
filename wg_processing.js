function WGProcessing() {
	
  this.init = function() {
  	setTimeout ( modifyUI, 1000 );
  }
    
	function modifyUI() {	
		
		var bDeg = 65;
		
		var cols = $('.ref-col a');
		cols.css("width","100%").css("display","inline-block");
		
		cols.each(function(){
			var anchor = $(this);
			var h = anchor.height();
			anchor.html('<div style="-webkit-transform-origin: 0px '+h+'px;">'+anchor.text()+'</div>');
		});
		
		var divs = $('.category a div');
		
		divs.each(function(){
			var text3D = new Text3D(this);
			text3D.rotateYDIV( Math.floor(Math.random()*10+bDeg) , Math.floor(Math.random()*50+5));
			this.text3D = text3D;
		});
		
		divs.mouseout(function(event) {
			var cate = $(this).parent().parent();
			var divs = cate.find('a div');
			var n = 0;
			for(var i=0; i<divs.length; i++) {
				if(divs[i]==this) {
					n = i;
					break;
				}
			}
			if(n>0)
				divs[n-1].text3D.rotateYDIV(Math.floor(Math.random()*10+bDeg) , Math.floor(Math.random()*50+5));
			if(n-1>0)
				divs[n-2].text3D.rotateYDIV(Math.floor(Math.random()*10+bDeg) , Math.floor(Math.random()*50+5));
			if(n-2>0)
				divs[n-3].text3D.rotateYDIV(Math.floor(Math.random()*10+bDeg) , Math.floor(Math.random()*50+5));
			if(n-3>0)
				divs[n-4].text3D.rotateYDIV(Math.floor(Math.random()*10+bDeg) , Math.floor(Math.random()*50+5));
			if(n+1<divs.length)
				divs[n+1].text3D.rotateYDIV(Math.floor(Math.random()*10+bDeg) , Math.floor(Math.random()*50+5));
			if(n+2<divs.length)
				divs[n+2].text3D.rotateYDIV(Math.floor(Math.random()*10+bDeg) , Math.floor(Math.random()*50+5));
			if(n+3<divs.length)
				divs[n+3].text3D.rotateYDIV(Math.floor(Math.random()*10+bDeg) , Math.floor(Math.random()*50+5));
			if(n+4<divs.length)
				divs[n+3].text3D.rotateYDIV(Math.floor(Math.random()*10+bDeg) , Math.floor(Math.random()*50+5));
			this.text3D.rotateYDIV(Math.floor(Math.random()*10+bDeg) , Math.floor(Math.random()*50+5));
		});
		
		divs.mouseenter(function(event) {
			var cate = $(this).parent().parent();			
			var divs = cate.find('a div');
			var n = 0;
			for(var i=0; i<divs.length; i++) {
				if(divs[i]==this) {
					n = i;
					break;
				}
			}
			
			if(n>0)
				divs[n-1].text3D.rotateYDIV(15, 10);
			if(n-1>0)
				divs[n-2].text3D.rotateYDIV(30, 10);
			if(n-2>0)
				divs[n-3].text3D.rotateYDIV(45, 10);		
			if(n-3>0)
				divs[n-4].text3D.rotateYDIV(60, 10);
			if(n+1<divs.length)
				divs[n+1].text3D.rotateYDIV(15, 10);
			if(n+2<divs.length)
				divs[n+2].text3D.rotateYDIV(30, 10);
			if(n+3<divs.length)
				divs[n+3].text3D.rotateYDIV(45, 10);	
			if(n+4<divs.length)
				divs[n+4].text3D.rotateYDIV(60, 10);	
						
			this.text3D.rotateYDIV(-10, 10);
		});
	
	}
	
}