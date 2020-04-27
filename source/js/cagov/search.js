/* -----------------------------------------
   SEARCH - /source/js/cagov/search.js
----------------------------------------- */

$(document).ready(function () {
    var $searchContainer = $("#head-search");
    var $searchText = $searchContainer.find(".search-textfield");
    var $resultsContainer = $('.search-results-container');
    var searchInput = $("#head-search #Search .search-textfield");
    var searchSubmit = $("#head-search #Search .gsc-search-button");
    var searchReset = $("#head-search #Search .gsc-clear-button");
    var featuredsearch = $("#head-search").hasClass("featured-search");
    var searchactive = $("#head-search").hasClass("active");
    var searchlabel = $("#SearchInput");
    var $globalHeader = $('.global-header');
    var searchbox = $(".search-container:not(.featured-search)");
    var headerHeight = $globalHeader.innerHeight();
    var utility = $(".utility-header");
    var utilityHeight = utility.innerHeight();
    var alertBanner = $(".alert-banner");
    var alertClose = $(".alert-banner .close");
    var alertbannerHeight = 0;
    var navigationHeight = 0;
    var fullnav = $(".top-level-nav");
    var navsearch = $(".navigation-search");

    var $body = $("body");
    var $specialIcon =
        // setup the tabs
        $('.search-tabs button').on("click", function (e) {
            $(this).siblings().removeClass('active');
            $(this).tab('show').addClass('active');
            e.preventDefault();
        });
    
    // Unfreeze search width when blured.
    $searchText.on('blur focus', function (e) {
        $(this).parents("#head-search").removeClass("focus");
        $(this).parents(".search-container").addClass("focus");
    });

    $searchText.on("change keyup paste", function () {
        if ($(this).val()) {
            addSearchResults();
        }
    });


    if (!featuredsearch) {
        // added aria expaned attr for accessibility
        $("button.first-level-link").attr("aria-expanded", "false");
    }

    //  search box top position
    if (!mobileView()) {
        // taking into account multiple alert banners
        $.each(alertBanner, function () {
            alertbannerHeight += $(this).innerHeight();
        });
        //fullwidth navigation
        if (navsearch.hasClass("full-width-nav")) {
            navigationHeight = 82;
        }
        // calulation search box top position
        var searchtop = headerHeight - utilityHeight - alertbannerHeight - navigationHeight;
        if (!mobileView()) {
            searchbox.css({
                'top': Math.max(searchtop, 82)
            });
        }
    } 

    // have the close button remove search results and the applied classes
    $resultsContainer.find('.close').on('click', removeSearchResults);
    $searchContainer.find('.close').on('click', removeSearchResults);

    // Our special nav icon which we need to hook into for starting the search
    // $('#nav-item-search')
    
    // so instead we are binding to what I'm assuming will aslways be the search
    $('.top-level-nav .nav-item .ca-gov-icon-search, #nav-item-search').parents('.nav-item').on('click', function (e) {
        $searchText.trigger("focus").trigger('focus');
        e.preventDefault();
        // mobile
        if (mobileView() && !$('.search-container').hasClass('active')) {
            $('html, body').animate({
                scrollTop: $("#head-search").offset().top
            }, 500);
        }

        if (!featuredsearch) {
            $('.search-container:not(.featured-search)').toggleClass('active');
        }

        var featuredsearch = $("#head-search").hasClass("featured-search");
        var searchactive = $("#head-search").hasClass("active");
        // hide Search form if it's not active
        if (searchactive) {
            // added aria expanded attr for accessibility
            $(this).find("button").attr("aria-expanded", "true");
            $searchContainer.removeAttr('aria-hidden');
            searchInput.removeAttr('tabindex aria-hidden');
            searchSubmit.removeAttr('tabindex aria-hidden');
            searchReset.removeAttr('tabindex aria-hidden');
            searchlabel.removeAttr('aria-hidden');
            
        
        }
        else {
            // added aria expaned attr for accessibility
            $(this).find("button").attr("aria-expanded", "false");
            searchInput.attr({
                "tabindex": '-1',
                "aria-hidden": 'true'
            });
            searchSubmit.attr({
                "tabindex": '-1',
                "aria-hidden": 'true'
            });
            searchReset.attr({
                "tabindex": '-1',
                "aria-hidden": 'true'
            });
            searchlabel.attr({
                "aria-hidden": 'true'
            });
            $searchContainer.attr("aria-hidden", "true");
        }

       if (featuredsearch) {
           searchInput.removeAttr('tabindex aria-hidden');
           searchSubmit.removeAttr('tabindex aria-hidden');
           searchReset.removeAttr('tabindex aria-hidden');
           searchlabel.removeAttr('aria-hidden');
           $searchContainer.removeAttr('aria-hidden');
        }

        if (mobileView() && featuredsearch) { $('.search-container').toggleClass('active');}

        // let the user know the input box is where they should search
        $("#head-search").addClass('play-animation').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('play-animation');

        });



    });

    // SEE navitgation.js for mobile click handlers

    // Close search when close icon is clicked
    $('.close-search').on('click', removeSearchResults);

    // Helpers
    function addSearchResults() {
        $body.addClass("active-search");
        //$searchContainer.addClass('active');
        //$resultsContainer.addClass('visible');
        // close the the menu when we are search
        //$('#navigation').addClass('mobile-closed');
        // hide the ask group as well
       // $('.ask-group').addClass('fade-out');

        // fire a scroll event to help update headers if need be
       // $(window).scroll();

       // $.event.trigger('cagov.searchresults.show');
    }

    function removeSearchResults() {
        $body.removeClass("active-search");
        $searchText.val('');
        $searchContainer.removeClass('active').attr("aria-hidden", "true");
        $resultsContainer.removeClass('visible');
        $('.ask-group').removeClass('fade-out');
        
        if (!featuredsearch) {
            // added aria expaned attr for accessibility
            $("button.first-level-link").attr("aria-expanded", "false");
            searchInput.attr({
                "tabindex": '-1',
                "aria-hidden": 'true'
            });
            searchSubmit.attr({
                "tabindex": '-1',
                "aria-hidden": 'true'
            });
            searchReset.attr({
                "tabindex": '-1',
                "aria-hidden": 'true'
            });
            searchlabel.attr({
                "aria-hidden": 'true'
            });
        }
        // fire a scroll event to help update headers if need be
        $(window).scroll();

        $.event.trigger('cagov.searchresults.hide');

        if (mobileView()) {
            $('html, body').animate({ scrollTop: 0 }, "slow");
        }
    }

    // Mobile Search toggle
    $('.toggle-search').on('click', function () {
        $('.search-container').toggleClass('active');
        var searchactive = $("#head-search").hasClass("active");
        if (searchactive) {
            $searchContainer.removeAttr('aria-hidden');
            searchInput.removeAttr('tabindex aria-hidden');
            searchSubmit.removeAttr('tabindex aria-hidden');
            searchReset.removeAttr('tabindex aria-hidden');
            searchlabel.removeAttr('aria-hidden');
            $searchText.trigger("focus").trigger('focus');
             $('html, body').animate({
                    scrollTop: $("#head-search").offset().top
                }, 500);
            
        }
        else {
            searchInput.attr({
                "tabindex": '-1',
                "aria-hidden": 'true'
            });
            searchSubmit.attr({
                "tabindex": '-1',
                "aria-hidden": 'true'
            });
            searchReset.attr({
                "tabindex": '-1',
                "aria-hidden": 'true'
            });
            searchlabel.attr({
                "aria-hidden": 'true'
            });
            $searchContainer.attr("aria-hidden", "true");
        }
    });



    // Make Search form tabable if it's featured
    if ($('#head-search').hasClass('featured-search')) {
        $searchContainer.removeAttr('aria-hidden');
        searchInput.removeAttr('tabindex aria-hidden');
        searchSubmit.removeAttr('tabindex aria-hidden');
        searchReset.removeAttr('tabindex aria-hidden');
        searchlabel.removeAttr('aria-hidden');
    } else {
        searchInput.attr({
            "tabindex": '-1',
            "aria-hidden": 'true'
        });
        searchSubmit.attr({
            "tabindex": '-1',
            "aria-hidden": 'true'
        });
        searchReset.attr({
            "tabindex": '-1',
            "aria-hidden": 'true'
        });
        searchlabel.attr({
            "aria-hidden": 'true'
        });
        $searchContainer.attr("aria-hidden", "true");
    }



    // on alert close event
    $.each(alertClose, function () {
        $(this).on("click", function () {
            searchTop();
        });
        
    });
    

}); 


