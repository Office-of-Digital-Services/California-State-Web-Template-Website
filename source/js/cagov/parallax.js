/* -----------------------------------------
   PARALLAX EFFECT
   /source/js/cagov/parallax.js
----------------------------------------- */

var parallaxElements = $('.parallax-bg'),
    parallaxQuantity = parallaxElements.length;

$(window).on('scroll', function () {
    window.requestAnimationFrame(function () {
        for (var i = 0; i < parallaxQuantity; i++) {
            var currentElement = parallaxElements.eq(i);
            var scrolled = $(window).scrollTop();

            currentElement.css({
                transform: 'translate3d(0,' + scrolled * -0.3 + 'px, 0)'
            });
        }
    });
});
