var styleElement;
var webGraffiti = null;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "initWG") {
		initWG();
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

}
