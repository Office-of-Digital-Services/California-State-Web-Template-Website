/* -----------------------------------------
    NAVIGATION MENU - /source/js/cagov/navigation.js
 ----------------------------------------- */
 
 $(document).ready(function () {
    // detect partial flexbox support in IE>9
    if ($('.top-level-nav').css('display') === 'table') { $('body').addClass('no-flex'); }

    // menu variables
    var $navigation = $('#navigation.main-navigation'),
      $navItems = $navigation.find('.nav-item'), // first level link containers'
      $navItemsWithSubs = $navItems.has('.sub-nav'),
      $subNavs = $navigation.find('.sub-nav'),
      megamenu = $navigation.hasClass('megadropdown'),
      dropdown = $navigation.hasClass('dropdown'),
      singleLevel = $navigation.hasClass('singleLevel'),
      offCanvas = false; // beta 5.9 addition instead of: $navigation.hasClass('off-canvas'), 
    mobileWidth = 767,
    setActiveLinkByFolder = $navigation.hasClass('auto-highlight'); // Use new folder matching method to highlight the current navigation tab

    var mouseOverDelay = 100, setTimeoutConst;

    // touch detection
    var isTouch = Modernizr.touch,
      msTouch = 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    var touchMode = false;
    $(window).on('mousemove', function () {
        if (touchMode) touchmode = false;
    });

    // HIGHLIGHT APPROPRIATE NAV ITEM
    var reMainNav = "",
      arrCurrentURL = location.href.split("/");
    if (typeof defaultActiveLink !== "undefined") {
        reMainNav = new RegExp("^" + defaultActiveLink + "$", "i"); // Regex for finding the index of the default main list item
    }
    $navItems.each(function () { // loop through top level links
        var $this = $(this),
          $a = $this.find('.first-level-link');

        if (reMainNav) {
            if ($a.text().match(reMainNav)) {
                $this.addClass('active');
            }
        } else if (setActiveLinkByFolder && $a.attr('href')) {
            var arrNavLink = $a[0].href.split("/");
            if (arrNavLink.length > 4 && arrCurrentURL[3] === arrNavLink[3]) { // folder of current URL matches this nav link
                $this.addClass('active');
            }
        }

    });

    $navItemsWithSubs.each(function () {
        var itemCount = $(this).find('.second-level-nav > li').length;
        if (itemCount <= 2) {
            $(this).find('.sub-nav').addClass('with-few-items');
        }
    });


    if ((megamenu || dropdown) && (isTouch || !msTouch)) {		// setup standard megamenu or dropdown menu and touch supporting 'ontouchstart'
        // show and hide sub nav with fade effect


        if (isTouch) {
            // hide submenus when touch occurs outside of menu
            $(document).on('touchstart.ca.catchNav', function (e) {
                touchMode = false;
            }, false);

            $navItemsWithSubs.each(function () {
                var $this = $(this),
                  $a = $this.find('.first-level-link'),
                  node = $a[0],
                  $sub = $this.find('.sub-nav'),
                  $subLinks = $sub.find('a');
                $a.data('link', $a.attr('href')).removeAttr; // store url

                $this.on('touchstart.ca.propagation', function (e) {
                    // keeps tabpanel from closing when clicking inside of it
                    e.stopPropagation();
                });

                $this.on('touchstart.ca.navclose', function (e) {
                    touchMode = true;
                    if ($sub.is(':visible') || mobileView()) {
                        // if sub is visible, or in mobile view keep default behavior
                    } else {
                        // keeps tabpanel from closing when clicking inside of it
                        e.preventDefault();
                        e.stopPropagation();

                        // position arrow, fade in current panel
                    
                        $sub.fadeIn(1000);
                    }
                }, false);
            });
        }

    } else if ((megamenu || dropdown) && msTouch) {
       

        $navItemsWithSubs.each(function () {
            var $this = $(this),
              $a = $this.find('.first-level-link'),
              node = $a[0],
              $sub = $this.find('.sub-nav'),
              $subLinks = $sub.find('a');
            $a.data('link', $a.attr('href')); // store url

            $this.on('click.ca.propagation', function (e) {
                // keeps tabpanel from closing when clicking inside of it
                e.stopPropagation();
            });

            $a.on('click.ca.navclose', function (e) {
                if ($sub.is(':visible') || mobileView()) {
                    // if sub is visible, or in mobile view keep default behavior
                } else {
                    // keeps tabpanel from closing when clicking inside of it
                    e.preventDefault();
                    e.stopPropagation();

                    // position arrow, hide other sub-nav panels, fade in current panel
                    
                    $sub.fadeIn(1000);
                }
            });
        });
    }

    // MENU FUNCTIONS


    function mobileView() {
        return $('.global-header .mobile-controls').css('display') !== "none"; // mobile view uses arrow to show subnav instead of first touch
    }



    // SETUP MOBILE MENU
    // add sub nav toggles to mobile menu $navItemsWithSubs
    if (!singleLevel) {
        $navItemsWithSubs.each(function () {

            $(this).find('.first-level-link').addClass('has-sub');
            var linktext = $(this).find('.first-level-link').text();
            // create toggle object
            var $toggleSubNav = $('<button class="mobile-control toggle-sub-nav closed"><div class="ca-gov-icon-arrow-next rotate" aria-hidden="true"></div><span class="sr-only">' + linktext + ' sub menu toggle</span></button>');
            // add toggle object to DOM
            $(this).find('.sub-nav').before($toggleSubNav);

        });
    }





        // Setup non-off-canvas menu
        $('#navigation').addClass('mobile-closed');
        $(".sub-nav").addClass('subnav-closed');
        $('.toggle-menu').on("click", function () {
            if ($('#navigation').hasClass('mobile-closed')) {
                $(this).addClass('open'); // for hamburger to X transition
                $(this).attr('aria-expanded', 'true');
                // $('#navigation').removeClass('mobile-closed');
                $('#navigation').slideDownTransition();
            } else {
                $(this).removeClass('open'); // for hamburger to X transition
                $(this).attr('aria-expanded', 'false');
                // $('#navigation').addClass('mobile-closed');
                $('#navigation').slideUpTransition();
            }
            //$('#navigation').toggleClass('mobile-closed');
            $('.search-container').removeClass('active');
            // Changing aria attributes for accessibility

        });

        // Subnav Toggle
    if (msTouch) {
        // touch event for mobile
        $(".toggle-sub-nav").on("touchstart", function () {
            var secondaryLinks = $(this).parent().find('.sub-nav');
            if ($(this).hasClass('closed')) {
                $(this).removeClass('closed').addClass('open');
                $(this).find(".rotate").addClass('down');
                $(secondaryLinks).slideDownTransitionSub();
            } else {
                $(this).removeClass('open').addClass('closed');
                $(this).find(".rotate").removeClass('down');
                $(secondaryLinks).slideUpTransitionSub();
            }
        });
    }
    else {
        // click event for desktop
        $(".toggle-sub-nav").on("click", function () {
            var secondaryLinks = $(this).parent().find('.sub-nav');
            if ($(this).hasClass('closed')) {
                $(this).removeClass('closed').addClass('open');
                $(this).find(".rotate").addClass('down');
                $(secondaryLinks).slideDownTransitionSub();
            } else {
                $(this).removeClass('open').addClass('closed');
                $(this).find(".rotate").removeClass('down');
                $(secondaryLinks).slideUpTransitionSub();
            }

        });
    }

    $(".rotate1").on("click", function () {
        $(this).toggleClass("down");
    });
    
    



    // allow dropdown on focus
    var menuHoverClass = 'focus',
      clickedFocus = 'clickedFocus';

    $('.top-level-nav > li > a').on("mouseenter", function () {
        $(this).closest('ul').find('.' + menuHoverClass).removeClass(menuHoverClass);
    }).on("mouseleave", function () {
        $('.' + clickedFocus).removeClass(clickedFocus);
    });
    $('.top-level-nav > li > a').on("focus", function (e) {
        $(this).closest('ul').find('.' + menuHoverClass).removeClass(menuHoverClass);
        if (!$(this).parent().find('.toggle-sub-nav').hasClass('open')) {
            $(this).parent().addClass(menuHoverClass);
        }
    }).on('mousedown', function () {
        // prevent subnav from showing when link is clicked
        if (!$(this).parent().find('.toggle-sub-nav').hasClass('open')) {
            $(this).parent().addClass(clickedFocus);
        }
    });

    // Hide menu if click occurs outside of navigation
    // Hide menu if click or focus occurs outside of navigation
    $('.top-level-nav a').last().on("keydown", function (e) {
        if (e.keyCode === 9) {
            // If the user tabs out of the navigation hide all menus
            $('.top-level-nav .' + menuHoverClass).removeClass(menuHoverClass);
        }
    });
    $(document).on("click", function () { $('.top-level-nav .' + menuHoverClass).removeClass(menuHoverClass); });

    $('.top-level-nav').on("click", function (e) {
        e.stopPropagation();
    });
    //*/
    // Hide navigation from screen reader in mobile
    if (mobileView()) {
        $navigation.attr("aria-hidden", "true");

        // Prevent focusing/tabbing thru links in mobile if nav is closed
        if ($navigation.hasClass("mobile-closed")) {
            $("#nav_list a").attr("tabindex", "-1");
            $("#nav_list button").attr("tabindex", "-1");
        }
        else {
            $("#nav_list a").removeAttr("tabindex");
            $("#nav_list button").removeAttr("tabindex");
        }
    }


});

 // Mobile slidedown function
        (function ($) {
            $.fn.slideUpTransition = function () {
                return this.each(function () {
                    var $el = $(this);
                    $el.css("max-height", "0").addClass("mobile-closed").attr("aria-hidden", "true");
                    $(".first-level-link").attr("tabindex", "-1");
                    $(".top-level-nav li button").attr("tabindex", "-1");
                   
                });
            };

            $.fn.slideDownTransition = function () {
                return this.each(function () {
                    var $el = $(this);
                    $el.removeClass("mobile-closed");
                    $el.removeAttr("aria-hidden");
                    $(".first-level-link").removeAttr("tabindex");
                    $(".top-level-nav li button").removeAttr("tabindex");
                    // temporarily make visible to get the size
                    $el.css("max-height", "none");
                    var height = $el.outerHeight();

                    // reset to 0 then animate with small delay
                    $el.css("max-height", "0");

                    setTimeout(function () {
                        $el.css({
                            "max-height": height
                        });
                    }, 1);
                });
            };
        })(jQuery);


        // Subnav Mobile slidedown function
        (function ($) {
            $.fn.slideUpTransitionSub = function () {
                return this.each(function () {
                    var $subel = $(this);
                    var subheight = $subel.outerHeight();
                    var mainnavheight = $("#navigation").outerHeight();
                    var sumheight = mainnavheight - subheight;
                    $subel.css("max-height", "0");
                    $subel.addClass("subnav-closed");
                    $subel.attr('aria-expanded', 'false');
                    $subel.attr('aria-hidden', 'true');
                    $subel.find("a").attr("tabindex", "-1");
                    $("#navigation").css({ "max-height": sumheight });
                });
            };

            $.fn.slideDownTransitionSub = function () {
                return this.each(function () {
                    var $subel = $(this);
                    $subel.removeClass("subnav-closed");
                    $subel.find("a").removeAttr("tabindex");
                    // temporarily make visible to get the size
                    $subel.css("max-height", "none");
                    var subheight = $subel.outerHeight();
                    var mainnavheight = $("#navigation").outerHeight();
                    var sumheight = subheight + mainnavheight;
                    // reset to 0 then animate with small delay
                    $subel.css("max-height", "0");

                    setTimeout(function () {
                        $subel.css({
                            "max-height": subheight
                        });
                        $subel.attr('aria-expanded', 'true');
                        $subel.attr('aria-hidden', 'false');
                        $("#navigation").css({ "max-height": sumheight });
                    }, 1);
                });
            };
        })(jQuery);

