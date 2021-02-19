/* -----------------------------------------
   NAVIGATION - /source/js/cagov/navigation.js
----------------------------------------- */


/*
 * ES2015 accessible accordion system, using ARIA
 * Website: https://van11y.net/accessible-accordion/
 * License MIT: https://github.com/nico3333fr/van11y-accessible-accordion-aria/blob/master/LICENSE
 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var loadConfig = function loadConfig() {

    var CACHE = {};

    var set = function set(id, config) {

        CACHE[id] = config;
    };
    var get = function get(id) {
        return CACHE[id];
    };
    var remove = function remove(id) {
        return CACHE[id];
    };

    return {
        set: set,
        get: get,
        remove: remove
    };
};

var DATA_HASH_ID = 'data-nav-id';

var pluginConfig = loadConfig();

/** Find an element based on an Id
 * @param  {String} id Id to find
 * @param  {String} hash hash id (not mandatory)
 * @return {Node} the element with the specified id
 */
var findById = function findById(id, hash) {
    return document.querySelector('#' + id + '[' + DATA_HASH_ID + '="' + hash + '"]');
};

/** add a class to a node
 * @param  {Node} el node to attach class
 * @param  {String} className the class to add
 */
var addClass = function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className); // IE 10+
    } else {
        el.className += ' ' + className; // IE 8+
    }
};

/** remove class from node
 * @param  {Node} el node to remove class
 * @param  {String} className the class to remove
 */
var removeClass = function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className); // IE 10+
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '); // IE 8+
    }
};

// check if node has specified class
// @param  {Node} el node to check
// @param  {String} className the class

var hasClass = function hasClass(el, className) {
    if (el.classList) {
        return el.classList.contains(className); // IE 10+
    } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className); // IE 8+ ?
    }
};

var setAttributes = function setAttributes(node, attrs) {
    Object.keys(attrs).forEach(function (attribute) {
        node.setAttribute(attribute, attrs[attribute]);
    });
};

/** search if element is or is contained in another element with attribute data-nav-id
 * @param  {Node} el element (node)
 * @param  {String} hashId the attribute data-hashtooltip-id
 * @return {String} the value of attribute data-hashtooltip-id
 */
var searchParentHashId = function searchParentHashId(el, hashId) {
    var found = false;

    var parentElement = el;
    while (parentElement.nodeType === 1 && parentElement && found === false) {

        if (parentElement.hasAttribute(hashId) === true) {
            found = true;
        } else {
            parentElement = parentElement.parentNode;
        }
    }
    if (found === true) {
        return parentElement.getAttribute(hashId);
    } else {
        return '';
    }
};
var searchParent = function searchParent(el, parentClass, hashId) {
    var found = false;

    var parentElement = el;
    while (parentElement && found === false) {
        if (hasClass(parentElement, parentClass) === true && parentElement.getAttribute(DATA_HASH_ID) === hashId) {
            found = true;
        } else {
            parentElement = parentElement.parentNode;
        }
    }
    if (found === true) {
        return parentElement.getAttribute('id');
    } else {
        return '';
    }
};

var unSelectHeaders = function unSelectHeaders(elts, attrSelected) {
    elts.forEach(function (header_node) {
        setAttributes(header_node, _defineProperty({}, attrSelected, 'false'));
    });
};

var selectHeader = function selectHeader(el, attrSelected) {
    el.setAttribute(attrSelected, true);
};

var selectHeaderInList = function selectHeaderInList(elts, param, attrSelected) {
    var indice_trouve = undefined;
    elts.forEach(function (header_node, index) {

        if (header_node.getAttribute(attrSelected) === 'true') {
            indice_trouve = index;
        }
    });

    if (param === 'next') {
        selectHeader(elts[indice_trouve + 1]);
        setTimeout(function () {
            elts[indice_trouve + 1].focus();
        }, 0);
    }
    if (param === 'prev') {
        selectHeader(elts[indice_trouve - 1]);
        setTimeout(function () {
            elts[indice_trouve - 1].focus();
        }, 0);
    }
};

