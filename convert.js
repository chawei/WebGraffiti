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
	} else if (request.action == "initWG") {
		initWG();
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
  switch(window.location.hostname) {
    case "encrypted.google.com":
  		cssToInject = 'html > body, html > body * {' + 
  			"font-family: 'Reenie Beanie', arial, serif !important;" +
  			'text-shadow: 0 !important;' +
  			'-webkit-text-fill-color: none !important;}' +
  			'span{background:transparent !important; border:none !important;}' +
  			'input{border: none !important; background: none !important; }'+
  			'div{border: none !important; border-bottom: none !important; border-top: none !important;}'+
  			'td{background:transparent !important; border: none !important; border-top: none !important; border-bottom: none !important;}'+
  			'html > body a:link, html > body a:link *,' +
  			'html > body a:link:hover, html > body a:link:hover *,' +
  			'html > body a:link:active, html > body a:link:active * {' +
  			'html > body a:visited, html > body a:visited *,' +
  			'html > body a:visited:hover, html > body a:visited:hover *,' +
  			'html > body a:visited:active, html > body a:visited:active * {' +
  			'.invisible {visibility: hidden;}';
  		cssToInject += 'html > body img { display:none !important; }';
  		cssToInject += 'html > body object { display:none !important;}';
      break;
		case "www.facebook.com":
  		cssToInject = 'html > body, html > body * {' + 
  //			"font-family: 'Reenie Beanie', arial, serif !important;" +
				"font-family: 'Droid Sans', arial, serif !important;" +
				// "font-size: 0.99em; !important"+
  			'text-shadow: 0 !important;' +
  			'-webkit-text-fill-color: none !important;}' +
  			// 'span{background:transparent !important; border:none !important;}' +
  			// 'input{border: none !important; background: none !important; }'+
  			// 'div{border: none !important; border-bottom: none !important; border-top: none !important;}'+
  			// 'td{background:transparent !important; border: none !important; border-top: none !important; border-bottom: none !important;}'+
  			'html > body a:link, html > body a:link *,' +
  			'html > body a:link:hover, html > body a:link:hover *,' +
  			'html > body a:link:active, html > body a:link:active * {' +
  			'html > body a:visited, html > body a:visited *,' +
  			'html > body a:visited:hover, html > body a:visited:hover *,' +
  			'html > body a:visited:active, html > body a:visited:active * {' +
  			'.invisible {visibility: hidden;}';
  		cssToInject += 'html > body img { display:none !important; }';
  		cssToInject += 'html > body object { display:none !important;}';
      break;
  }
  
  styleElement = document.createElement("style");
  styleElement.innerText = cssToInject;
  document.documentElement.insertBefore(styleElement, null);
  
}

function removeCss(){
  styleElement.parentNode.removeChild(styleElement);
  history.go(0);
}

function initWG() {
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
		case "www.facebook.com":
			webGraffiti = new WGFacebook();
			break;
		case "www.nytimes.com":
			webGraffiti = new WGNYTimes();
			break;
		case "www.yahoo.com":
			webGraffiti = new WGYahoo();
			break;
		case "en.wikipedia.org":
			webGraffiti = new WGWiki();
			break;
    default:
      webGraffiti = new WGDust();
  }
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

