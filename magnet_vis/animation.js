
function Likes(amount,likeString,city,language) {
	var _amount = amount;
	var _city = city;
	var _likeString = likeString;
	var _language = language;
	init();
	function init() {
		var top = -100 - Math.random()*100;
		var left = 1000*( Math.random()*0.8 + 0.2 );
		for(var i=0; i<_amount; i++) {
			var div = $('<div class="like">'+_likeString+'</div>');
			div.css('top',top+Math.random()*100);
			div.css('left',left+Math.random()*150);
			$('body').append(div);
			var likeLabel = new Like(div);
		}
	}
}

function Like(div) {
	var _div = div;
	var _startY = div.offset().top;
  var _force = 0.15+Math.random()*0.1;
	var _target = 600-Math.random()*60;
	var _t = 0;
	var _y;
	var _fallINT = setInterval(falling,40);
	
	function falling() {
		_t++;
		_y = _startY + _force*_t*_t;
		_div.css('top',_y);
		if(_y>=_target) {
			
			_div.animate({
				opacity: 0.0,
		  }, Math.random()*300 + 800, function() {
				$(this).delay(8000).remove();
		  });
		
			clearInterval(_fallINT);
		}
	}
}

function City(name,x,y) {
	
	var _x = x;
	var _y = y;
	var _name = name;
	var _maxRadius = 90;
	var _minRadius = 40;
	var paper;
	var circle;
	var self = this;
	var mid_bounce = false;
	
	init();
	
	this.getName = function() {
		return _name;
	}
	
	function init() {
		paper = Raphael(_x, _y, 200, 200);
		circle = paper.circle(100, 100, 30);
		circle.animate({ r: _minRadius}, 1000, "elastic");
		circle.attr("fill", "#ffff00");
		circle.attr("stroke", "#fff");
		circle.attr("_minRadius","3");
		// check line break
		paper.text(100,100,_name);
	}
	
	function updateRadius() {
		
	}
	
	this.bounce = function() {
		circle.animate({ r: circle.attrs.r+15}, 1000, "elastic");
	}
	
	circle.onAnimation(function(){
		var r = circle.attrs.r;
		var c_x = circle.attrs.cx + _x;
		var c_y = circle.attrs.cy + _y;
		$(paper.canvas).css('z-index', -1);
    var c_el = document.elementFromPoint(c_x-r-3, c_y);
    var c_el_r = document.elementFromPoint(c_x+r+3, c_y);
    $(paper.canvas).css('z-index', 1);
																				
    //console.log(c_x+r*f, c_y+r*f);
    //console.log(paper.canvas);

    if (c_el != paper.canvas && c_el_r != paper.canvas) {
      console.log("collision!");
      circle.stop();
    }
		
		if (circle.getBBox().width >= (_maxRadius*2)) {
			console.log('stop');
			circle.stop();
		}
	});	
}

City.prototype._bounce_away = function(x, y) {
	this.circle.animate({cx: x, cy: y}, 500, "bounce");
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