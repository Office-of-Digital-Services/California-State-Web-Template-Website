/* -----------------------------------------
   GALLERY - /source/js/cagov/gallery.js
----------------------------------------- */
    
$(document).ready(function(){
	// Requires fancyBox v2.1.5
    // Enable lightbox functionality
    $('.gallery .item a, .carousel-gallery .item a, a.gallery-item').fancybox({groupAttr: "data-gallery"});
    
    //   EQ Heights for Gallery Items
    $(".gallery").eqHeight(".item");
    
    // Trick eqHeights into running as tabs are focused so image galleries in tabs get height applied.
    // eqHeight plugin would not run using normal selection methods. Triggering resize event to trick eqHeight to run on tab focus
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e){
        window.dispatchEvent(new Event('resize'));
    });
});