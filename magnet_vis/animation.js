function Language(name,like,count) {
	var _name = name;
	var _count = count;
	var _like = like;
	var _langDiv;
	var _likeDiv;
	var _likeBoxDiv;
	var _targetFontSize;
	
	init();
	function init() {
		_langDiv = $('<div id="'+_name.toLowerCase()+'" class="language"></div>');
		_langDiv.wrapInner('<div class="box"></div><div class="title">'+_name+'</div>');
		$('#lang_container').append(_langDiv);
		
		_likeDiv = $('<div class="like">'+_like+'</div>');
		_likeDiv.css('font-size',_count+"px");
		_likeBoxDiv = $('<div class="like_box"></div>');
				
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
	
	this.updateCount = function(new_amount) {
		_count += new_amount;
		// _likeDiv.css('font-size',_count+"px");
		// var value = _counter+'px solid #000';
		// _likeDiv.animate({font-size: new_amount+'px'}, 2000);
		
		_likeDiv.animate({
		  	fontSize: _count/3,
			},
			{
		  	duration: new_amount*20,
		    specialEasing: {
		      fontSize: 'easeOutBounce'
		 		},
		});
	
	}
	
}


var elements = new Array();
var bodies = new Array();
var properties = new Array();
var isRunning = false;
var isMouseDown = false;
var stage = [0,0,800,400];
var delta = [0,0];
var orientation = { x: 0, y: 1 };
var timeStep = 1/25; 
var iterations = 1;
var worldAABB;
var world;

var walls = new Array();
var wall_thickness = 200;
var wallsSetted = false;

var mouseJoint;
var mouseX = 0;
var mouseY = 0;

var mouseOnClick = new Array();

function init() {
	// init box2d
		worldAABB = new b2AABB();

		worldAABB.minVertex.Set(-200, -200);
		worldAABB.maxVertex.Set( screen.width + 200, screen.height + 200);

		world = new b2World(worldAABB, new b2Vec2(0, 0), true);

		setWalls();
		
	// Get box2d elements

		elements = getElementsByClass("box2d");

		for (i = 0; i < elements.length; i++) {
			var element = elements[i];
			properties[i] = findPos(element);
			properties[i][2] = element.offsetWidth;
			properties[i][3] = element.offsetHeight;
		}

		for (i = 0; i < elements.length; i++) {
			var element = elements[i];
			element.style.position = 'absolute';
			element.style.left = properties[i][0] + 'px';
			element.style.top = properties[i][1] + 'px';
			element.style.backgroundColor = '#ffff00';
			element.onmousedown = onElementMouseDown;
			element.onmouseup = onElementMouseUp;
			element.onclick = onElementClick;

			bodies[i] = createBox(world, properties[i][0] + (properties[i][2] >> 1), properties[i][1] + (properties[i][3] >> 1), properties[i][2] / 2, properties[i][3] / 2, false);		
		}
		run();
}

function run() {
	isRunning = true;
	setInterval(loop, 50);
}

function loop() {

	if (getBrowserDimensions())
			setWalls();

	delta[0] += (0 - delta[0]) * .5;
	delta[1] += (0 - delta[1]) * .5;
	
	world.m_gravity.x = orientation.x * 350 + delta[0];
	world.m_gravity.y = orientation.y * 350 + delta[1];

//	mouseDrag();
	world.Step(timeStep, iterations);	
	
	for (i = 0; i < elements.length; i++) {

		var body = bodies[i];
		var element = elements[i];
		
		element.style.left = (body.m_position0.x - (properties[i][2] >> 1)) + 'px';
		element.style.top = (body.m_position0.y - (properties[i][3] >> 1)) + 'px';

		var rotationStyle = 'rotate(' + (body.m_rotation0 * 57.2957795) + 'deg)';
		
		element.style.WebkitTransform = rotationStyle;
		element.style.MozTransform = rotationStyle;
		element.style.OTransform = rotationStyle;
	}
}
function setWalls() {

	if (wallsSetted) {
		world.DestroyBody(walls[0]);
		world.DestroyBody(walls[1]);
		world.DestroyBody(walls[2]);
		world.DestroyBody(walls[3]);
		
		walls[0] = null; 
		walls[1] = null;
		walls[2] = null;
		walls[3] = null;
	}
	
	walls[0] = createBox(world, stage[2] / 2, - wall_thickness, stage[2], wall_thickness);
	walls[1] = createBox(world, stage[2] / 2, stage[3] + wall_thickness, stage[2], wall_thickness);
	walls[2] = createBox(world, - wall_thickness, stage[3] / 2, wall_thickness, stage[3]);
	walls[3] = createBox(world, stage[2] + wall_thickness, stage[3] / 2, wall_thickness, stage[3]);	
	
//	console.log(world, stage[2] / 2, - wall_thickness, stage[2], wall_thickness);
	
	wallsSetted = true;
}


// BOX2D UTILS
function createBox(world, x, y, width, height, fixed, element) {

	if (typeof(fixed) == 'undefined')
		fixed = true;

	var boxSd = new b2BoxDef();

	if (!fixed)
		boxSd.density = 1.0;

	boxSd.extents.Set(width, height);

	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);
	boxBd.userData = {element: element};

	return world.CreateBody(boxBd)
}

