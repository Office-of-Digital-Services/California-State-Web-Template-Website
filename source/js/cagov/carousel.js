/* -----------------------------------------
   CAROUSEL INIT - /source/js/cagov/carousel.js
----------------------------------------- */

$(document).ready(function () {

    $(".carousel-video").initCAVideo();
    $('.carousel-content').each(initContent);

    // Owl Carousel https://github.com/OwlFonk/OwlCarousel2 Requires Owl Carousel
    // 2.0.3+ Banner Carousel Plugin
    (function ($) {
        $.fn.owlBannerCarousel = function (options) {
            var settings = $.extend({
                delay: 4000,
                smallSearch: true
            }, options);

            return this.each(function () {
                if (settings.smallSearch) {
                    $('.navigation-search').addClass('small-search');
                }

                var headerSlider = $('.header-slideshow-banner');
                headerSlider.addClass('enabled');

                // calculate top of screen on next repaint
                window.setTimeout(function () {
                    var MAXHEIGHT = 450;
                    var headerTop = headerSlider.offset().top;
                    var windowHeight = $(window).height();
                    var height = windowHeight - headerTop;
                    height = (height > MAXHEIGHT)
                        ? MAXHEIGHT
                        : height;
                    // fill up the remaining heaight of this device
                    headerSlider.css({'height': height});
                }, 0)

                var $this = $(this);

                // If browser is IE9 and below set transition speed to 0
                var transitionSpeed = (!$('html').hasClass('oldie'))
                    ? 250
                    : 0;

                // Initiate carousel
                $this.owlCarousel({
                    //responsiveRefreshRate: 0,
                    items: 1,
                    smartSpeed: transitionSpeed,
                    animateOut: 'fadeOut',
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: settings.delay,
                    autoplayHoverPause: false,
                    mouseDrag: false,
                    touchDrag: false,
                    pullDrag: false,
                    pagination: true,
                    dotsClass: 'banner-pager', dotClass: 'banner-control',
                    dotsContainer: false
                });

                // Add pause and play buttons
                var owlBannerControl = $('<div class="banner-play-pause"><div class="banner-control"><button class="play ca-gov-icon-carousel-play" aria-hidden="true"></button><button class="pause ca-gov-icon-carousel-pause" aria-hidden="true"></span></div></div>');
                $this.append(owlBannerControl); 
                var playControl = owlBannerControl.find('.play').hide(); 
                var pauseControl = owlBannerControl.find('.pause'); 
                playControl.on('click', function() {
                $(this).hide();   $(this).parent().removeClass('active');
                pauseControl.show();   $this.trigger('play.owl.autoplay', [settings.delay]);
                $this.owlCarousel('next'); // Manually play next since autoplay waits for delay
                });
                
                pauseControl.on('click', function() {   $(this).hide();
                $(this).parent().addClass('active');   playControl.show();
                $this.trigger('stop.owl.autoplay'); });
                
                // Number the items in .banner-pager 
                var dots = $('.banner-pager .banner-control');
                dots.each(function () {
                $(this).find('span').append($(this).index() + 1); });
            });
        }
    }(jQuery));

    // Banner Carousel Init
    $("body .carousel-banner").owlBannerCarousel();
    // Init with options: $(".banner-carousel").owlBannerCarousel({delay: 4000,
    // smallSearch:true});

    if ($.fn.owlCarousel) {
        // Media Carousel Init
        $(".carousel-media").owlCarousel({

            // all these callbacks are to make sure any js inside carousl items can refresh
            // themselves
            onResized: function () {
                window.setTimeout(function () {
                    $(window).trigger('resize');
                }, 0)
            },
            onDragged: function () {
                window.setTimeout(function () {
                    $(window).trigger('resize');
                }, 0)
            },
            onTranslated: function () {
                window.setTimeout(function () {
                    $(window).trigger('resize');
                }, 0)
            },
            responsive: true,
            margin: 10,
            nav: true,
            loop: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                400: {
                    items: 2
                },
                700: {
                    items: 3,
                    nav: true
                },
                1000: {
                    items: 4,
                    nav: true
                }
            },
            navText: [
                '<span class="ca-gov-icon-arrow-prev" aria-hidden="true"></span></span><span class="sr-only">Previous</span>', '<span class="ca-gov-icon-arrow-next" aria-hidden="true"></span><span class="sr-only">Next</span>'
            ],
            dots: false
        });

        // Link Icon Carousel Init
        $(".carousel-link").owlCarousel({
            margin: 25,
            autoWidth: true,
            nav: true,
            navText: [
                '<span class="ca-gov-icon-arrow-prev" aria-hidden="true"></span></span><span class="sr-only">Previous</span>', '<span class="ca-gov-icon-arrow-next" aria-hidden="true"></span><span class="sr-only">Next</span>'
            ],
            dots: false
        });

        // Social Media Slider Init
        $(".carousel-slider").owlCarousel({
            items: 1,
            nav: true,
            navText: [
                '<span class="ca-gov-icon-arrow-prev" aria-hidden="true"></span></span><span class="sr-only">Previous</span>', '<span class="ca-gov-icon-arrow-next" aria-hidden="true"></span><span class="sr-only">Next</span>'
            ],
            dots: false
        });

        // Gallery Image Slider
        $(".carousel-gallery").owlCarousel({
            items: 1,
            nav: true,
            navText: [
                '<span class="ca-gov-icon-arrow-prev" aria-hidden="true"></span></span><span class="sr-only">Previous</span>', '<span class="ca-gov-icon-arrow-next" aria-hidden="true"></span><span class="sr-only">Next</span>'
            ],
            dots: false
        });

    }
});

