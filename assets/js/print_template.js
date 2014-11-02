(function ( $ ) {
  $.fn.print_template = function( options ) {
    // Element
    var element = $(this)
    
    
    // Plugin Methods
    var methods = {
      toArray: function(e){
        var elementIMG = $(element).find("img"),
            realWidth = parseInt($(elementIMG).attr("data-width")),
            realHeight = parseInt($(elementIMG).attr("data-height")),
            width = parseInt($(elementIMG).css("width")),
            height = parseInt($(elementIMG).css("height")),
            ratioH = realHeight/height,
            ratioW = realWidth/width,
            array = []
        $(element).find('.draggable').each(function(obj) {
          array.push({id: $(this).attr('id'),
                      caption: $(this).text(),
                      top: Math.ceil(parseInt($(this).css('top'))*ratioH),
                      left: Math.ceil(parseInt($(this).css('left'))*ratioW),
                      width: Math.ceil(parseInt($(this).css('width'))*ratioW),
                      // height: Math.ceil(parseInt($(this).css('height'))*ratioH)
                      })
        })
        return array
      }
    }
    
    if ( methods[options] ) {
      return methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }
    
    // Defaults
    var settings = $.extend({
      img: "",
      objects: []
    }, options );
    
    
    // Functions
    function init() {
      var elementBody = $("<div class='container-fliud'><div class='row'><div class='col-md-12'><img class='img-responsive' src='" + settings.img + "'/></div></div></div>")
      var elementIMG = $(elementBody).find('img')
      for (i=0; i<settings.objects.length; i++) {
        var obj = settings.objects[i]
        var objElement = $("<div class='draggable' id='" + obj.id + "'><div class='handle left'></div><div class='content'>" + obj.caption + "</div><div class='handle right'></div></div>")
        // $(objElement).css('top', i*parseInt($(objElement).css("height")))
        $(objElement).insertAfter(elementIMG)
      }
      $(element).html(elementBody)
      $(elementIMG).css('width', '100%')
      $(elementBody).find('.col-md-12')
                    .css('padding', '0px')
                    .css('margin', '0px')
      
      $("<img/>") // Make in memory copy of image to avoid css issues
          .attr("src", settings.img)
          .load(function() {
              $(elementIMG).attr("data-width", this.width)
              $(elementIMG).attr("data-height", this.height)
              
              var realWidth = this.width,
                  realHeight = this.height,
                  width = parseInt($(elementIMG).css("width")),
                  height = parseInt($(elementIMG).css("height")),
                  ratioH = height/realHeight,
                  ratioW = width/realWidth
              for (i=0; i<settings.objects.length; i++) {
                var obj = settings.objects[i]
                if (obj.left){
                  $(element).find("#" + obj.id).css("left", Math.ceil(obj.left*ratioW))
                }
                if (obj.top){
                  $(element).find("#" + obj.id).css("top", Math.ceil(obj.top*ratioH))
                }
                if (obj.width){
                  $(element).find("#" + obj.id).css("width", Math.ceil(obj.width*ratioH))
                }
                // if (obj.height){
                  // $(element).find("#" + obj.id).css("height", Math.ceil(obj.height*ratioH))
                // }
              }
          });
    }
    
    // Events
    function event_drag() {
      $(element).on("mousedown", ".draggable .content", function(e){
        // Current drag element
        var drag = $(this)
        
        var z_idx = $(drag).css('z-index'),
            drg_h = $(drag).outerHeight(),
            drg_w = $(drag).outerWidth(),
            pos_y = $(drag).offset().top + drg_h - e.pageY,
            pos_x = $(drag).offset().left + drg_w - e.pageX;
        
        $(document).on("mousemove", function(e){
          $(drag).parent().addClass("grabbing")
          $(drag).parent().offset({
            top:e.pageY + pos_y - drg_h,
            left:e.pageX + pos_x - drg_w
          }).on("mouseup", function() {
            $(document).off("mousemove")
            $(drag).parent().removeClass("grabbing")
          });
          
        })
        
        // prevent from selection
        e.preventDefault()
      }).on("mouseup", function(e){
        $(document).off("mousemove")
        $(this).removeClass('grabbing')
      });
    }
    function event_resize() {
      $(element).on("mousedown", ".draggable .handle", function(e){
        // Current drag element
        var drag = $(this).parent(),
            handle = $(this)
        var pointX = e.pageX,
            pointY = e.pageY;
        
        $(document).on("mousemove", function(e){
          if ($(handle).hasClass('right')){
            if (e.pageX > pointX) {
              $(drag).css("width", $(drag).width()-(pointX - e.pageX))
            } else {
              $(drag).css("width", $(drag).width()+(e.pageX - pointX))
            }
          } else {
            // posX = $(drag).position().x
            if (e.pageX < pointX) {
              var diff = pointX - e.pageX
              $(drag).css('left', '-='+diff).css("width", $(drag).width()+diff)
              
            } else {
              var diff = e.pageX - pointX
              $(drag).css('left', '+='+diff).css("width", $(drag).width()-diff)
            }
          }
          pointX = e.pageX;
          pointY = e.pageY;
        })
        
        // prevent from selection
        e.preventDefault()
      }).on("mouseup", function(){
        $(document).off("mousemove")
      });
    }
    function attach_events() {
      event_drag()
      event_resize()
    }
    
    // Runtime
    init()
    attach_events()
  }
}( jQuery ));
