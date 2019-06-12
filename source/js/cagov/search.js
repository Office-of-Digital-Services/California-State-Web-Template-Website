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
    var $globalHeader = $('.global-header');
    var searchbox = $(".search-container:not(.featured-search)");
    var headerHeight = $globalHeader.innerHeight();
    var utility = 34;
    var searchtop = headerHeight - utility;

    var $body = $("body");
    var $specialIcon =
        // setup the tabs
        $('.search-tabs button').on("click", function (e) {
            $(this).siblings().removeClass('active');
            $(this).tab('show').addClass('active');
            e.preventDefault()
        });

    // Unfreeze search width when blured.
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

    // have the close button remove search results and the applied classes
    $resultsContainer.find('.close').on('click', removeSearchResults);
    $searchContainer.find('.close').on('click', removeSearchResults);

    // Our special nav icon which we need to hook into for starting the search
    // $('#nav-item-search')

    // Sitecore link data types currently do not have a way to set id's per nav,
    // so instead we are binding to what I'm assuming will aslways be the search
    $('.top-level-nav .nav-item .ca-gov-icon-search, #nav-item-search').parents('.nav-item').on('click', function (e) {
        $searchText.trigger("focus").trigger('focus');
       
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
            searchInput.removeAttr('tabindex');
            searchSubmit.removeAttr('tabindex');
            searchReset.removeAttr('tabindex');
        
        }
        else {
            searchInput.attr('tabindex', "-1");
            searchSubmit.attr('tabindex', "-1");
            searchReset.attr('tabindex', "-1");
        }

       if (featuredsearch) {
            searchInput.removeAttr('tabindex');
            searchSubmit.removeAttr('tabindex');
          searchReset.removeAttr('tabindex');
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
        $searchContainer.removeClass('active');
        $resultsContainer.removeClass('visible');
        $('.ask-group').removeClass('fade-out');
        
        if (!featuredsearch) {
        searchInput.attr('tabindex', "-1");
        searchSubmit.attr('tabindex', "-1");
        searchReset.attr('tabindex', "-1");
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
        if ($('.search-container').hasClass('active')) {
            $('html, body').animate({
                scrollTop: $("#head-search").offset().top
            }, 500);
        }
    });



    // Make Search form tabable if it's featured
    if ($('#head-search').hasClass('featured-search')) {
        searchInput.removeAttr('tabindex');
        searchSubmit.removeAttr('tabindex');
        searchReset.removeAttr('tabindex');
    } else {
        searchInput.attr('tabindex', "-1");
        searchSubmit.attr('tabindex', "-1");
        searchReset.attr('tabindex', "-1");
    }

    //  search box top position
    if (!mobileView()) {
        searchbox.css({
            'top': Math.max(searchtop, 87)
        });
    } 






});

//  search box top position if browser window is resized
$(window).on('resize', function () {
    var $globalHeader = $('.global-header');
    var searchbox = $(".search-container:not(.featured-search)");
    var headerHeight = $globalHeader.innerHeight();
    var utility = 34;
    var searchtop = headerHeight - utility;
    if (!mobileView()) {
        searchbox.css({
            'top': Math.max(searchtop, 87)
        });
    }
});


function mobileView() {
    return $('.global-header .mobile-controls').css('display') !== "none"; // mobile view uses arrow to show subnav instead of first touch
}