// Calculation search box top property on the scroll for the fixed nav
$(window).on('scroll', function () {
    var currentScrollTop = $(document).scrollTop();
    var scrollDistanceToMakeCompactHeader = 220;

    if (currentScrollTop >= scrollDistanceToMakeCompactHeader) {

        if (!mobileView()) {

            // setting timeout before calculating the search box top property otherwise it can take into account transitional values.
            setTimeout(function () {
                var searchlabel = $("#SearchInput");
                var $globalHeader = $('.global-header');
                var searchbox = $(".search-container:not(.featured-search)");
                var headerHeight = $globalHeader.innerHeight();
                var utility = $(".utility-header");
                var utilityHeight = utility.innerHeight();
                var alertBanner = $(".alert-banner");
                var alertClose = $(".alert-banner .close");
                var alertbannerHeight = 0;
                var fullnav = $(".top-level-nav");
                var navsearch = $(".navigation-search");
                // taking into account multiple alert banners
                $.each(alertBanner, function () {
                    alertbannerHeight += $(this).innerHeight();
                });
                // Full width navigation
                if (navsearch.hasClass("full-width-nav")) {
                    navigationHeight = 82;
                }
                else { navigationHeight = 0; }
                // calulation search box top position
                var searchtopscroll = headerHeight - utilityHeight - alertbannerHeight - navigationHeight;
                searchbox.css({ 'top': Math.max(searchtopscroll, 55) });
            }, 400);



        }
    }
    else if (currentScrollTop <= scrollDistanceToMakeCompactHeader) {
        if (!mobileView()) {
            setTimeout(function () {
                searchTop();
            }, 400);

        }
    }
});



