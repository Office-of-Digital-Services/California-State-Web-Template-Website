/* -----------------------------------------
   ACCORDION LIST - /source/js/cagov/accordion.js
----------------------------------------- */

// Adds tabindex=0 to toggle links
// Hides the description by default for js users.
// No-js users will see the descriptions expanded
$(document).ready(function(){
    var descriptionDefault = $('.accordion-list').find('.description').hide().attr('aria-hidden', 'true'); // Hide the descriptions by default
    $('.accordion-list .toggle').attr('tabindex', '0').attr('aria-expanded', 'false'); // Add tabindex to toggle links and aria support
    
    $(".accordion-list .toggle").click(function(e) {
        var accdDesc = $(this).next(".description");
        
        if( accdDesc.is(":visible") ){
            // CLOSED STATE
			accdDesc.slideUp('fast').removeClass('hide').attr('aria-hidden', 'true');
			$(this).parent('li').removeClass('open');
			$(this).attr('aria-expanded', 'false');
		} else {
			// OPEN STATE
            accdDesc.slideDown('fast').removeClass('hide').attr('aria-hidden', 'false');
			$(this).parent('li').addClass('open');
			$(this).attr('aria-expanded', 'true');
		}
		return false;
    });
});
