var styleElement;
var webGraffiti = null;
var isInit = false;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	console.log(isInit);
	if (request.action == "initWG") {
		isInit = initWG();
	}
});

function initWG() {
	if (webGraffiti == null) {
		switch(window.location.hostname) {
			case "www.facebook.com":
				webGraffiti = new WGFacebook();
				break;
	  }
		webGraffiti.init();
	}
	return true;
}