function initContent() {
    var carousel = $(this);
    $(window).on("load", function () {
        carousel.owlCarousel({
            items: 1,
            autoHeight: true,
            loop: true,
            nav: true,
            navText: [
                '<span class="ca-gov-icon-arrow-prev" aria-hidden="true"></span></span><span class="sr-only">Previous</span>', '<span class="ca-gov-icon-arrow-next" aria-hidden="true"></span><span class="sr-only">Next</span>'
            ],
            dots: true,
            // all these callbacks are to make sure any js inside carousl items can refresh
            // themselves
            onResized: function () {
                window.setTimeout(function () {
                    $(window).trigger('resize');
                }, 0)
            },
            onDragged: function () {
                window.setTimeout(function () {
                    $(window).trigger('resize');
                }, 0)
            },
            onTranslated: function () {
                window.setTimeout(function () {
                    $(window).trigger('resize');
                }, 0)
            }
        });

        // Add text to the dots 
        var dot = $('.owl-dots .owl-dot');
        dot.each(function () {
            $(this).find('span').html("<span class='sr-only'>Change Slide</span>");
        });


        carousel.on('changed.owl.carousel', function (event) {
            setTimeout(function () {
                carousel.find('.owl-item.active .item video').each(function () {

                    $(this).get(0).play();
                })
            }, 10)

        })
    })
}

(function($) {

    $.fn.initCAVideo = function(bool) {


        // Iterate over each object in collection
        return this.each( function() {

            var carousel = $(this);
            var didSet = carousel.attr("data-loaded");

            if (didSet) {
                return;
            }
            carousel.attr("data-loaded", "true");
                // get first video
                var vidHref = carousel.find('.item a').first().attr('href') || "";
                var vidID = vidHref.split("?v=").pop();

                var mainIndex = 0;


                var length = carousel.find('.item').length;

                // Video  Slider
                carousel.owlCarousel({
                    items: 1,
                    loop: false,
                    nav: true,
                    lazyLoad: false,
                    video: true,
                    navText: [
                        '<span class="ca-gov-icon-arrow-prev" aria-hidden="true"></span></span><span class="sr-only">Previous</span>', '<span class="ca-gov-icon-arrow-next" aria-hidden="true"></span><span class="sr-only">Next</span>'
                    ],
                    dots: false
                });

                carousel.on('translated.owl.carousel', function(event) {

                  // get current video id
                  vidID = carousel.find('.owl-item.active')
                            .attr('data-video').split(/\?v=|\/v\//).pop();
                    setCurrentSubVideo();

                  mainIndex = event.item.index;
                    // show the item in view
                    submenu.trigger('to.owl.carousel', [ mainIndex, 300, true ] )
             });


                //  create the proper video play icon for each video image preview
                carousel.find('.owl-video-play-icon').append($('<span class="ca-gov-icon-play" />'));

                // create the overlay for each video image preview
                carousel.find('.owl-video-tn').after($('<div />').addClass('item-overlay'));

                // the submenu lives as a sibling to the carousel.
                var submenu = $('<div></div>').insertAfter(carousel);
                submenu.addClass('carousel owl-carousel carousel-video-submenu');

                // create the sub menu for the videos
                var items = carousel.find('a.owl-video');
            items.each(function (index) {
                // get this slide and its video url
                var oldItem = $(this);
                var href = oldItem.attr('href');
                var theHTML = oldItem.find('span'); // Getting title span
                // attach the triggers for each thumbnail
                var item = $('<div/>').addClass('item-thumbnail');
                item.on('click', function () {
                    //  force the main carousel to jump to the requested video
                    carousel.trigger('to.owl.carousel', [
                        index % length,
                        300,
                        true
                    ]);

                    submenu.find('.watching').removeClass('watching');
                    $(this).parents('.owl-item').addClass('watching');

                    //  start playing immediately
                    carousel.find(".active .owl-video-play-icon").trigger("click");
                });

                // thumbnail related
                var regex = new RegExp('ab+c', 'i');
                var youtubeID = href.split(/\?v=|\/v\//).pop();
                var youtubeThumb = 'url(http://img.youtube.com/vi/' + youtubeID + '/0.jpg )';
                // var youtubeThumb = 'http://img.youtube.com/vi/' + youtubeID + '/0.jpg ';
                var thumbnail = $('<button />').css('background-image', youtubeThumb).addClass("videoThumb").append(theHTML); // Adding title span to the thumbnail

                    // var thumbnail = $('<img />').attr('src', youtubeThumb);

                    // overlay related
                    var overlay = $('<div />').addClass('item-overlay');
                    overlay.append($('<span class="ca-gov-icon-play" />'))

                    // Append it into the DOM
                    item.append(thumbnail).append(overlay);
                    submenu.append(item);
                });

                submenu = carousel.next();

                  submenu.on('initialized.owl.carousel', function() {
                    setCurrentSubVideo();
                  });

                // have owlCarousel init this submenu
                submenu.owlCarousel({
                    items: 4,
                    loop: false,
                    nav: true,
                    margin: 20,
                    dots: false,
                    navText: ['<span class="ca-gov-icon-arrow-prev" aria-hidden="true"></span><span class="sr-only">Previous</span>', '<span class="ca-gov-icon-arrow-next" aria-hidden="true"></span><span class="sr-only">Next</span>']
                });


              submenu.on('changed.owl.carousel', function() {
                setTimeout(setCurrentSubVideo, 50);
              });

              function setCurrentSubVideo() {
                // remove old watched item
                submenu.find('.watching').removeClass('watching');

                // submenu.find('img[src*="' + vidID + '"]').parents('.owl-item').addClass('watching');
                  submenu.find('button[style*="' + vidID + '"]').parents('.owl-item').addClass('watching');


              }

        });
    }
}(jQuery));
