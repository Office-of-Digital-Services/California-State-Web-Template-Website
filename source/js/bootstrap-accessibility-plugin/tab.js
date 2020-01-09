// Tab Extension
// ===============================

var $tablist = $('.nav-tabs, .nav-pills')
    , $lis = $tablist.children('li')
    , $tabs = $tablist.find('[data-toggle="tab"], [data-toggle="pill"]');

$tablist.attr('role', 'tablist');
$lis.attr('role', 'presentation');
$tabs.attr('role', 'tab');

$tabs.each(function (index) {
    var tabpanel = $($(this).attr('href'))
        , tab = $(this)
        , tabid = tab.attr('id') || uniqueId('ui-tab');

    tab.attr('id', tabid);

    if (tab.parent().hasClass('active')) {
        tab.attr({ 'tabIndex': '0', 'aria-selected': 'true', 'aria-controls': tab.attr('href').substr(1) });
        tabpanel.attr({ 'role': 'tabpanel', 'tabIndex': '0', 'aria-hidden': 'false', 'aria-labelledby': tabid });
    } else {
        tab.attr({ 'tabIndex': '-1', 'aria-selected': 'false', 'aria-controls': tab.attr('href').substr(1) });
        tabpanel.attr({ 'role': 'tabpanel', 'tabIndex': '-1', 'aria-hidden': 'true', 'aria-labelledby': tabid });
    }
});

$.fn.tab.Constructor.prototype.keydown = function (e) {
    var $this = $(this)
        , $items
        , $ul = $this.closest('ul[role=tablist] ')
        , index
        , k = e.which || e.keyCode;

    $this = $(this);
    if (!/(37|38|39|40)/.test(k)) return;

    $items = $ul.find('[role=tab]:visible');
    index = $items.index($items.filter(':focus'));

    if (k === 38 || k === 37) index--;                         // up & left
    if (k === 39 || k === 40) index++;                        // down & right


    if (index < 0) index = $items.length - 1;
    if (index === $items.length) index = 0;

    var nextTab = $items.eq(index);
    if (nextTab.attr('role') === 'tab') {

        nextTab.tab('show');
        //Comment this line for dynamically loaded tabPabels, to save Ajax requests on arrow key navigation
        nextTab.focus();
    }
    // nextTab.focus()

    e.preventDefault();
    e.stopPropagation();
};

$(document).on('keydown.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', $.fn.tab.Constructor.prototype.keydown);

var tabactivate = $.fn.tab.Constructor.prototype.activate;
$.fn.tab.Constructor.prototype.activate = function (element, container, callback) {
    var $active = container.find('> .active');
    $active.find('[data-toggle=tab], [data-toggle=pill]').attr({ 'tabIndex': '-1', 'aria-selected': false });
    $active.filter('.tab-pane').attr({ 'aria-hidden': true, 'tabIndex': '-1' });

    tabactivate.apply(this, arguments);

    element.addClass('active');
    element.find('[data-toggle=tab], [data-toggle=pill]').attr({ 'tabIndex': '0', 'aria-selected': true });
    element.filter('.tab-pane').attr({ 'aria-hidden': false, 'tabIndex': '0' });
};

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

        if (parentLI.is(':first-child')) {
            console.log("first");
        }
        if (parentLI.is(':last-child')) {
            console.log("last");
        }



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