var plugin = function plugin() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    // Findig if first-level-link has sub-nav then changing its clasee to first-level-btn
    var $navigation = $('.main-navigation'),
        $navItems = $navigation.find('.first-level-link'),
        $navItemsWithSubs = $navigation.find('.sub-nav').siblings('.first-level-link');
    $navItemsWithSubs.attr("class", "first-level-btn");
    var className = $navItemsWithSubs.attr('class');

    var CONFIG = _extends({
        ACCORDION_JS: 'main-navigation',
        ACCORDION_JS_HEADER: className, // Assigning button class to link that has sub-nav
        ACCORDION_JS_PANEL: 'nav-panel',

        ACCORDION_DATA_PREFIX_CLASS: 'data-nav-prefix-classes',
        ACCORDION_DATA_OPENED: 'data-nav-opened',
        ACCORDION_DATA_MULTISELECTABLE: 'data-nav-multiselectable',
        ACCORDION_DATA_COOL_SELECTORS: true,

        ACCORDION_PREFIX_IDS: 'nav',
        ACCORDION_BUTTON_ID: '_tab',
        ACCORDION_PANEL_ID: '_panel',

        ACCORDION_STYLE: 'nav',
        ACCORDION_TITLE_STYLE: 'has-sub-btn',
        ACCORDION_HEADER_STYLE: 'nav-header',
        ACCORDION_PANEL_STYLE: 'sub-nav',

        ACCORDION_ROLE_TABLIST: 'tablist',
        ACCORDION_ROLE_TAB: 'tab',
        ACCORDION_ROLE_TABPANEL: 'tabpanel',

        ATTR_ROLE: 'role',
        ATTR_MULTISELECTABLE: 'aria-multiselectable',
        ATTR_EXPANDED: 'aria-expanded',
        ATTR_LABELLEDBY: 'aria-labelledby',
        ATTR_HIDDEN: 'aria-hidden',
        ATTR_CONTROLS: 'aria-controls',
        ATTR_SELECTED: 'aria-selected'
    }, config);

    var HASH_ID = Math.random().toString(32).slice(2, 12);

    pluginConfig.set(HASH_ID, CONFIG);
    // Find all accordions inside a container
    // @param  {Node} node Default document
    // @return {Array}
    var $listAccordions = function $listAccordions() {
        var node = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        return [].slice.call(node.querySelectorAll('.' + CONFIG.ACCORDION_JS));
    };

    // Build accordions for a container
    // @param  {Node} node
    // @param  {addListeners} boolean
    var attach = function attach(node) {

        $listAccordions(node).forEach(function (accordion_node) {

            var iLisible = 'z' + Math.random().toString(32).slice(2, 12); // avoid selector exception when starting by a number
            var prefixClassName = accordion_node.hasAttribute(CONFIG.ACCORDION_DATA_PREFIX_CLASS) === true ? accordion_node.getAttribute(CONFIG.ACCORDION_DATA_PREFIX_CLASS) + '-' : '';
            var coolSelectors = CONFIG.ACCORDION_DATA_COOL_SELECTORS === true;

            // Findig if first-level-link has sub-nav then changing its class to first-level-btn
            var $navigation = $('.main-navigation'),
                $navItems = $navigation.find('.first-level-link'),
                $navItemsWithSubs = $navigation.find('.sub-nav').siblings('a');
            $navItemsWithSubs.attr("class", "first-level-btn");
            var className = $navItemsWithSubs.attr('class');

            // Init attributes accordion
            if (!mobileView()) {
                accordion_node.setAttribute(CONFIG.ATTR_MULTISELECTABLE, 'false');
            } else {
                accordion_node.setAttribute(CONFIG.ATTR_MULTISELECTABLE, 'true');
            }
           // accordion_node.setAttribute(CONFIG.ATTR_ROLE, CONFIG.ACCORDION_ROLE_TABLIST);
            // We already have main navigation id
            // accordion_node.setAttribute('id', iLisible);
            accordion_node.setAttribute(DATA_HASH_ID, HASH_ID);

            addClass(accordion_node, prefixClassName + CONFIG.ACCORDION_STYLE);

            var $listAccordionsHeader = [].slice.call(accordion_node.querySelectorAll('.' + className));
            $listAccordionsHeader.forEach(function (header_node, index_header) {
                var _setAttributes2, _setAttributes3;

                // if we do not have cool selectors enabled,
                // it is not a direct child, we ignore it
                if (header_node.parentNode !== accordion_node && coolSelectors === false) {
                    return;
                }

                var indexHeaderLisible = index_header + 1;
                var accordionPanel = header_node.nextElementSibling;
                var accordionHeaderText = header_node.innerHTML;
                var accordionButton = document.createElement("BUTTON");
                var accordionOpenedAttribute = header_node.hasAttribute(CONFIG.ACCORDION_DATA_OPENED) === true ? header_node.getAttribute(CONFIG.ACCORDION_DATA_OPENED) : '';

                // set button with attributes
                accordionButton.innerHTML = accordionHeaderText;
                addClass(accordionButton, className);
                addClass(accordionButton, prefixClassName + CONFIG.ACCORDION_HEADER_STYLE);
                setAttributes(accordionButton, (_setAttributes2 = {}, _defineProperty(_setAttributes2, CONFIG.ATTR_ROLE, CONFIG.ACCORDION_ROLE_TAB), _defineProperty(_setAttributes2, 'id', CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_BUTTON_ID + indexHeaderLisible), _defineProperty(_setAttributes2, CONFIG.ATTR_CONTROLS, CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_PANEL_ID + indexHeaderLisible), _defineProperty(_setAttributes2, CONFIG.ATTR_SELECTED, 'false'), _defineProperty(_setAttributes2, 'type', 'button'), _defineProperty(_setAttributes2, DATA_HASH_ID, HASH_ID), _setAttributes2));

                // place button
                header_node.innerHTML = '';
                header_node.appendChild(accordionButton);

                // move title into panel
                //accordionPanel.insertBefore(header_node, accordionPanel.firstChild);
                // set title with attributes
                addClass(header_node, prefixClassName + CONFIG.ACCORDION_TITLE_STYLE);
                removeClass(header_node, className);

                // set attributes to panels
                addClass(accordionPanel, prefixClassName + CONFIG.ACCORDION_PANEL_STYLE);
                setAttributes(accordionPanel, (_setAttributes3 = {}, _defineProperty(_setAttributes3, CONFIG.ATTR_ROLE, CONFIG.ACCORDION_ROLE_TABPANEL), _defineProperty(_setAttributes3, CONFIG.ATTR_LABELLEDBY, CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_BUTTON_ID + indexHeaderLisible), _defineProperty(_setAttributes3, 'id', CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_PANEL_ID + indexHeaderLisible), _defineProperty(_setAttributes3, DATA_HASH_ID, HASH_ID), _setAttributes3));

                if (accordionOpenedAttribute === 'true') {
                    accordionButton.setAttribute(CONFIG.ATTR_EXPANDED, 'true');
                    header_node.removeAttribute(CONFIG.ACCORDION_DATA_OPENED);
                    accordionPanel.setAttribute(CONFIG.ATTR_HIDDEN, 'false');
                    //  $(accordionPanel).addClass("open");
                    $(accordionPanel).find(".second-level-link").removeAttr("tabindex");
                } else {
                    accordionButton.setAttribute(CONFIG.ATTR_EXPANDED, 'false');
                    accordionPanel.setAttribute(CONFIG.ATTR_HIDDEN, 'true');
                    // making sure all second level links are not tabable
                    //  $(accordionPanel).removeClass("open");
                    $(accordionPanel).find(".second-level-link").attr("tabindex", "-1");
                }
            });
        });
    };

    return {
        attach: attach
        /*,
                destroy*/
    };
};

