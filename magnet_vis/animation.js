function Language(name,like,count) {
	var _name = name;
	var _count = count;
	var _like = like;
	var _langDiv;
	var _likeDiv;
	var _likeBoxDiv;
	var _divider = 3;
	
	init();
	
	function init() {
		_langDiv = $('<div id="'+_name.toLowerCase()+'" class="language"></div>');
		_langDiv.wrapInner('<div class="box"></div><div class="title">'+_name+'</div>');
		$('#lang_container').append(_langDiv);
		
		_likeDiv = $('<div class="like">'+_like+'</div>');
		_likeDiv.css('font-size',_count+"px");
		_likeDiv.css('line-height',_count+"px");
		_likeBoxDiv = $('<div class="like_box"></div>');
		
		var _likeFontSize = Math.floor(_count/_divider);
		if(_likeFontSize<1)
			_likeFontSize = 1;
		
		_likeDiv.animate({
		  	fontSize: _likeFontSize,
			},
			{
		  	duration: _count*20,
		    specialEasing: {
		      fontSize: 'easeOutElastic'
		 		},
		});
		
		var top = Math.random()*300;
		var left = Math.random()*400;
		var w = 200;//_count*4*_like.length;
		var h = _count*2;
		_likeBoxDiv.css('top',top+'px');
		_likeBoxDiv.css('left',left+'px');
		_likeBoxDiv.css('width',w+'px');
		_likeBoxDiv.css('height',h+'px');
		_likeBoxDiv.css('line-height',_count+'px');
		
		$('#canvas').append(_likeBoxDiv);
		_likeBoxDiv.append(_likeDiv);
	}
	this.setDivider = function(divider) {
		_divider++;
		
		var _likeFontSize = Math.floor(_count/_divider);
		_likeDiv.css('line-height',_likeFontSize+"px");
		if(_likeFontSize<1)
			_likeFontSize = 1;
			
		_likeDiv.animate({
		  	fontSize: _likeFontSize,
			},
			{
		  	duration: _count,
		    specialEasing: {
		      fontSize: 'easeOutBounce'
		 		},
		});
	}
	this.getLikeInfo = function() {
		var dimension = [_likeDiv.width(),_likeDiv.height(),_count];
		return dimension;
	}
	this.updateCount = function(new_amount) {
		_count += new_amount;
		
		var _likeFontSize = Math.floor(_count/_divider);
		_likeDiv.css('line-height',_likeFontSize+"px");
		if(_likeFontSize<1)
			_likeFontSize = 1;
			
		_likeDiv.animate({
		  	fontSize: _likeFontSize,
			},
			{
		  	duration: new_amount*15,
		    specialEasing: {
		      fontSize: 'easeOutBounce'
		 		},
		});
	
	}
	
}


/*
//Off the cuff, Prototype style. 
//Note, this is not optimal; there should be some basic partitioning and caching going on. 
(function () { 
    var elements = []; 
    Element.register = function (element) { 
        for (var i=0; i<elements.length; i++) { 
            if (elements[i]==element) break; 
        } 
        elements.push(element); 
        if (arguments.length>1)  
            for (var i=0; i<arguments.length; i++)  
                Element.register(arguments[i]); 
    }; 
    Element.collide = function () { 
        for (var outer=0; outer < elements.length; outer++) { 
            var e1 = Object.extend( 
                $(elements[outer]).positionedOffset(), 
                $(elements[outer]).getDimensions() 
            ); 
            for (var inner=outer; inner<elements.length; innter++) { 
                var e2 = Object.extend( 
                    $(elements[inner]).positionedOffset(), 
                    $(elements[inner]).getDimensions() 
                ); 
                if (     
                    (e1.left+e1.width)>=e2.left && e1.left<=(e2.left+e2.width) && 
                    (e1.top+e1.height)>=e2.top && e1.top<=(e2.top+e2.height) 
                ) { 
                    $(elements[inner]).fire(':collision', {element: $(elements[outer])}); 
                    $(elements[outer]).fire(':collision', {element: $(elements[inner])}); 
                } 
            } 
        } 
    }; 
})(); 

//Usage: 
Element.register(myElementA); 
Element.register(myElementB); 
$(myElementA).observe(':collision', function (ev) { 
    console.log('Damn, '+ev.memo.element+', that hurt!'); 
}); 
//detect collisions every 100ms 
setInterval(Element.collide, 100);
*/