/*  ACCESSIBLE MENU */
// source https://github.com/adobe-accessibility/Accessible-Mega-Menu/

(function ($, window, document) {
    "use strict";
    var pluginName = "accessibleMenu",
        defaults = {
            navToggle: "#nav-toggle",
            navId: "#navigation",
            uuidPrefix: "accessible-menu", // unique ID's are required to indicate aria-owns, aria-controls and aria-labelledby
            menuClass: "nav-menu", // default css class used to define the megamenu styling
            topNavItemClass: "nav-item", // default css class for a top-level navigation item in the megamenu
            panelClass: "accessible-menu-panel", // default css class for a megamenu panel
            panelGroupClass: "accessible-menu-panel-group", // default css class for a group of items within a megamenu panel
            hoverClass: "hover", // default css class for the hover state
            focusClass: "focus", // default css class for the focus state
            openClass: "open", // default css class for the open state
            openDelay: 400, // default open delay when opening menu via mouseover
            closeDelay: 500 // default close delay when on mouseout
        },
        Keyboard = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            keyMap: {
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                190: "."
            }
        };
// * @desc Creates a new accessible mega menu instance.
//  * @param {jquery} element
// * @param {object} [options] Mega Menu options
// * @param {string} [options.uuidPrefix=accessible-menu] - Prefix for generated unique id attributes, which are required to indicate aria-owns, aria-controls and aria-labelledby
// * @param {string} [options.menuClass=accessible-menu] - CSS class used to define the megamenu styling
// * @param {string} [options.topNavItemClass=accessible-menu-top-nav-item] - CSS class for a top-level navigation item in the megamenu
// * @param {string} [options.panelClass=accessible-menu-panel] - CSS class for a megamenu panel
// * @param {string} [options.panelGroupClass=accessible-menu-panel-group] - CSS class for a group of items within a megamenu panel
// * @param {string} [options.hoverClass=hover] - CSS class for the hover state
// * @param {string} [options.focusClass=focus] - CSS class for the focus state
// * @param {string} [options.openClass=open] - CSS class for the open state
// * @constructor
    function accessibleMenu(element, options) {
        this.element = element;

        // merge optional settings and defaults into settings
        this.settings = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.mouseTimeoutID = null;
        this.focusTimeoutID = null;
        this.mouseFocused = false;
        this.justFocused = false;

        this.init();
    }



    accessibleMenu.prototype = (function () {

        /* private attributes and methods ------------------------ */
        var uuid = 0,
            keydownTimeoutDuration = 1000,
            keydownSearchString = "",
            isTouch = typeof window.hasOwnProperty === "function" && !!window.hasOwnProperty("ontouchstart"),
            _getPlugin,
            _addUniqueId,
            _togglePanel,
            _clickHandler,
            _clickOutsideHandler,
            _DOMAttrModifiedHandler,
            _focusInHandler,
            _focusOutHandler,
            _keyDownHandler,
            _mouseDownHandler,
            _mouseOverHandler,
            _mouseOutHandler,
            _toggleExpandedEventHandlers;


// * @name jQuery.fn.accessibleMenu~_getPlugin
// * @desc Returns the parent accessibleMenu instance for a given element
// * @param {jQuery} element
// * @memberof jQuery.fn.accessibleMenu
// * @inner
// * @private
        _getPlugin = function (element) {
            return $(element).closest(':data(plugin_' + pluginName + ')').data("plugin_" + pluginName);
        };


// * @name jQuery.fn.accessibleMenu~_addUniqueId
// * @desc Adds a unique id and element.
// * The id string starts with the
// * string defined in settings.uuidPrefix.
// * @param {jQuery} element
// * @memberof jQuery.fn.accessibleMenu
// * @inner
// * @private

        _addUniqueId = function (element) {
            element = $(element);
            var settings = this.settings;
            if (!element.attr("id")) {
                element.attr("id", settings.uuidPrefix + "-" + new Date().getTime() + "-" + ++uuid);
            }
        };


// * @name jQuery.fn.accessibleMenu~_togglePanel
// * @desc Toggle the display of mega menu panels in response to an event.
// * The optional boolean value 'hide' forces all panels to hide.
// * @param {event} event
// * @param {Boolean} [hide] Hide all mega menu panels when true
// * @memberof jQuery.fn.accessibleMenu
// * @inner
// * @private

        _togglePanel = function (event, hide) {
            var target = $(event.target),
                that = this,
                settings = this.settings,
                menu = this.menu,
                topli = target.closest('.' + settings.topNavItemClass),
                panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass),
                newfocus;

            _toggleExpandedEventHandlers.call(this, true);

            if (hide) {
                topli = menu.find('.' + settings.topNavItemClass + ' .' + settings.openClass + ':first').closest('.' + settings.topNavItemClass);
                if (!(topli.is(event.relatedTarget) || topli.has(event.relatedTarget).length > 0)) {
                    if ((event.type === 'mouseout' || event.type === 'focusout') && topli.has(document.activeElement).length > 0) {
                        return;
                    }
                    topli.find('[aria-expanded]')
                        .attr('aria-expanded', 'false')
                        .removeClass(settings.openClass)
                        .filter('.' + settings.panelClass)
                        .attr('aria-hidden', 'true');
                    if (event.type === 'keydown' && event.keyCode === Keyboard.ESCAPE || event.type === 'DOMAttrModified') {
                        newfocus = topli.find(':tabbable:first');
                        setTimeout(function () {
                            menu.find('[aria-expanded].' + that.settings.panelClass).off('DOMAttrModified.accessible-menu');
                            newfocus.trigger("focus");
                            that.justFocused = false;
                        }, 99);
                    }
                } else if (topli.length === 0) {
                    menu.find('[aria-expanded=true]')
                        .attr('aria-expanded', 'false')
                        .removeClass(settings.openClass)
                        .filter('.' + settings.panelClass)
                        .attr('aria-hidden', 'true');
                }
            } else {
                clearTimeout(that.focusTimeoutID);
                topli.siblings()
                    .find('[aria-expanded]')
                    .attr('aria-expanded', 'false')
                    .removeClass(settings.openClass)
                    .filter('.' + settings.panelClass)
                    .attr('aria-hidden', 'true');
                topli.find('[aria-expanded]')
                    .attr('aria-expanded', 'true')
                    .addClass(settings.openClass)
                    .filter('.' + settings.panelClass)
                    .attr('aria-hidden', 'false');
                if (event.type === 'mouseover' && target.is(':tabbable') && topli.length === 1 && panel.length === 0 && menu.has(document.activeElement).length > 0) {
                    target.trigger("focus");
                    that.justFocused = false;
                }

                _toggleExpandedEventHandlers.call(that);
            }
        };


        // * @name jQuery.fn.accessibleMenu~_clickHandler
        // * @desc Handle click event on mega menu item
        // * @param {event} Event object
        // * @memberof jQuery.fn.accessibleMenu
        // * @inner
        // * @private

        _clickHandler = function (event) {
            var target = $(event.target).closest(':tabbable'),
                topli = target.closest('.' + this.settings.topNavItemClass),
                panel = target.closest('.' + this.settings.panelClass);
            if (topli.length === 1
                    && panel.length === 0
                    && topli.find('.' + this.settings.panelClass).length === 1) {
                if (!target.hasClass(this.settings.openClass)) {
                    event.preventDefault();
                    event.stopPropagation();
                    _togglePanel.call(this, event);
                    this.justFocused = false;
                }
                else {
                    if (this.justFocused) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.justFocused = false;
                    } else if (isTouch) {
                        // event.preventDefault();
                        // event.stopPropagation();
                        // _togglePanel.call(this, event, target.hasClass(this.settings.openClass));
                    }
                }
            }
        };

// * @name jQuery.fn.accessibleMenu~_clickOutsideHandler
// * @desc Handle click event outside of a the megamenu
// * @param {event} Event object
// * @memberof jQuery.fn.accessibleMenu
// * @inner
// * @private

        _clickOutsideHandler = function (event) {
            if ($(event.target).closest(this.menu).length === 0) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        };


// * @name jQuery.fn.accessibleMenu~_DOMAttrModifiedHandler
// * @desc Handle DOMAttrModified event on panel to respond to Windows 8 Narrator ExpandCollapse pattern
// * @param {event} Event object
// * @memberof jQuery.fn.accessibleMenu
// * @inner
// * @private

        _DOMAttrModifiedHandler = function (event) {
            if (event.originalEvent.attrName === 'aria-expanded'
                    && event.originalEvent.newValue === 'false'
                    && $(event.target).hasClass(this.settings.openClass)) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        };


// * @name jQuery.fn.accessibleMenu~_focusInHandler
// * @desc Handle focusin event on mega menu item.
// * @param {event} Event object
// * @memberof jQuery.fn.accessibleMenu
// * @inner
// * @private

        _focusInHandler = function (event) {
            clearTimeout(this.focusTimeoutID);
            var target = $(event.target),
                panel = target.closest('.' + this.settings.panelClass);
            target
                .addClass(this.settings.focusClass);
            //.on('click.accessible-menu', $.proxy(_clickHandler, this));
            this.justFocused = !this.mouseFocused;
            this.mouseFocused = false;
            if (this.panels.not(panel).filter('.' + this.settings.openClass).length) {
                _togglePanel.call(this, event);
            }
        };


// * @name jQuery.fn.accessibleMenu~_focusOutHandler
// * @desc Handle focusout event on mega menu item.
// * @param {event} Event object
// * @memberof jQuery.fn.accessibleMenu
// * @inner
// * @private

        _focusOutHandler = function (event) {
            this.justFocused = false;
            var that = this,
                target = $(event.target),
                topli = target.closest('.' + this.settings.topNavItemClass),
                keepOpen = false;
            target
                .removeClass(this.settings.focusClass)
                .off('click.accessible-menu');

            if (window.cvox) {
                // If ChromeVox is running...
                that.focusTimeoutID = setTimeout(function () {
                    window.cvox.Api.getCurrentNode(function (node) {
                        if (topli.has(node).length) {
                            // and the current node being voiced is in
                            // the mega menu, clearTimeout,
                            // so the panel stays open.
                            clearTimeout(that.focusTimeoutID);
                        } else {
                            that.focusTimeoutID = setTimeout(function (scope, event, hide) {
                                _togglePanel.call(scope, event, hide);
                            }, 275, that, event, true);
                        }
                    });
                }, 25);
            } else {
                that.focusTimeoutID = setTimeout(function () {
                    _togglePanel.call(that, event, true);
                }, 300);
            }
        };

// * @name jQuery.fn.accessibleMenu~_keyDownHandler
// * @desc Handle keydown event on mega menu.
// * @param {event} Event object
// * @memberof jQuery.fn.accessibleMenu
// * @inner
// * @private

        _keyDownHandler = function (event) {
            var that = this.constructor === accessibleMenu ? this : _getPlugin(this), // determine the accessibleMenu plugin instance
                settings = that.settings,
                target = $($(this).is('.' + settings.hoverClass + ':tabbable') ? this : event.target), // if the element is hovered the target is this, otherwise, its the focused element
                menu = that.menu,
                topnavitems = that.topnavitems,
                topli = target.closest('.' + settings.topNavItemClass),
                tabbables = menu.find(':tabbable'),
                panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass),
                panelGroups = panel.find('.' + settings.panelGroupClass),
                currentPanelGroup = target.closest('.' + settings.panelGroupClass),
                next,
                keycode = event.keyCode || event.which,
                start,
                i,
                o,
                label,
                found = false,
                newString = Keyboard.keyMap[event.keyCode] || '',
                regex,
                isTopNavItem = topli.length === 1 && panel.length === 0;

            if (target.is("input:focus, select:focus, textarea:focus, button:focus")) {
                // if the event target is a form element we should handle keydown normally
                return;
            }

            if (target.is('.' + settings.hoverClass + ':tabbable')) {
                $('html').off('keydown.accessible-menu');
            }

            switch (keycode) {
                case Keyboard.ESCAPE:
                    _togglePanel.call(that, event, true);
                    break;
                case Keyboard.DOWN:
                    event.preventDefault();
                    if (isTopNavItem) {
                        _togglePanel.call(that, event);
                        found = topli.find('.' + settings.panelClass + ' :tabbable:first').trigger("focus").length === 1;
                    } else {
                        found = tabbables.filter(':gt(' + tabbables.index(target) + '):first').trigger("focus").length === 1;
                    }

                    if (!found && window.opera && opera.toString() === "[object Opera]" && (event.ctrlKey || event.metaKey)) {
                        tabbables = $(':tabbable');
                        i = tabbables.index(target);
                        found = $(':tabbable:gt(' + $(':tabbable').index(target) + '):first').trigger("focus").length === 1;
                    }
                    break;
                case Keyboard.UP:
                    event.preventDefault();
                    if (isTopNavItem && target.hasClass(settings.openClass)) {
                        _togglePanel.call(that, event, true);
                        next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
                        if (next.children('.' + settings.panelClass).length) {
                            found = next.children()
                                .attr('aria-expanded', 'true')
                                .addClass(settings.openClass)
                                .filter('.' + settings.panelClass)
                                .attr('aria-hidden', 'false')
                                .find(':tabbable:last')
                                .trigger("focus") === 1;
                        }
                    } else if (!isTopNavItem) {
                        found = tabbables.filter(':lt(' + tabbables.index(target) + '):last').trigger("focus").length === 1;
                    }

                    if (!found && window.opera && opera.toString() === "[object Opera]" && (event.ctrlKey || event.metaKey)) {
                        tabbables = $(':tabbable');
                        i = tabbables.index(target);
                        found = $(':tabbable:lt(' + $(':tabbable').index(target) + '):first').trigger("focus").length === 1;
                    }
                    break;
                case Keyboard.RIGHT:
                    event.preventDefault();
                    if (isTopNavItem) {
                        found = topnavitems.filter(':gt(' + topnavitems.index(topli) + '):first').find(':tabbable:first').trigger("focus").length === 1;
                    } else {
                        if (panelGroups.length && currentPanelGroup.length) {
                            // if the current panel contains panel groups, and we are able to focus the first tabbable element of the next panel group
                            found = panelGroups.filter(':gt(' + panelGroups.index(currentPanelGroup) + '):first').find(':tabbable:first').trigger("focus").length === 1;
                        }

                        if (!found) {
                            found = topli.find(':tabbable:first').trigger("focus").length === 1;
                        }
                    }
                    break;
                case Keyboard.LEFT:
                    event.preventDefault();
                    if (isTopNavItem) {
                        found = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last').find(':tabbable:first').trigger("focus").length === 1;
                    } else {
                        if (panelGroups.length && currentPanelGroup.length) {
                            // if the current panel contains panel groups, and we are able to focus the first tabbable element of the previous panel group
                            found = panelGroups.filter(':lt(' + panelGroups.index(currentPanelGroup) + '):last').find(':tabbable:first').trigger("focus").length === 1;
                        }

                        if (!found) {
                            found = topli.find(':tabbable:first').trigger("focus").length === 1;
                        }
                    }
                    break;
                case Keyboard.TAB:
                    i = tabbables.index(target);
                    if (event.shiftKey && isTopNavItem && target.hasClass(settings.openClass)) {
                        _togglePanel.call(that, event, true);
                        next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
                        if (next.children('.' + settings.panelClass).length) {
                            found = next.children()
                                .attr('aria-expanded', 'true')
                                .addClass(settings.openClass)
                                .filter('.' + settings.panelClass)
                                .attr('aria-hidden', 'false')
                                .find(':tabbable:last')
                                .trigger("focus");
                        }
                    } else if (event.shiftKey && i > 0) {
                        found = tabbables.filter(':lt(' + i + '):last').trigger("focus").length === 1;
                    } else if (!event.shiftKey && i < tabbables.length - 1) {
                        found = tabbables.filter(':gt(' + i + '):first').trigger("focus").length === 1;
                    } else if (window.opera && opera.toString() === "[object Opera]") {
                        tabbables = $(':tabbable');
                        i = tabbables.index(target);
                        if (event.shiftKey) {
                            found = $(':tabbable:lt(' + $(':tabbable').index(target) + '):last').trigger("focus").length === 1;
                        } else {
                            found = $(':tabbable:gt(' + $(':tabbable').index(target) + '):first').trigger("focus").length === 1;
                        }
                    }

                    if (found) {
                        event.preventDefault();
                    }
                    break;
                case Keyboard.SPACE:
                    if (isTopNavItem) {
                        event.preventDefault();
                        _clickHandler.call(that, event);
                    } else {
                        return true;
                    }
                    break;
                case Keyboard.ENTER:
                    return true;
                default:
                    // alphanumeric filter
                    clearTimeout(this.keydownTimeoutID);

                    keydownSearchString += newString !== keydownSearchString ? newString : '';

                    if (keydownSearchString.length === 0) {
                        return;
                    }

                    this.keydownTimeoutID = setTimeout(function () {
                        keydownSearchString = '';
                    }, keydownTimeoutDuration);

                    if (isTopNavItem && !target.hasClass(settings.openClass)) {
                        tabbables = tabbables.filter(':not(.' + settings.panelClass + ' :tabbable)');
                    } else {
                        tabbables = topli.find(':tabbable');
                    }

                    if (event.shiftKey) {
                        tabbables = $(tabbables.get()
                            .reverse());
                    }

                    for (i = 0; i < tabbables.length; i++) {
                        o = tabbables.eq(i);
                        if (o.is(target)) {
                            start = keydownSearchString.length === 1 ? i + 1 : i;
                            break;
                        }
                    }

                    regex = new RegExp('^' + keydownSearchString.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'), 'i');

                    for (i = start; i < tabbables.length; i++) {
                        o = tabbables.eq(i);
                        label = $.trim(o.text());
                        if (regex.test(label)) {
                            found = true;
                            o.trigger("focus");
                            break;
                        }
                    }
                    if (!found) {
                        for (i = 0; i < start; i++) {
                            o = tabbables.eq(i);
                            label = $.trim(o.text());
                            if (regex.test(label)) {
                                o.trigger("focus");
                                break;
                            }
                        }
                    }
                    break;
            }
            that.justFocused = false;
        };


        // * @name jQuery.fn.accessibleMenu~_mouseDownHandler
        // * @desc Handle mousedown event on mega menu.
        // * @param {event} Event object
        // * @memberof accessibleMenu
        // * @inner
        // * @private

        _mouseDownHandler = function (event) {
            if ($(event.target).is(this.settings.panelClass) || $(event.target).closest(":focusable").length) {
                this.mouseFocused = true;
            }
            clearTimeout(this.mouseTimeoutID);
            this.mouseTimeoutID = setTimeout(function () {
                clearTimeout(this.focusTimeoutID);
            }, 1);
        };

        /**
         * @name jQuery.fn.accessibleMenu~_mouseOverHandler
         * @desc Handle mouseover event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMenu
         * @inner
         * @private
         */


        _mouseOverHandler = function (event) {
            clearTimeout(this.mouseTimeoutID);
            var that = this;
            if ($(window).width() > 768) {
                this.mouseTimeoutID = setTimeout(function () {
                    $(event.target).addClass(that.settings.hoverClass);

                    _togglePanel.call(that, event);
                    if ($(event.target).is(':tabbable')) {
                        $('html').on('keydown.accessible-menu', $.proxy(_keyDownHandler, event.target));
                    }
                }, this.settings.openDelay);
            }
        };


        // * @name jQuery.fn.accessibleMenu~_mouseOutHandler
        // * @desc Handle mouseout event on mega menu.
        // * @param {event} Event object
        // * @memberof jQuery.fn.accessibleMenu
        // * @inner
        // * @private

        _mouseOutHandler = function (event) {
            clearTimeout(this.mouseTimeoutID);
            var that = this;
            $(event.target)
                .removeClass(that.settings.hoverClass);

            that.mouseTimeoutID = setTimeout(function () {
                _togglePanel.call(that, event, true);
            }, this.settings.closeDelay);
            if ($(event.target).is(':tabbable')) {
                $('html').off('keydown.accessible-menu');
            }

        };

        _toggleExpandedEventHandlers = function (hide) {
            var menu = this.menu;
            if (hide) {
                $('html').off('mouseup.outside-accessible-menu, touchend.outside-accessible-menu, mspointerup.outside-accessible-menu,  pointerup.outside-accessible-menu');

                menu.find('[aria-expanded].' + this.settings.panelClass).off('DOMAttrModified.accessible-menu');
            } else {
                $('html').on('mouseup.outside-accessible-menu, touchend.outside-accessible-menu, mspointerup.outside-accessible-menu,  pointerup.outside-accessible-menu', $.proxy(_clickOutsideHandler, this));

                /* Narrator in Windows 8 automatically toggles the aria-expanded property on double tap or click.
                   To respond to the change to collapse the panel, we must add a listener for a DOMAttrModified event. */
                menu.find('[aria-expanded=true].' + this.settings.panelClass).on('DOMAttrModified.accessible-menu', $.proxy(_DOMAttrModifiedHandler, this));
            }
        };

        /* public attributes and methods ------------------------- */
        return {
            constructor: accessibleMenu,

            /**
             * @lends jQuery.fn.accessibleMenu
             * @desc Initializes an instance of the accessibleMenu plugins
             * @memberof jQuery.fn.accessibleMenu
             * @instance
             */
            init: function () {
                var settings = this.settings,
                    nav = $(this.element),
                    menu = nav.children().first(),
                    topnavitems = menu.children();
                this.start(settings, nav, menu, topnavitems);
            },

            start: function (settings, nav, menu, topnavitems) {
                var that = this;
                this.settings = settings;
                this.menu = menu;
                this.topnavitems = topnavitems;

               // nav.attr("role", "navigation"); //it is already inside of <nav> no need for role.
                menu.addClass(settings.menuClass);
                topnavitems.each(function (i, topnavitem) {
                    var topnavitemlink, topnavitempanel;
                    topnavitem = $(topnavitem);
                    topnavitem.addClass(settings.topNavItemClass);
                    topnavitemlink = topnavitem.find(":tabbable:first");
                    topnavitempanel = topnavitem.children(":not(:tabbable):last");
                    _addUniqueId.call(that, topnavitemlink);
                    if (topnavitempanel.length) {
                        _addUniqueId.call(that, topnavitempanel);
                        topnavitemlink.attr({
                            // "aria-haspopup": true,
                            "aria-controls": topnavitempanel.attr("id"),
                            "aria-expanded": false
                        });

                        topnavitempanel.attr({
                            "role": "region",
                            "aria-expanded": false,
                            "aria-hidden": true
                        })
                            .addClass(settings.panelClass)
                            .not("[aria-labelledby]")
                            .attr("aria-labelledby", topnavitemlink.attr("id"));
                    }
                });

                this.panels = menu.find("." + settings.panelClass);


                menu.on("focusin.accessible-menu", ":focusable, ." + settings.panelClass, $.proxy(_focusInHandler, this))
                    .on("focusout.accessible-menu", ":focusable, ." + settings.panelClass, $.proxy(_focusOutHandler, this))
                    .on("keydown.accessible-menu", $.proxy(_keyDownHandler, this))
                    .on("mouseover.accessible-menu", $.proxy(_mouseOverHandler, this))
                    .on("mouseout.accessible-menu", $.proxy(_mouseOutHandler, this))
                    .on("mousedown.accessible-menu", $.proxy(_mouseDownHandler, this));

                if (isTouch) {
                    menu.on("touchstart.accessible-menu", $.proxy(_clickHandler, this));
                }

                menu.find("hr").attr("role", "separator");

                if ($(document.activeElement).closest(menu).length) {
                    $(document.activeElement).trigger("focusin.accessible-menu");
                }



            },


            // * @desc Get default values
            // * @example $(selector).accessibleMenu("getDefaults");
            // * @return {object}
            // * @memberof jQuery.fn.accessibleMenu
            // * @instance

            getDefaults: function () {
                return this._defaults;
            },

            // * @desc Get any option set to plugin using its name (as string)
            // * @example $(selector).accessibleMenu("getOption", some_option);
            // * @param {string} opt
            // * @return {string}
            // * @memberof jQuery.fn.accessibleMenu
            // * @instance

            getOption: function (opt) {
                return this.settings[opt];
            },

            // * @desc Get all options
            // * @example $(selector).accessibleMenu("getAllOptions");
            // * @return {object}
            // * @memberof jQuery.fn.accessibleMenu
            // * @instance

            getAllOptions: function () {
                return this.settings;
            },

            // * @desc Set option
            // * @example $(selector).accessibleMenu("setOption", "option_name",  "option_value",  reinitialize);
            // * @param {string} opt - Option name
            // * @param {string} val - Option value
            // * @param {boolean} [reinitialize] - boolean to re-initialize the menu.
            // * @memberof jQuery.fn.accessibleMenu
            // * @instance

            setOption: function (opt, value, reinitialize) {
                this.settings[opt] = value;
                if (reinitialize) {
                    this.init();
                }
            }
        };
    }());

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new $.fn[pluginName].accessibleMenu(this, options));
            }
        });
    };

    $.fn[pluginName].accessibleMenu = accessibleMenu;

    /* :focusable and :tabbable selectors from
       https://raw.github.com/jquery/jquery-ui/master/ui/jquery.ui.core.js */
    
    // * @private

    function visible(element) {
        return $.expr.pseudos.visible(element) && !$(element).parents().addBack().filter(function () {
            return $.css(this, "visibility") === "hidden";
        }).length;
    }


    // * @private

    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img,
            nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled :
                "a" === nodeName ?
                        element.href || isTabIndexNotNaN :
                        isTabIndexNotNaN) &&
                            // the element and all of its ancestors must be visible
                            visible(element);
    }

    $.extend($.expr.pseudos, {
        data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
            return function (elem) {
                return !!$.data(elem, dataName);
            };
        }) : // support: jQuery <1.8
                function (elem, i, match) {
                    return !!$.data(elem, match[3]);
                },

        focusable: function (element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },

        tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });


    // Do Navigation Reset function on window resize unless it's mobile device.
    $(window).on('resize', function () {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return false;
        }
        else {
            NavReset();
        }
    });



    // Navigation Reset function
    function NavReset() {
        $(".sub-nav").removeClass("open");
        $(".sub-nav").removeClass("secondary-open");
        $(".sub-nav").attr("aria-expanded", false);
        $(".sub-nav").attr("aria-hidden", true);
        $(".first-level-link").removeClass("open");
        $(".first-level-link").removeClass("active");
        $(".first-level-link").attr("aria-expanded", false);
        $("#navigation").addClass("mobile-closed");
        if ($(window).width() < 768) {
            $("#navigation").css("max-height", "0").attr("aria-hidden", "true");
            $('.sub-nav').slideUpTransitionSub();
            $('#navigation').slideUpTransition();
            // 
            $(".rotate").removeClass('down');
            $("#nav_list a").attr("tabindex", "-1");
            $("#nav_list button").attr("tabindex", "-1");
        }
        else {
            $("#navigation").removeAttr("style aria-hidden");
            $(".sub-nav").removeAttr("style");
            $("#nav_list a").removeAttr("tabindex");
            $("#nav_list button").removeAttr("tabindex");
        }

        $(".toggle-sub-nav").removeClass("open");
        $(".toggle-sub-nav").addClass("closed");
        $(".nav-item").removeClass("active");
        $(".toggle-menu").attr('aria-expanded', 'false');
        $(".toggle-menu").removeClass("open");
        $(".toggle-sub-nav").removeClass("open");
    }

}(jQuery, window, document));


