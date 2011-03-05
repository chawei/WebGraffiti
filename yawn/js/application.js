google.load('search', '1', {"nocss" : true});

function SloppyGoogle() {
  var currentKeywords = "";
  var firstTime = true;
  this.webResultContainer = $('#contentWeb');
  this.imageResultContainer = $('#content');
}

SloppyGoogle.prototype.isFirstTime = function() {
  return this.firstTime;
}

SloppyGoogle.prototype.enterTheSite = function() {
  this.firstTime = false;
}

SloppyGoogle.prototype.webSearchComplete = function(searcher) {
	if (searcher.results && searcher.results.length > 0) {
    this.webResultContainer.empty();

    var results = searcher.results;
    for (var i = 0; i < results.length; i++) {
     	var result = results[i];
			
			var result_div = $('<div class="websearch_div"></div>');
			result_div.append('<div class="websearch_title"><a href="'+result.url+'" target="_blank">'+result.title+'</a></div>');
			result_div.append('<div class="websearch_content">'+result.content+'</div>');
			result_div.hide().delay(Math.random()*3000+200).fadeIn(1000);
			this.webResultContainer.append(result_div);
		}
	}
	else {
		$('#result_doc_container').addClass('hidden');
		if( $('#result_img_container').hasClass('hidden') ) {
			$('#content_desc').html('Oops! There is no search results for keyword: <b>'+currentKeywords+'</b>');
		}
	}
}

SloppyGoogle.prototype.imageSearchComplete = function(searcher) {
  // Check that we got results
  if (searcher.results && searcher.results.length > 0) {
    // Clear image results.
    this.imageResultContainer.empty();

    var results = searcher.results;
    for (var i = 0; i < results.length; i++) {
     	var result = results[i];

			var result_div = $('<div class="result_div"></div>');
			this.imageResultContainer.append(result_div);
			result_div.hide().delay(Math.random()*3000+200).fadeIn(1000);

			var result_image = $('<img class="result_img"/>');
			result_image.attr('src',result.tbUrl);
			result_div.append(result_image);
			result_image[0].onload = this.createWGResultImage;
			
			result_image.wrap('<a href="'+result.url+'" target="_blank"></a>');
    }
  }
	else {
		$('#result_img_container').addClass('hidden');
		if( $('#result_doc_container').hasClass('hidden') ) {
			$('#content_desc').html('Oops! There is no search results for keyword: <b>'+currentKeywords+'</b>');
		}
	}	
}

SloppyGoogle.prototype.createWGResultImage = function() {
	var w = 100/this.height*this.width;
	var rimage = new WGResultImage(this.parentNode,w,100);
}

SloppyGoogle.prototype.submitSearch = function() {
	var raw_keywords = trim( $('#input').val() );
	if(raw_keywords.length==0) {
		return;
	}
	else if(raw_keywords.length>1) {
	  var index = Math.floor( Math.random()*9 );
  	var messedUpModes = [0,0,0,0,1,1,1,1,2];
  	var messedUpMode = messedUpModes[index];
  	
	  if (this.isFirstTime()) {
  	  messedUpMode = 1;
  	  this.enterTheSite();
  	}
		keywords = messedUp(raw_keywords, messedUpMode);
	}
	
	$.ajax({
    type: 'GET',
    url: "http://api.detourlab.com/search_logs/add.json",
    data: {
      search_log: {
        query: raw_keywords,
        messed_query: keywords
      }
    },
    dataType: 'json'
  });
	
	$('#img_container').css('width','900px').css('margin-top','10px');
	$('#img_container img').css('width','150px').css('float','left');
	$('#main_container').css('padding-left','140px');
	
	var content_desc = document.getElementById('content_desc');
  content_desc.innerHTML = 'Search Results for: <b>'+keywords+'</b>';

	// if($('#content_border').length==0) {
	// 				$('#content_desc').after('<div id="content_border"></div>');
	// 				var border = new WGBorder( $('#content_border') );
	// 			}
	currentKeywords = keywords;
	
  var imageSearch = new google.search.ImageSearch();
  imageSearch.setRestriction(google.search.ImageSearch.RESTRICT_IMAGESIZE,
                             google.search.ImageSearch.IMAGESIZE_MEDIUM);
	var options = new GsearcherOptions();
	var control = new GSearchControl();
  control.setResultSetSize(GSearch.LARGE_RESULTSET);
	control.addSearcher(imageSearch, options);
 	imageSearch.setSearchCompleteCallback(this, this.imageSearchComplete, [imageSearch]);
  imageSearch.execute('"'+keywords+'"');

	var webSearch = new google.search.WebSearch();
  var searchControl = new google.search.SearchControl();
  searchControl.addSearcher(webSearch);
  //      searchControl.addSearcher(new google.search.VideoSearch());
  //      searchControl.addSearcher(new google.search.BlogSearch());
  //      searchControl.addSearcher(new google.search.NewsSearch());
  // searchControl.addSearcher(imageSearch);
  //searchControl.draw(document.getElementById("content2"));
	webSearch.setSearchCompleteCallback(this, this.webSearchComplete, [webSearch]);
  webSearch.execute('"'+keywords+'"');
	
	$('#dynamic_textfield')[0].innerHTML = '';
	$("#input").attr("value","");
}

