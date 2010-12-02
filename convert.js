var styleElement;
var canvasElement;
var webGraffiti;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "injectCss") {
		injectCss(request.css);
  } else if (request.action == "removeCss") {
		removeCss();
  } else if (request.action == "drawCanvas") {
    // drawCanvas();
	} else if (request.action == "createCanvas") {
		createCanvas();
	}
});

window.addEventListener("resize", function() {
	canvasElement.height = Math.floor(window.innerHeight);
	canvasElement.width = Math.floor(window.innerWidth);  // assign width will clear the context
  //	drawCanvas();
}, false);


function injectCss(cssToInject) {
  styleElement = document.createElement("style");
  styleElement.innerText = cssToInject;
  document.documentElement.insertBefore(styleElement, null);
  
  switch(window.location.hostname) {
    case "encrypted.google.com":
      webGraffiti = new WGGoogle(); 
      break;
    case "www.apple.com":
      webGraffiti = new WGApple();
      break;
		case "twitter.com":
			webGraffiti = new WGTwitter();
			break;
    default:
      webGraffiti = new WGDust();
  }
}

function removeCss(){
  styleElement.parentNode.removeChild(styleElement);
  history.go(0);
}

function createCanvas(){
  webGraffiti.init();

	canvasElement = document.createElement('canvas');	
	canvasElement.height= Math.floor(window.innerHeight);
	canvasElement.width= Math.floor(window.innerWidth);
	canvasElement.style.position = "absolute";
	canvasElement.style.left = 0;
	canvasElement.style.top = 0;
	canvasElement.style.zIndex = -1;
	canvasElement.setAttribute('id','canvasId');

	document.body.appendChild(canvasElement);
	var processingInstance = new Processing(canvasElement, webGraffiti.sketchProc);
}






