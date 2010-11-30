var style_element;
var canvasElement;

var MODE = -1;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "injectCss") {
		injectCss(request.css);
  } else if (request.action == "removeCss") {
		removeCss();
  } else if (request.action == "drawCanvas") {
//		drawCanvas();
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
  
  style_element = document.createElement("style");
  style_element.innerText = cssToInject;
  document.documentElement.insertBefore(style_element, null);
  
  switch(window.location.hostname) {
    case "encrypted.google.com":
      MODE = 0;
      break;
    case "www.apple.com":
      MODE = 2;
      break;
    default:
      MODE = 1;
  }
	if(MODE==0) {
		$('body center').addClass('invisible');
	}
}

function createCanvas(){
	
	if(MODE==0){
		modifyUI();
    var sound = document.createElement('embed');
    sound.setAttribute('src', "http://people.artcenter.edu/~tchien/assets/yawn3.wav");
    sound.setAttribute("loop","false");
    sound.setAttribute("autostart","true");
    sound.setAttribute("type","audio/x-wav");
    sound.setAttribute("hidden","true");
    document.body.appendChild(sound);
	}	
	else if(MODE==2){
    // $('#hero-image').fadeOut(500, function() {
    //   $(this).attr('src', 'http://people.artcenter.edu/~tchien/assets/live_or_die.jpg').load(function(){ $(this).fadeIn(); });
    // });
//    $('#news-link').addClass('invisible');

    $('#news-link').attr('id','graffiti-news-link');
	  $('#graffiti-news-link').hide().html(msgForApple[0]).fadeIn();  
	  setInterval("graffitiNewsLink()", 3000);
  	  
    var img = $('<img src="http://people.artcenter.edu/~tchien/assets/live_or_die2.png" style="position: absolute; top:30px; left:130px; display: none;"/>');
    $('#content').css('position', 'relative');
    $('#content').append(img);
    img.delay(1000).fadeIn(3000);
    document.getElementById('hero-image').parentNode.appendChild(img);
  } 

	canvasElement = document.createElement('canvas');	
	canvasElement.height= Math.floor(window.innerHeight);
	canvasElement.width= Math.floor(window.innerWidth);
	canvasElement.style.position = "absolute";
	canvasElement.style.left = 0;
	canvasElement.style.top = 0;
	canvasElement.style.zIndex = -1;
	canvasElement.setAttribute('id','canvasId');

	document.body.appendChild(canvasElement);
	var processingInstance = new Processing(canvasElement, sketchProc);

}

var msgForApple = [ "We Luv Apple", "But We Luv Freedom More", "Open IOS!!"];

function graffitiNewsLink()
{
  var graffiti_link = $('#graffiti-news-link');
  var currentMsg = graffiti_link.html();
  if(currentMsg==msgForApple[0])
    graffiti_link.hide().html(msgForApple[1]).fadeIn();
  else if(currentMsg==msgForApple[1])
    graffiti_link.hide().html(msgForApple[2]).fadeIn();
  else
    graffiti_link.hide().html(msgForApple[0]).fadeIn();
}

function modifyUI() {
  
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
  newImg.setAttribute('src', "http://people.artcenter.edu/~tchien/assets/sketch_ungoogleable.png");
  newImg.setAttribute('alt', 'na');
  newImg.setAttribute('width', 400);
  logoDiv.appendChild(newImg);
  
//  $('#lga').css('height', '50px').css('font-size', '3em').css('margin', '100px 0 50px 0').html('UN-Googleable Wall');
	
	// create new text
	var fontElement = document.getElementsByTagName('font')[0];
	removeChildNodes(fontElement);
  //var newText = document.createTextNode('UN-Googleable Wall');
  //fontElement.appendChild(newText);
  //fontElement.style["font-size"] = '3em';
	
	// change button
	var buttonSubmit = getElementsByClass(document,'lsbb','span');
	var btn2 = buttonSubmit[1].childNodes[0];
	btn2.value = "Lucky Me";
	btn2.style["font-size"] = '1.5em';
	
  // $('span input.lsb').click(function(e) {
  //   e.preventDefault();
  //   var searchField = $('input.lst');
  //     ungoogleablePost(searchField.val());
  // });
	
	var btn1 = buttonSubmit[0].childNodes[0];
	btn1.style["font-size"] = '1.5em';
}

function ungoogleablePost(postStr){
  
  var post = $('<div class="post" style="color:#F90"></div>');
  var ww = Math.random()*$('body').width();
  var hh = Math.random()*$('body').height();
  console.log("width: "+ww);
  console.log("height: "+hh);
  post.text(postStr).css('position', 'absolute').css('top', hh+'px').css('left', ww+'px').hide();
  //$('body').css('position', 'relative');
  $('body').append(post);
  post.fadeIn();
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






