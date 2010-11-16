
var style_element;

// draw freehand rect 
function drawFreehandRect(x, y, width, height){
	
	var newCanvas = document.createElement('canvas');
	newCanvas.height= Math.floor(window.innerHeight);
	newCanvas.width= Math.floor(window.innerWidth);
	newCanvas.style.position = "absolute";
	newCanvas.style.left = 0;
	newCanvas.style.top = 0;
	newCanvas.style.zIndex = -1;
	
	document.body.appendChild(newCanvas);
		
	var context=newCanvas.getContext("2d");
	
	var gap = 2;
	var freeFactor = 0.2;
	context.lineJoin = "round";
	context.strokeStyle = "#333";
	context.beginPath();
	context.moveTo( x, y);
	var currentX = x;
	var currentY = y;
	// TOP 
	while( currentX<(x+width) ){
		var randomX = Math.random()*gap;
		var randomY = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX;
		currentY += randomY*freeFactor;
		context.lineTo( currentX, currentY);
	}
	// RIGHT
	while( currentY<(y+height) ){
		var randomY = Math.random()*gap;
		var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX*freeFactor;
		currentY += randomY;
		context.lineTo( currentX, currentY);
	}
	// BOTTOM
	while( currentX>x ){
		var randomX = -1*Math.random()*gap;
		var randomY = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX;
		currentY += randomY*freeFactor;
		context.lineTo( currentX, currentY);
	}
	// LEFT
	while( currentY>y ){
		var randomY = -1*Math.random()*gap;
		var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX*freeFactor;
		currentY += randomY;
		context.lineTo( currentX, currentY);
	}
	context.closePath();
	context.stroke();
}

function injectCss(cssToInject){
	
	// add font link <link href='http://fonts.googleapis.com/css?family=Reenie+Beanie&subset=latin' rel='stylesheet' type='text/css'>
	var headID = document.getElementsByTagName("head")[0];         
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.media = 'screen';
	cssNode.href = 'http://fonts.googleapis.com/css?family=Reenie+Beanie&subset=latin';
	headID.appendChild(cssNode);
	
	// draw freehand textfield
	var canvasList = document.getElementsByTagName("canvas");

	var inputs = getElementsByClass(document,'lst','input');
	var inputX = Math.floor(findPosX(inputs[0]));
	var inputY = Math.floor(findPosY(inputs[0]));
	
	var inputWidth = Math.floor(inputs[0].offsetWidth);
	var inputHeight = Math.floor(inputs[0].offsetHeight);
	
	if(canvasList.length==0){
		drawFreehandRect(inputX,inputY,inputWidth,inputHeight);
		
		// change button
		var buttonSubmit = getElementsByClass(document,'lsbb','span');
		buttonSubmit[0].value = "I do";
		drawFreehandRect( Math.floor(findPosX( buttonSubmit[0] )),Math.floor(findPosY( buttonSubmit[0] )),buttonSubmit[0].offsetWidth,buttonSubmit[0].offsetHeight);
		
		buttonSubmit[1].value = "Wish Me Luck";
		drawFreehandRect( Math.floor(findPosX( buttonSubmit[1] )),Math.floor(findPosY( buttonSubmit[1] )),buttonSubmit[1].offsetWidth,buttonSubmit[1].offsetHeight);
	}
	
    style_element = document.createElement("style");
    style_element.innerText = cssToInject;
    document.documentElement.insertBefore(style_element, null);

}

function getElementsByClass(node,searchClass,tag) {
	
    var classElements = new Array();
    var els = node.getElementsByTagName(tag); // use "*" for all elements	

    var elsLen = els.length;

	var pattern = new RegExp(searchClass);
    for (i = 0, j = 0; i < elsLen; i++) {
	
         if ( pattern.test(els[i].className) ) {
             classElements[j] = els[i];
             j++;
         }
    }
    return classElements;
}

function findPosX(obj)
  {
    var curleft = 0;
    if(obj.offsetParent)
        while(1) 
        {
          curleft += obj.offsetLeft;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.x)
        curleft += obj.x;
    return curleft;
  }

  function findPosY(obj)
  {
    var curtop = 0;
    if(obj.offsetParent)
        while(1)
        {
          curtop += obj.offsetTop;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;
    return curtop;
  }


function removeCss(){
    style_element.parentNode.removeChild(style_element);
    history.go(0);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action == "injectCss") {
	injectCss(request.css);
    } else if (request.action == "removeCss") {
	removeCss();
    }
});


