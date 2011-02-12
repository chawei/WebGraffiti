var styleElement;
var webGraffiti = null;
var isInit = false;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "initWG") {
		initWG();
	}
});

function initWG() {
	if (webGraffiti==null && window.location.hostname=="www.facebook.com" && window.location.pathname != "/plugins/fan.php") {
		webGraffiti = new WGFacebook();
		webGraffiti.init();
	}
}
