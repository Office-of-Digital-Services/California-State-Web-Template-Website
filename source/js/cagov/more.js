$(document).ready(function () {
    // apply classes programmatically after user interaction for toggle-more
    //elements
    $('.toggle-more').toggleMore();


    $('[data-ajax-target]').each(initLoad);

    var $viewport = $('html, body');

    $(".explore-invite").on('click', function (e) {
        e.preventDefault();
        var extraHeight = $('header.fixed').height();
         $viewport.animate({
            scrollTop: $(".main-primary").offset().top - extraHeight
        }, 2000);

        // Stop the animation if the user scrolls
        $(document).one("scroll mousedown DOMMouseScroll mousewheel keyup touchstart", function(e){
            if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"  || e.type == 'touchstart'){
                 $viewport.stop();
            }
        });
    });


});

(function($) {

    $.fn.toggleMore = function(bool) {

      /**
       * Helper for setting required attrs and class
       */
      function expanded($this, bool) {
          if (bool) {
              $this.addClass('active').attr('aria-expanded', 'true');
          } else {
              $this.removeClass('active').attr('aria-expanded', 'false');
          }
      }

        // Iterate over each object in collection
        return this.each( function() {

            // Save a reference to the element

            var $this = $(this);
            if (bool !== undefined) {
                bool ? expanded($this, true) : expanded($this, false);

            } else {
                // init classes and state
                $this.hasClass('active')
                    ? expanded($this, true)
                    : expanded($this, false);
            }

  
            $this.off("click.cagovmore");
            $this.on("click.cagovmore", function () {
                $this.hasClass('active')
                    ? expanded($this, false)
                    : expanded($this, true);
            });

        });
    }
}(jQuery));




// TODO: readd this back in
function makeBlur($el) {
    $el.Vague({intensity: 6}).blur();
}


function initLoad() {
    var $moreBtn = $(this);
    var htmlURL = $moreBtn.attr('data-ajax-target');
    var elTarget = $moreBtn.attr('data-container-target');
    var moreContents = $moreBtn.find('.more-content');
    var isTest = $moreBtn.attr('data-ajax-test');
    makeBlur(moreContents);
    function loadMore(url) {
        $(moreContents).load(url, function (response, status, xhr) {
          var linkHeader = xhr.getResponseHeader("Link");
          if(isTest) {
            return;
          }
          if ((status == "error" || linkHeader == null)) {
              $moreBtn.animate({
                  'opacity': 0,
                  'height': 0
              }, 300, 'linear');
          } else {
              htmlURL = linkHeader.match(/<(.*?)>/)[1];
          }
      });
    }


    loadMore(htmlURL);

    $moreBtn.on('click', function (e) {
        e.preventDefault();
        $(moreContents).children().hide().appendTo(elTarget).fadeIn(1000)
        $(elTarget).trigger('more.new');
        loadMore(htmlURL);
    })
}