// UTILS
function getElementsByClass( searchClass ) {

	var classElements = new Array();
	var els = document.getElementsByTagName('*');
	var elsLen = els.length

	for (i = 0, j = 0; i < elsLen; i++) {

		var classes = els[i].className.split(' ');
		for (k = 0; k < classes.length; k++)
			if ( classes[k] == searchClass )
				classElements[j++] = els[i];
	}

	return classElements;
}

function findPos(obj) {

	var curleft = curtop = 0;

	if (obj.offsetParent) {

		do {

			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;

		} while (obj = obj.offsetParent);
	}

	return [curleft,curtop];
}

function getBrowserDimensions() {

	var changed = false;
		
	if (stage[0] != window.screenX) {

		delta[0] = (window.screenX - stage[0]) * 50;
		stage[0] = window.screenX;
		changed = true;
	}
	
	if (stage[1] != window.screenY) {

		delta[1] = (window.screenY - stage[1]) * 50;
		stage[1] = window.screenY;
		changed = true;
	}
	
	if (stage[2] != window.innerWidth) {

		stage[2] = window.innerWidth;
		changed = true;
	}
	
	if (stage[3] != window.innerHeight) {

		stage[3] = window.innerHeight;
		changed = true;
	}
	
	return changed;
}


// MOUSE EVENT
function onDocumentMouseDown() {

	isMouseDown = true;
	return false;
}

function onDocumentMouseUp() {

	isMouseDown = false;
	return false;
}

function onDocumentMouseMove() {

	if (!isRunning)
		run();

	mouseX = window.event.clientX;
	mouseY = window.event.clientY;
}

function onDocumentDoubleClick() {

	reset();
}

function onDocumentKeyPress(event) {

	if (event.charCode == 13)
		search();
}

function onDocumentTouchStart( event ) {

	if(event.touches.length == 1) {

		event.preventDefault();

		if (!isRunning)
			run();

		// Faking double click for touch devices

		var now = new Date().getTime();

		if (now - timeOfLastTouch  < 250) {

			reset();
			return;
		}

		timeOfLastTouch = now;

		mouseX = event.touches[0].pageX;
		mouseY = event.touches[0].pageY;
		isMouseDown = true;
	}
}

function onDocumentTouchMove( event ) {

	if(event.touches.length == 1) {

		event.preventDefault();

		mouseX = event.touches[0].pageX;
		mouseY = event.touches[0].pageY;
	}
}

function onDocumentTouchEnd( event ) {

	if(event.touches.length == 0) {

		event.preventDefault();
		isMouseDown = false;
	}
}

function onWindowDeviceOrientation( event ) {

	if ( event.beta ) {

		orientation.x = Math.sin( event.gamma * Math.PI / 180 );
		orientation.y = Math.sin( ( Math.PI / 4 ) + event.beta * Math.PI / 180 );

	}

}

//

function onElementMouseDown() {

	mouseOnClick[0] = window.event.clientX;
	mouseOnClick[1] = window.event.clientY;	
	return false;
}

function onElementMouseUp() {

	return false;
}

function onElementClick() {

	var range = 5;
	
	if (mouseOnClick[0] > window.event.clientX + range || mouseOnClick[0] < window.event.clientX - range && mouseOnClick[1] > window.event.clientY + range || mouseOnClick[1] < window.event.clientY - range)
		return false;
	
	if (this == document.getElementById('btnG')) search();
	if (this == document.getElementById('btnI')) imFeelingLucky();
	if (this == document.getElementById('q')) document.f.q.focus();
}
