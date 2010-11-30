function WGUngoogleable() {  
  this.init = function() {
    
  }
  
  this.sketchProc = function(processing) {
    var x, y, width, height, label;
    processing.setup = function(_x,_y,_width,_height,_label){
      x = _x; 
      y = _y; 
      width = _width; 
      height = _height; 
      label = _label;
    }
    processing.draw = function(){

    }
  }
  
  function ungoogleablePost(postStr){
    var post = $('<div class="post" style="color:#F90"></div>');
    var ww = Math.random()*$('body').width();
    var hh = Math.random()*$('body').height();
    console.log("width: "+ww);
    console.log("height: "+hh);
    post.text(postStr).css('position', 'absolute').css('top', hh+'px').css('left', ww+'px').hide();
    $('body').append(post);
    post.fadeIn();
  }
}