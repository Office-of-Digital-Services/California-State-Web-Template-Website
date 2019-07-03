/* -----------------------------------------
   ASK GROUP
   /source/js/cagov/ask-group.js
----------------------------------------- */
// Extra override to force the ask bar to maintain its tab index because the bootstrap accesibility plugin
// adds tab index -1 to collapse components. We arent using the collapse plugin in this manner, so we force the 
// collapsable items to always be tabbable.
$('.ask-button').attr('tabindex', 0);
// Close Ask menu when clicked anwyere outside
$('body').on('click', function (e) {
try {
      $('.ask-panel').collapse('hide');
} catch (e) {
  // ask panel is wonky
}

});

$(document).ready(function () {
    // removing unsupported aria attribute to fix aria validator errors
    $("#askGroup").removeAttr("aria-multiselectable");
});