function messedUp(keywords, mode) {
	var messedUpKeywords = '';

	switch(mode) {
		case 0:// swap 2 letters
			var c1,c2;
			c1 = Math.floor( Math.random()*keywords.length );
			if(c1<keywords.length-1)
				c2 = c1+1;
			else if(c1>0)
				c2 = c1-1;
			for(var i=0; i<keywords.length; i++) {
				if(i==c1)
					messedUpKeywords+=keywords[c2];
				else if(i==c2)
					messedUpKeywords+=keywords[c1];
				else
					messedUpKeywords+=keywords[i];
			}
			break;
		// case 1:// anagram
		// 					messedUpKeywords = anagram(keywords);
		// 					break;
		case 1:// miss 1 letter
			var idx = Math.floor( Math.random()*keywords.length );
			for(var i=0; i<keywords.length; i++) {
				if(i!=idx)
					messedUpKeywords+=keywords[i];
			}
			break;
		case 2:
			messedUpKeywords = keywords;
			break;
	}
	return trim(messedUpKeywords);
}

function anagram(beforeStr) {
	beforeStr = beforeStr.toLowerCase();
	
	aryText = new Array(beforeStr.length);
	len = aryText.length;

	for (i = 0; i < len; i++) {
		aryText[i] = beforeStr.charAt(i);
	}

	newnumber = "";
	temp = "";
	i = 0;

	for (i = 1; i < len; i++) {
		newnumber = (Math.random() * len);
		newnumber = parseInt(newnumber, 10);
		temp = aryText[i];
		aryText[i] = aryText[newnumber];
		aryText[newnumber] = temp;
	}

	NewName = "";
	NewName = aryText.join("");

	return NewName;
}

function trim(s){
  return ( s || '' ).replace( /^\s+|\s+$/g, '' ); 
}


// Main function
var styleElement;
var canvasElement;
var webGraffiti = null;

$(document).ready(function() {
  
	if ($.browser.msie) {
		alert("Current version only works on Chrome, Safari, and Firefox.");
		return;
	}
	
	$('body').removeClass('hidden');
	
	if(webGraffiti==null) {
		webGraffiti = new WGGoogle();
		webGraffiti.init();
		$('center').fadeIn();
		
		var sloppyGoogle = new SloppyGoogle();
		
		$('#search_form').submit(function(e){
			e.preventDefault();
			sloppyGoogle.webResultContainer.empty();
			sloppyGoogle.imageResultContainer.empty();
			
			if ( $('#result_doc_container').hasClass('hidden') ) {
				$('#result_doc_container').removeClass('hidden');
			}
			if ( $('#result_img_container').hasClass('hidden') ) {
				$('#result_img_container').removeClass('hidden');
			}

			$('#footnote').hide().delay(6000).fadeIn(1000);
			sloppyGoogle.submitSearch();
		});
		
		$('#input_luck').hover(
			function(){
				this.value = "Out of Service...";
			},
			function(){
				this.value = "I'm Feeling Lucky";
			}
		).click(function(e){
			e.preventDefault();
		});
	}
});