/ * processing in js */
function Dust(x, y, moveToX, moveToY){

	this.position = new processing.PVector(x,y);
	this.targetPosition = new processing.PVector(moveToX,moveToY);
	
	this.radiusX = 10;
	this.radiusY = 10;
	this.scaleInt = new DIntegrator(0.01, 0.8, 0.05);
  this.scaleInt.setTarget(1.0);
	
	this.moving = function(){
    // console.log(this.position);
    // console.log(this.targetPosition);
		var v = new processing.PVector(this.targetPosition.x-this.position.x, this.targetPosition.y-this.position.y);
//			console.log(" "+v.normalize());
		
//			this.position.add(v.normalize());
	}
	
	this.draw = function(){
		
		processing.fill(33);
		processing.stroke(33);
		
		var currentAngle = 0;
	  var totalDots = 20;
	  var angleGap = 2*Math.PI/totalDots;
		
		if(this.scaleInt.value > this.scaleInt.target)
    {
      this.scaleInt.setTarget( Math.random()/3+1 );
    }

		this.scaleInt.update();
		this.radiusX = 11 * processing.map(this.scaleInt.value, 0, 1, 1, 2);
		this.radiusY = 10 * processing.map(this.scaleInt.value, 0, 1, 1, 2);
		
		processing.beginShape();
	
	
		for(var i=0; i<totalDots; i++){
	
			var xx = this.position.x + Math.cos(currentAngle)*this.radiusX*(1+Math.random()*0.07);
			var yy = this.position.y + Math.sin(currentAngle)*this.radiusY*(1+Math.random()*0.07);
			
			processing.vertex(xx, yy);
			currentAngle += angleGap;
		}
		processing.endShape(processing.CLOSE);
	
	}
}



function WGImage(divParent) {
	var parent = divParent; 
	var x = 0;
	var y = 0;
	var mx = 0;
	var my = 0;
	var dSize = 80;
	var width = parent.width();//.offsetWidth;//.find('img')[0].offsetWidth;
	var height = parent.height();//offsetHeight;//.find('img')[0].offsetHeight;
	var canvasElement;
	var context;
	var drop;
	var drops;
	init();
	
	function init() {
    canvasElement = document.createElement('canvas');
		canvasElement.width=width; 
  	canvasElement.height=height;
  	canvasElement.style.position = "absolute";
  	canvasElement.style.left = 0;
  	canvasElement.style.top = 0;
  	canvasElement.style.zIndex = 3;
  	parent[0].appendChild(canvasElement);
		context = canvasElement.getContext('2d');
		parent.find('img').each(function(){
			context.drawImage(this, $(this).position().left, $(this).position().top);
		});
	
		// var processingInstance = new Processing(canvasElement, sketchProc);
		// x = -Math.random()*50;
		// y = 0;//
		// mx = 0; my = 10;
		
		// var input = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
		// var output = ctx.createImageData(canvasElement.width, canvasElement.height);
		// var w = input.width, h = input.height;
		// var inputData = input.data;
		// var outputData = output.data;
		// for(var i=0; i<w*h/2; i++) {
		// 	outputData[i] = inputData[i+20];
		// }
		// ctx.putImageData(output, 0, 0);
		// 
	}
// 	function cleanImage(){
// //		context.clearRect(x,y,4,4);
// 		context.fillStyle = '#ffffff';
// 		context.fillRect(25,25,50,50);
// 		x+=2;
// 	}
 	function sketchProc(processing) {
    processing.setup = function() {
			processing.smooth();
  		processing.frameRate(9);
			drops = new processing.ArrayList();
			var n = Math.round( Math.random()*1 +1);
			for(var i=0; i<n; i++) {
				var dw = dSize+processing.random(-10,10);
				var dh = dSize+processing.random(-10,10);
				var dx = processing.random(-50,-30);
				var dy = height-dh/6*5;//processing.random(10,height-70);
				var drop = new WGWaterDrop(dx,dy,dw,dh,processing);
				drops.add(drop);
			}
    }
    processing.draw = function() {
			processing.fill(255,255,251);
			processing.strokeWeight(0.1);
			for(var i=0; i<drops.size(); i++) {
				var drop = drops.get(i);
				processing.pushMatrix();
				processing.translate(x+drop.x+Math.random()*3,drop.y+y+Math.random()*3);
				drop.draw();
				processing.popMatrix();
			}
			x+=10;

		}
		
	}
}


	// processing.fill(255,0,0);
	// 	processing.ellipse(p1.x,p1.y,3,3);
	// 	processing.ellipse(p2.x,p2.y,3,3);
	// 	processing.ellipse(p3.x,p3.y,3,3);
	// 	processing.ellipse(p4.x,p4.y,3,3);
	// 	processing.ellipse(p5.x,p5.y,3,3);
	// 	processing.ellipse(p6.x,p6.y,3,3);
	// 	processing.ellipse(p7.x,p7.y,3,3);
	// 	processing.ellipse(p8.x,p8.y,3,3);



/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}

/****************************/

shortcut.add("Ctrl+Shift+P",function() {
    chrome.extension.sendRequest({shortCut: "overridePage"}, function(response){});    
});

shortcut.add("Ctrl+Shift+D",function() {
    chrome.extension.sendRequest({shortCut: "overrideDomain"}, function(response){});
});

shortcut.add("Ctrl+Shift+G",function() {
    chrome.extension.sendRequest({shortCut: "overrideAll"}, function(response){});    
});
