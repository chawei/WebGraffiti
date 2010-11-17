var style_element;
var canvasElement;

var modes = {};

window.addEventListener("resize", function() {
	
	canvasElement.height = Math.floor(window.innerHeight);
	canvasElement.width = Math.floor(window.innerWidth);

	drawCanvas();
	
}, false);

function createCanvas(){
	
	modifyUI();
	
	canvasElement = document.createElement('canvas');
	canvasElement.height= Math.floor(window.innerHeight);
	canvasElement.width= Math.floor(window.innerWidth);
	canvasElement.style.position = "absolute";
	canvasElement.style.left = 0;
	canvasElement.style.top = 0;
//	convasElement.clear = false;
	canvasElement.style.zIndex = -1;

	document.body.appendChild(canvasElement);
}

// draw freehand rect 
function drawFreehandRect(x, y, width, height){
	
	var context = canvasElement.getContext("2d");
	
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

	style_element = document.createElement("style");
    style_element.innerText = cssToInject;
    document.documentElement.insertBefore(style_element, null);
}

function modifyUI(){

	// add font link <link href='http://fonts.googleapis.com/css?family=Reenie+Beanie&subset=latin' rel='stylesheet' type='text/css'>
	var headID = document.getElementsByTagName("head")[0];         
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.media = 'screen';
	cssNode.href = 'http://fonts.googleapis.com/css?family=Reenie+Beanie&subset=latin';
	headID.appendChild(cssNode);
	
	// replace img
	var logoDiv = document.getElementById('lga');
	var img = logoDiv.getElementsByTagName('img')[0];
	logoDiv.removeChild(img);
	var newImg = document.createElement("img");
	newImg.setAttribute('src', "http://people.artcenter.edu/~tchien/assets/crap.png");
	newImg.setAttribute('alt', 'na');
	logoDiv.appendChild(newImg);
	
	// create new text
	var fontElement = document.getElementsByTagName('font')[0];
	removeChildNodes(fontElement);
	// var newText = document.createTextNode('WHO GIVE A SHIT ABOUT');
	// fontElement.appendChild(newText);
	// fontElement.style["font-size"] = '3em';
	
	// change button
	var buttonSubmit = getElementsByClass(document,'lsbb','span');
	var btn2 = buttonSubmit[1].childNodes[0];
	btn2.value = "Wish Me Luck";
	btn2.style["font-size"] = '1.5em';
	var btn1 = buttonSubmit[0].childNodes[0];
	btn1.value = "I do";
	btn1.style["font-size"] = '1.5em';

}

function drawCanvas() {
	
	var context = canvasElement.getContext("2d");
	
//	alert(canvasElement.width+" "+canvasElement.height);
	
	// draw freehand textfield
	var inputs = getElementsByClass(document,'lst','input');
	var inputX = Math.floor(findPosX(inputs[0]));
	var inputY = Math.floor(findPosY(inputs[0]));
	
	var inputWidth = Math.floor(inputs[0].offsetWidth);
	var inputHeight = Math.floor(inputs[0].offsetHeight);
	
	drawFreehandRect(inputX,inputY,inputWidth,inputHeight);
	
	// change button
	var buttonSubmit = getElementsByClass(document,'lsbb','span');
	
	var btn2 = buttonSubmit[1].childNodes[0];
	drawFreehandRect( findPosX( btn2 ), findPosY( btn2 ),btn2.offsetWidth,btn2.offsetHeight);
	
	var btn1 = buttonSubmit[0].childNodes[0];
	drawFreehandRect( findPosX( btn1 ), findPosY( btn1 ), btn1.offsetWidth,btn1.offsetHeight);
}

function removeChildNodes(node)
{
  while (node.childNodes[0])
  {
    node.removeChild(node.childNodes[0]);
  }
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
    } else if (request.action == "drawCanvas") {
		drawCanvas();
	} else if (request.action == "createCanvas") {
		createCanvas();
	}
	
});


