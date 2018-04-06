/* -----------------------------------------
   SEARCH - /js/search.js
----------------------------------------- */

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-3419582-2']); // Step 4: your google analytics profile code, either from your own google account, or contact eServices to have one set up for you
_gaq.push(['_gat._anonymizeIp']);
_gaq.push(['_setDomainName', '.ca.gov']);
_gaq.push(['_trackPageview']);

_gaq.push(['b._setAccount', 'UA-3419582-2']); // statewide analytics - do not remove or change
_gaq.push(['b._setDomainName', '.ca.gov']);
_gaq.push(['b._trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' === document.location.protocol ? 'https://ssl' :
      'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

// Google Custom Search 

(function () {

    window.__gcse = {
        callback: myCallback
    };

    function myCallback() {
        var $searchContainer = $("#head-search");
        var $searchText = $searchContainer.find(".gsc-input");
        var $resultsContainer = $('.search-results-container');
        var $body = $("body");

        // search icon is added before search button (search button is set to opacity 0 in css)
        $("input.gsc-search-button").before("<span class='ca-gov-icon-search search-icon' aria-hidden='true'></span>");
        $("button.gsc-search-button").before("<span class='ca-gov-icon-search search-icon' aria-hidden='true'></span>");

        $searchText.on("click", function () {
            addSearchResults();
            $searchContainer.addClass("search-freeze-width");
        });

        $searchText.on("blur", function () {
            $searchContainer.removeClass("search-freeze-width");

        });

        // Close search when close icon is clicked
        $('div.gsc-clear-button').on('click', function () { removeSearchResults(); });

        //	$('.gsc-search-button').innerHTML

        $('.top-level-nav .nav-item .ca-gov-icon-search, #nav-item-search').parents('.nav-item').on('click', function (e) {
            $searchText.focus().trigger('focus')

            // let the user know the input box is where they should search
            $(".primary #head-search").addClass('play-animation').one(
            'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
            function () {
                $(this).removeClass('play-animation');

            });


        });


        // Helpers
        function addSearchResults() {
            $body.addClass("active-search");
            $searchContainer.addClass('active');
            $resultsContainer.addClass('visible');
            // close the the menu when we are search
            $('#navigation').addClass('mobile-closed');
            // fire a scroll event to help update headers if need be
            $(window).on('scroll');

            $.event.trigger('cagov.searchresults.show');
        }

        function removeSearchResults() {
            $body.removeClass("active-search");
            $searchContainer.removeClass('active');
            $resultsContainer.removeClass('visible');


            // fire a scroll event to help update headers if need be
            $(window).on('scroll');

            $.event.trigger('cagov.searchresults.hide');
        }

    }


})();
