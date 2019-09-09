/* -----------------------------------------
   Utility Header
----------------------------------------- */
$(document).ready(function () {
    // removing role attribute to fix aria validator errors
    $(".site-settings").removeAttr("role");
    $(".settings-links button[data-target='#siteSettings']").removeAttr("role aria-selected");
    $(".site-settings button.close").removeAttr("role aria-selected");
});