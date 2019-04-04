/* -----------------------------------------
   Tabs -- some fixing to bootstap 3 tabs 
   and backward compatibility
----------------------------------------- */
$(document).ready(function () {
    // adding active class to a tag if aria selected is true 
    var activeTab = $(".nav-tabs > li > a[aria-selected='true']");
    activeTab.addClass("active");

    // Just to change class active in the parent li element (backward compatibility)
    $(".nav-tabs > li > a").on("click", function () {
        if ($(this).attr('aria-selected') == "false") {
            $(".nav-tabs > li").removeClass("active");
            $(this).parent("li").addClass("active");
        }
        else {
            $(".nav-tabs > li").removeClass("active");
            $(this).parent("li").addClass("active");
        }
    });


    /* Tabblale tabs */
    var tabs = $('ul.nav-tabs').find('.nav-link');
    tabs.attr("tabindex", 0); // make accordion tabable


});