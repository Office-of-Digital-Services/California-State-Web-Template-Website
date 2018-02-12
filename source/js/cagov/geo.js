$(document).ready(function () {


    var displayCities = $('.located-city-name');

    $('.geo-lookup').on('click', function (e) {
        e.preventDefault();
        var currentCookie = getCookie("cagov__geo");

        if (currentCookie) {
            displayCities.html('Enter ZIP');
            errorCase();
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunc, errorCase);
        } else {
            errorCase();
        }
    });

    $('.clear-geo').on('click', function (e) {
        e.preventDefault();

        if (typeof location.origin === 'undefined')
            location.origin = location.protocol + '//' + location.host;

        document.cookie = "cagov__geo=;path=/"
        displayCities.html('Set Location');
        $("#locationSettings").collapse("hide")
    })


    function errorCase() {

        var windowWidth = $(window).width();
        // our mobile breakpoint
        if (windowWidth < 767) {
            $('html, body').animate({
                scrollTop: 0
            }, 450);
        }
        // Show a zipcode input
        $("#locationSettings").collapse("show")
        var $input = $("#locationSettings").find('input');
        var $btn = $("#locationSettings").find('button');
        // and we prepare our input for user events
        $input.on("keypress", function (e) {
            if (e.which == 13) {
                lookByZIP.call(this, e);
                return false; //<---- Add this line
            }

        });

        $btn.on('click', function (e) {
            e.preventDefault();

            lookByZIP.call($input, e);

        })

    }


    function lookByZIP(e) {
        var zip = $(this).val();

        displayCities.html('Geo Locating...');

        var ajax = $.get(window.__getLocation + '?zip=' + zip);

        ajax.done(dataSuccess);

        ajax.fail(function () {
            displayCities.html('Not Found');
        })

    }

    function successFunc(pos) {
        var newLoc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            time: pos.timestamp
        };

        displayCities.html('Geo Locating...');

        var ajax = $.get(window.__getLocation + '?lat=' + newLoc.lat + '&lng=' + newLoc.lng)

        ajax.done(dataSuccess);

        ajax.fail(function () {
            errorCase();
            displayCities.html('Enter ZIP');
        })

    }

    function dataSuccess(data) {
        var city = data["rows"][0][0];
        //var zipcode = data["rows"][0][1];
        var region = data["rows"][0][2];

        window._cagov_newlat = data["rows"][0][3];
        window._cagov_newlng = data["rows"][0][4];


        $("#locationSettings").collapse("hide");
        displayCities.html(city);

        $("[data-locations-landing],[data-locations]").first().loadMapThat();


        $(".header-single-banner").each(function () {
            var imageAjax = $.get(window.__getImageByLocation);
            imageAjax.done(function (image) {
                var newBg = 'url("' + image + '")';
                var oldBg = $(".header-single-banner").css('background-image');
                if (newBg !== oldBg) {
                    if ($(window).width() <= 767) {
                        $(".ask-group").fadeOut('3000', function () {

                            $(this).css('background-image', 'url(' + image + ')').fadeIn('3000');


                        });
                        $(".header-single-banner").css('background-image', 'url(' + image + ')')
                    } else {
                        $(".header-single-banner").fadeOut('3000', function () {

                            var bgImg = $(this).css('background-image', 'url(' + image + ')').fadeIn('3000', function () {
                                $(this).css("display", '');
                            })

                        });

                        $(".ask-group").css('background-image', 'url(' + image + ')')
                    }
                }
            });
        });

    }

    function getCookie(sKey) {
        if (!sKey) {
            return null;
        }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    }


    function hasCookie(sKey) {
        if (!sKey) {
            return false;
        }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }

});