var main = function main() {

    /* listeners for all configs */
    ['click', 'keydown', 'focus'].forEach(function (eventName) {

        document.body.addEventListener(eventName, function (e) {

            var hashId = searchParentHashId(e.target, DATA_HASH_ID); //e.target.dataset.hashId;
            // search if click on button or on element in a button contains data-hash-id (it is needed to load config and know which class to search)



            if (hashId !== '') {
                (function () {

                    // loading config from element
                    var CONFIG = pluginConfig.get(hashId);

                    // focus on button
                    if (hasClass(e.target, 'first-level-btn') === true && eventName === 'focus') {
                        (function () {
                            var buttonTag = e.target;
                            var accordionContainer = findById(searchParent(buttonTag, CONFIG.ACCORDION_JS, hashId), hashId);
                            var coolSelectors = CONFIG.ACCORDION_DATA_COOL_SELECTORS === true;
                            var $accordionAllHeaders = [].slice.call(accordionContainer.querySelectorAll('.first-level-btn'));

                            if (coolSelectors === false) {
                                $accordionAllHeaders = $accordionAllHeaders.filter(function (element) {
                                    return element.parentNode.parentNode === accordionContainer;
                                });
                            }

                            unSelectHeaders($accordionAllHeaders, CONFIG.ATTR_SELECTED);

                            selectHeader(buttonTag, CONFIG.ATTR_SELECTED);
                        })();
                    }

                    // click on button
                    if (hasClass(e.target, 'first-level-btn') === true && eventName === 'click') {
                        (function () {
                            var buttonTag = e.target;
                            var accordionContainer = findById(searchParent(buttonTag, CONFIG.ACCORDION_JS, hashId), hashId);
                            var coolSelectors = CONFIG.ACCORDION_DATA_COOL_SELECTORS === true;
                            var $accordionAllHeaders = [].slice.call(accordionContainer.querySelectorAll('.first-level-btn'));
                            var accordionMultiSelectable = accordionContainer.getAttribute(CONFIG.ATTR_MULTISELECTABLE);
                            var destination = findById(buttonTag.getAttribute(CONFIG.ATTR_CONTROLS), hashId);
                            var stateButton = buttonTag.getAttribute(CONFIG.ATTR_EXPANDED);


                            if (coolSelectors === false) {
                                $accordionAllHeaders = $accordionAllHeaders.filter(function (element) {
                                    return element.parentNode.parentNode === accordionContainer;
                                });
                            }

                            // if closed
                            if (stateButton === 'false') {
                                buttonTag.setAttribute(CONFIG.ATTR_EXPANDED, true);
                                destination.removeAttribute(CONFIG.ATTR_HIDDEN);
                                $(destination).addClass("open");
                                // making second level links tabbable if sub nav panel is opened
                                $(destination).find(".second-level-link").removeAttr("tabindex");
                            } else {
                                buttonTag.setAttribute(CONFIG.ATTR_EXPANDED, false);
                                destination.setAttribute(CONFIG.ATTR_HIDDEN, true);
                                $(destination).removeClass("open");
                                // adding tabindex to links to make sure they are not tabable if sub nav panel is closed
                                $(destination).find(".second-level-link").attr("tabindex", "-1");
                            }

                            if (!mobileView()) {
                                $accordionAllHeaders.forEach(function (header_node) {

                                    var destinationPanel = findById(header_node.getAttribute(CONFIG.ATTR_CONTROLS), hashId);

                                    if (header_node !== buttonTag) {
                                        header_node.setAttribute(CONFIG.ATTR_SELECTED, false);
                                        header_node.setAttribute(CONFIG.ATTR_EXPANDED, false);
                                        $(destinationPanel).removeClass("open");
                                       // destinationPanel.setAttribute(CONFIG.ATTR_HIDDEN, true);
                                    } else {
                                        header_node.setAttribute(CONFIG.ATTR_SELECTED, true);
                                    }
                                });
                            }

                            setTimeout(function () {
                                buttonTag.focus();
                            }, 0);
                            e.stopPropagation(); // making icons and other buttons elements clickable  https://css-tricks.com/slightly-careful-sub-elements-clickable-things/
                            e.preventDefault();
                        })();
                    }

                    // keyboard management for headers
                    //if (hasClass(e.target, 'first-level-btn') === true && eventName === 'keydown') {
                    //    (function () {
                    //        var buttonTag = e.target;
                    //        var idAccordionContainer = searchParent(buttonTag, CONFIG.ACCORDION_JS, hashId);
                    //        var accordionContainer = findById(idAccordionContainer, hashId);

                    //        var coolSelectors = CONFIG.ACCORDION_DATA_COOL_SELECTORS === true;
                    //        var $accordionAllHeaders = [].slice.call(accordionContainer.querySelectorAll('.first-level-btn'));

                    //        if (coolSelectors === false) {
                    //            $accordionAllHeaders = $accordionAllHeaders.filter(function (element) {
                    //                return element.parentNode.parentNode === accordionContainer;
                    //            });
                    //        }

                    //        // strike home on a tab => 1st tab
                    //        if (e.keyCode === 36) {
                    //            unSelectHeaders($accordionAllHeaders, CONFIG.ATTR_SELECTED);
                    //            selectHeader($accordionAllHeaders[0], CONFIG.ATTR_SELECTED);
                    //            setTimeout(function () {
                    //                $accordionAllHeaders[0].focus();
                    //            }, 0);
                    //            e.preventDefault();
                    //        }
                    //        // strike end on the tab => last tab
                    //        else if (e.keyCode === 35) {
                    //            unSelectHeaders($accordionAllHeaders, CONFIG.ATTR_SELECTED);
                    //            selectHeader($accordionAllHeaders[$accordionAllHeaders.length - 1], CONFIG.ATTR_SELECTED);
                    //            setTimeout(function () {
                    //                $accordionAllHeaders[$accordionAllHeaders.length - 1].focus();
                    //            }, 0);
                    //            e.preventDefault();
                    //        }
                    //        // strike up or left on the tab => previous tab
                    //        else if ((e.keyCode === 37 || e.keyCode === 38) && !e.ctrlKey) {

                    //            // if first selected = select last
                    //            if ($accordionAllHeaders[0].getAttribute(CONFIG.ATTR_SELECTED) === 'true') {
                    //                unSelectHeaders($accordionAllHeaders, CONFIG.ATTR_SELECTED);
                    //                selectHeader($accordionAllHeaders[$accordionAllHeaders.length - 1], CONFIG.ATTR_SELECTED);
                    //                setTimeout(function () {
                    //                    $accordionAllHeaders[$accordionAllHeaders.length - 1].focus();
                    //                }, 0);
                    //                e.preventDefault();
                    //            } else {
                    //                selectHeaderInList($accordionAllHeaders, 'prev', CONFIG.ATTR_SELECTED);
                    //                e.preventDefault();
                    //            }
                    //        }
                    //        // strike down or right in the tab => next tab
                    //        else if ((e.keyCode === 40 || e.keyCode === 39) && !e.ctrlKey) {

                    //            // if last selected = select first
                    //            if ($accordionAllHeaders[$accordionAllHeaders.length - 1].getAttribute(CONFIG.ATTR_SELECTED) === 'true') {
                    //                unSelectHeaders($accordionAllHeaders, CONFIG.ATTR_SELECTED);
                    //                selectHeader($accordionAllHeaders[0], CONFIG.ATTR_SELECTED);
                    //                setTimeout(function () {
                    //                    $accordionAllHeaders[0].focus();
                    //                }, 0);
                    //                e.preventDefault();
                    //            } else {
                    //                selectHeaderInList($accordionAllHeaders, 'next', CONFIG.ATTR_SELECTED);
                    //                e.preventDefault();
                    //            }
                    //        }
                    //    })();
                    //}
                })();
            }
        }, true);
    });

    return plugin;
};

