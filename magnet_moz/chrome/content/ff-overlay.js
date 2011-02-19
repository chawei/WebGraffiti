magnet.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ magnet.showFirefoxContextMenu(e); }, false);
					
	
};

magnet.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-magnet").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { magnet.onFirefoxLoad(); }, false);