$("nav:first").accessibleMenu({
    navId: "#navigation",
    /* prefix for generated unique id attributes, which are required 
       to indicate aria-owns, aria-controls and aria-labelledby */
    uuidPrefix: "accessible-menu",
    /* css class used to define the megamenu styling */
    menuClass: "nav-menu",
    /* css class for a top-level navigation item in the megamenu */
    topNavItemClass: "nav-item",
    /* css class for a megamenu panel */
    panelClass: "sub-nav",
    /* css class for a group of items within a megamenu panel */
    panelGroupClass: "sub-nav-group",
    /* css class for the hover state */
    hoverClass: "hover",
    /* css class for the focus state */
    focusClass: "focus",
    /* css class for the open state */
    openClass: "open"
});


/* Mobile Controls fix */
$(document).ready(function () {
    $("#navigation .mobile-controls").removeClass("nav-menu");
    $("#navigation .mobile-control a").removeAttr("aria-hidden aria-expanded role id").removeClass("sub-nav with-few-items subnav-closed");
    $("#navigation .mobile-control .sr-only").removeAttr("aria-hidden aria-expanded role id").removeClass("sub-nav with-few-items subnav-closed");
});

/* -----------------------------------------
   Navigation accessibility fixes
----------------------------------------- */

setTimeout(function () {
    // Navigation vars
    var $navigation = $("#navigation");
    var $navItems = $navigation.find('.nav-item');
    var FirstLevelLink = $navItems.find('a.first-level-link');

    // Function checks if first nav link has sub-navigation, if not then code removes unnecessary aria-expanded attribute

    FirstLevelLink.each(function () {
        if (!$(this).siblings('.sub-nav').length) {

            $(this).removeAttr("aria-expanded");
            $(this).on("mouseover", function (e) {
                e.stopPropagation();
            });
            $(this).on("mouseout", function (e) {
                e.stopPropagation();
            });
        }
    });
}, 2000);
