var styleElement;
var webGraffiti = null;
var isInit = false;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "initWG") {
		initWG();
		//webGraffiti == null ? sendResponse({isInit: false}) : sendResponse({isInit: true});
	}
});

function initWG() {
	if (webGraffiti==null && window.location.hostname=="www.facebook.com") {
		webGraffiti = new WGFacebook();
		webGraffiti.init();
	}
	/* 
	else if (webGraffiti!=null) {
	  webGraffiti.refreshTotalCounter();
	}
	*/
}
