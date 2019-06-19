/* -----------------------------------------
   Utility Header
----------------------------------------- */
$(document).ready(function () {
    // removing role attribute to fix accessibilty error
    $(".settings-links button[data-target='#siteSettings']").removeAttr("role");
});