window.van11yAccessibleAccordionAria = main();

var onLoad = function onLoad() {
    var expand_default = window.van11yAccessibleAccordionAria();
    expand_default.attach();

    document.removeEventListener('DOMContentLoaded', onLoad);
};

document.addEventListener('DOMContentLoaded', onLoad);
//window.addEventListener("resize", navreset);


function NavReset() {
    //RESET
    $(".first-level-btn").attr("aria-expanded", "false");
    $(".first-level-btn").attr("aria-selected", "false");
    $(".sub-nav").attr("aria-hidden", "true").removeClass("open");
    $(".second-level-link").attr("tabindex", "-1");
    var $toggleSubNav = $('<div class="ca-gov-icon-caret-right rotate" aria-hidden="true"></div>');
    if (window.innerWidth <= 991) {
        $('.has-sub').append($toggleSubNav);
        $(".rotate").css("display", "block");
    }
    else {
        $("#navigation").removeClass("collapse").removeAttr("aria-hidden");
        $(".rotate").css("display", "none");
    }

}

function mobileView() {
    return $('.global-header .mobile-controls').css('display') !== "none"; // mobile view uses arrow to show subnav instead of first touch
}

// Remove href if <a> has a link
$(document).ready(function () {
    // Change <a> tag to div since you can't place button into <a> tag
    var subnavbtn = $(".nav-item .has-sub-btn");
    $(".has-sub-btn").removeAttr("href");
    subnavbtn.replaceWith(function () {
        return $('<div/>', {
            class: 'has-sub-btn',
            html: this.innerHTML
        });
    });






    if (mobileView()) {
        $('#navigation').addClass('collapse');
        $('#navigation').addClass('collapse');
    }


    // Variables
    var $navigation = $('.main-navigation'),
        $navItems = $navigation.find('.nav-item'), // first level link containers'
        $navItemsWithSubs = $navItems.has('.sub-nav'),
        $subNavs = $navigation.find('.sub-nav'),
        megamenu = $navigation.hasClass('megadropdown'),
        dropdown = $navigation.hasClass('dropdown'),
        singleLevel = $navigation.hasClass('singleLevel'),
        setActiveLinkByFolder = $navigation.hasClass('auto-highlight'); // Use new folder matching method to highlight the current navigation tab

    // HIGHLIGHT APPROPRIATE NAV ITEM
    var reMainNav = "",
        arrCurrentURL = location.href.split("/");
    if (typeof defaultActiveLink !== "undefined") {
        reMainNav = new RegExp("^" + defaultActiveLink + "$", "i"); // Regex for finding the index of the default main list item
    }
    $navItems.each(function () { // loop through top level links
        var $this = $(this),
            $a = $this.find('.first-level-btn, .first-level-link');

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


    // Reset if click outside of nav
    $(document).mouseup(function (e) {
        var navContainer = $(".main-navigation");

        // if the target of the click isn't the navigation container nor a descendant of the navigation
        if (!navContainer.is(e.target) && navContainer.has(e.target).length === 0) {
            NavReset();
        }
    });


    // Nav items with subs
    $navItemsWithSubs.each(function () {
        var itemCount = $(this).find('.second-level-nav > li').length;
        if (itemCount <= 2) {
            $(this).find('.sub-nav').addClass('with-few-items');
        }
    });


    // Add class has-sub, then add carrots
    if (!singleLevel) {
        $navItemsWithSubs.each(function () {

            $(this).find('.first-level-btn').addClass('has-sub');

            var $toggleSubNav = $('<div class="ca-gov-icon-caret-right rotate" aria-hidden="true"></div>');
            var carrot = $('<span class="ca-gov-icon-triangle-down carrot" aria-hidden="true"></span>');

            if (mobileView()) {
                $(this).find('.has-sub').append($toggleSubNav);
            }
            $(this).find('.has-sub').append(carrot);
        });
    }

    // Addig class first-level-btn to first-level-link to make sure left and right keyboard keys work for all navigation links
  //$(".first-level-link").addClass("first-level-btn");

});

// Do Navigation Reset function on window resize uless it's mobile device.
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
        $("#navigation").addClass("collapse").removeClass("show").attr("aria-hidden", "true");
        $(".toggle-menu").attr('aria-expanded', 'false');
        NavReset();
    }

});

// Reset on escape
$(document).keyup(function (e) {
    if (e.keyCode === 27) {
        NavReset();
    }
});




/* Mobile Controls fix */
$(document).ready(function () {
    $("#navigation .mobile-controls").removeClass("nav-menu");
    $("#navigation .mobile-control a").removeAttr("aria-hidden aria-expanded role id").removeClass("sub-nav with-few-items subnav-closed");
    $("#navigation .mobile-control .sr-only").removeAttr("aria-hidden aria-expanded role id").removeClass("sub-nav with-few-items subnav-closed");
});
