/* -----------------------------------------
   HEADER - /source/js/cagov/header.js
----------------------------------------- */
//------------------------------------------------------------- v5 ----------------------------------------- * need to consolidate .header-single-banner with header-large-banner,
$(document).ready(function () {
    var $headerImage = $('.header-single-banner, .header-large-banner, .header-primary-banner');
	var $headerLarge = $('.header-large-banner');
	var $primaryBanner = $('.header-primary-banner');
    var windowHeight = $(window).height();
    var $header = $('header');



    var $askGroup = $('.ask-group');

    var $headSearch = $('#head-search');

// Beta 5 Changes please incorporate into source files

    $askGroup.addClass('in');
    $headSearch.addClass('in');


    // setting up global variables for header functions
    window.headerVars = {
        MOBILEWIDTH: 767,
        MAXHEIGHT: 1200,
        MINHEIGHT: 500,
        setHeaderImageHeight: function () {
            if ($headerImage.length === 0) {
                return;
            }
			
            var height = windowHeight;
            height = Math.max(Math.min(height, headerVars.MAXHEIGHT), headerVars.MINHEIGHT);
			
			var headerTop = $headerImage.offset().top;
			
            $headerImage.css({'height': height - $header.height()});
            headerImageHeight = $headerImage.height();		
							
			$headerLarge.css({'height': height - headerTop});
            headerImageHeight = $headerLarge.height();		
			
			$primaryBanner.css({'height': 450 });

// Beta v5 Changes please incorporate into source files	

	
        }
    };

    headerVars.setHeaderImageHeight();
	


    // Take header image and place it on the ask group div for mobile

    var bgImage = $headerImage.css('background-image');
        var askGroup = $('.ask-group');

    askGroup.attr("style", "background-size: cover; background-repeat: no-repeat; background-image:" + bgImage);


});

// Remove unnessesary aria attributes from settings expand button to pass accessibility
$(document).ready(function () {
    $("#settings-btn").removeAttr("role aria-selected");
});
