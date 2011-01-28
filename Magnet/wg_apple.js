function WGApple() {
  var msgForApple = [ "We Luv Apple", "But We Luv Freedom More", "Open IOS!!"];
  
  this.init = function() {
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
  
  this.sketchProc = function(processing) {
    
  }
  
  function graffitiNewsLink() {
    var graffiti_link = $('#graffiti-news-link');
    var currentMsg = graffiti_link.html();
    if(currentMsg==msgForApple[0])
      graffiti_link.hide().html(msgForApple[1]).fadeIn();
    else if(currentMsg==msgForApple[1])
      graffiti_link.hide().html(msgForApple[2]).fadeIn();
    else
      graffiti_link.hide().html(msgForApple[0]).fadeIn();
  }
}