//  search box top position if browser window is resized
$(window).on('resize', function () {
    searchTop();
    ariaHidden();
});


function searchTop() {
    var searchlabel = $("#SearchInput");
    var $globalHeader = $('.global-header');
    var searchbox = $(".search-container:not(.featured-search)");
    var headerHeight = $globalHeader.innerHeight();
    var utility = $(".utility-header");
    var utilityHeight = utility.innerHeight();
    var alertBanner = $(".alert-banner");
    var alertClose = $(".alert-banner .close");
    var alertbannerHeight = 0;
    var fullnav = $(".top-level-nav");
    var navsearch = $(".navigation-search");
    // taking into account multiple alert banners
    $.each(alertBanner, function () {
        alertbannerHeight += $(this).innerHeight();
    });
    // Full width navigation
    if (navsearch.hasClass("full-width-nav")) {
        navigationHeight = 82;
    }
    else {navigationHeight = 0;}
    // calulation search box top position
    var searchtop = headerHeight - utilityHeight - alertbannerHeight - navigationHeight;
    if (!mobileView()) {
        
        searchbox.css({
            'top': Math.max(searchtop, 55)
        });
    }
}

function ariaHidden() {
    var $searchContainer = $("#head-search");
    var featuredsearch = $("#head-search").hasClass("featured-search");
    if (featuredsearch) {
        $searchContainer.removeAttr('aria-hidden');
    }
    else {
        $searchContainer.attr("aria-hidden", "true");
    }

}

function mobileView() {
    return $('.global-header .mobile-controls').css('display') !== "none"; // mobile view uses arrow to show subnav instead of first touch
}