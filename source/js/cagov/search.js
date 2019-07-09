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

    var $body = $("body");
    var $specialIcon =
        // setup the tabs
        $('.search-tabs button').on("click", function (e) {
            $(this).siblings().removeClass('active');
            $(this).tab('show').addClass('active');
            e.preventDefault()
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



    //  search box top position
    if (!mobileView()) {
        // taking into account multiple alert banners
        $.each(alertBanner, function () {
            alertbannerHeight += $(this).innerHeight() + 2;
        });
        // calulation search box top position
        var searchtop = headerHeight - utilityHeight - alertbannerHeight + 5;
        if (!mobileView()) {
            searchbox.css({
                'top': Math.max(searchtop, 87)
            });
        }
    } 

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
            searchInput.removeAttr('tabindex aria-hidden');
            searchSubmit.removeAttr('tabindex aria-hidden');
            searchReset.removeAttr('tabindex aria-hidden');
            searchlabel.removeAttr('aria-hidden');

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
        }

        if (featuredsearch) {
            searchInput.removeAttr('tabindex aria-hidden');
            searchSubmit.removeAttr('tabindex aria-hidden');
            searchReset.removeAttr('tabindex aria-hidden');
            searchlabel.removeAttr('aria-hidden');
        }

        if (mobileView() && featuredsearch) { $('.search-container').toggleClass('active'); }

        // let the user know the input box is where they should search
        $("#head-search").addClass('play-animation').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('play-animation');

        });



    });

    // Make Search form tabable if it's featured	
    if ($('#head-search').hasClass('featured-search')) {
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
    }



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




    $('.toggle-search').on('click', function () {
        $('.search-container').toggleClass('active');
        var searchactive = $("#head-search").hasClass("active");
        if (searchactive) {
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
        }
        if (!$('#navigation').hasClass('active')) {
            $('#navigation').addClass('mobile-closed');
        }
    });


    // on alert close event
    $.each(alertClose, function () {
        $(this).on("click", function () {
            searchTop();
        });

    });

});


//  search box top position if browser window is resized
$(window).on('resize', function () {
    searchTop();
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
    // taking into account multiple alert banners
    $.each(alertBanner, function () {
        alertbannerHeight += $(this).innerHeight() + 2;
    });
    // calulation search box top position
    var searchtop = headerHeight - utilityHeight - alertbannerHeight + 5;
    if (!mobileView()) {
        searchbox.css({
            'top': Math.max(searchtop, 87)
        });
    }
}

function mobileView() {
    return $('.global-header .mobile-controls').css('display') !== "none"; // mobile view uses arrow to show subnav instead of first touch
}