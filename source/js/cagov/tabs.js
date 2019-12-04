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

        var tabID = $(this).attr("id");
        var tabcontentID = $("[aria-labelledby=" + tabID + "]");
        var tabGroup = $(this).closest(".tab-group");
        var tabsPane = tabGroup.find(".tab-pane");
        tabsPane.attr("tabindex", "-1").attr("aria-hidden", "true");
        if ($(this).attr('aria-selected') === "false") {
            $(".nav-tabs > li").removeClass("active");
            $(this).parent("li").addClass("active");
            tabcontentID.removeAttr("tabindex aria-hidden");
        }
        else {
            $(".nav-tabs > li").removeClass("active");
            $(this).parent("li").addClass("active");
        }
    });

    // takes care of tabindexes and aria-hidden attributes when using arrow keys to navigate
    $(".nav-tabs > li > a").on('keydown', function (e) {
        var tabID = $(this).attr("id");
        var tabcontentID = $("[aria-labelledby=" + tabID + "]");
        var tabGroup = $(this).closest(".tab-group");
        var tabsPane = tabGroup.find(".tab-pane");
        var tabsPaneFirst = tabGroup.find(".tab-pane:first-child");
        var tabsPaneLast = tabGroup.find(".tab-pane:last-child");
        var parentLI = $(this).parent("li");
        

        if (e.keyCode === 37) {
            tabcontentID.prev().removeAttr("tabindex aria-hidden");
            tabcontentID.attr("tabindex", "-1").attr("aria-hidden", "true");

            if (parentLI.is(':first-child')) {
                tabsPaneLast.removeAttr("tabindex aria-hidden");
            }

        } else if (e.keyCode === 38) {
            tabcontentID.prev().removeAttr("tabindex aria-hidden");
            tabcontentID.attr("tabindex", "-1").attr("aria-hidden", "true");

            if (parentLI.is(':first-child')) {
                tabsPaneLast.removeAttr("tabindex aria-hidden");
            }

        } else if (e.keyCode === 39) {
            tabcontentID.next().removeAttr("tabindex aria-hidden");
            tabcontentID.attr("tabindex", "-1").attr("aria-hidden", "true");

            if (parentLI.is(':last-child')) {
                tabsPaneFirst.removeAttr("tabindex aria-hidden");
            }
        } else if (e.keyCode === 40) {
            tabcontentID.next().removeAttr("tabindex aria-hidden");
            tabcontentID.attr("tabindex", "-1").attr("aria-hidden", "true");
            if (parentLI.is(':last-child')) {
                tabsPaneFirst.removeAttr("tabindex aria-hidden");
            }

        }
    });


    /* Tabblale tabs */
    var tabs = $('ul.nav-tabs').find('.nav-link');
    tabs.attr("tabindex", 0); // make accordion tabable


});