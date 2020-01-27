/* -----------------------------------------
   PARALLAX EFFECT
   /source/js/cagov/parallax.js
----------------------------------------- */

(function ($) {

    $.fn.parallax = function (options) {

        var windowHeight = $(window).height();

        // Establish default settings
        var settings = $.extend({
            speed: 0.3
        }, options);

        // Iterate over each object in collection
        return this.each(function () {

            // Save a reference to the element
            var $this = $(this);

            // Init proper heights
            var bg_height = ($(window).outerHeight() * settings.speed) + $this.innerHeight();
            $this.css({ 'height': bg_height });

            // Set up Scroll Handler
            $(window).scroll(function () {
                var element_top = $this.offset().top,
                    window_top = $(window).scrollTop(),
                    y_pos = (((window_top + $(window).innerHeight()) - element_top) * settings.speed),
                    main_position;

                main_position = 'translate(0, ' + y_pos + 'px)';

                $this.css({
                    '-webkit-transform': main_position,
                    '-moz-transform': main_position,
                    '-ms-transform': main_position,
                    'transform': main_position
                });
            });
            // $(window).scroll();

        });
    };
}(jQuery));

$('.parallax-bg').parallax();
