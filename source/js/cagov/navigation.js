/* -----------------------------------------
   NAVIGATION - /source/js/cagov/navigation.js
----------------------------------------- */


/*
 * ES2015 accessible accordion system, using ARIA
 * Website: https://van11y.net/accessible-accordion/
 * License MIT: https://github.com/nico3333fr/van11y-accessible-accordion-aria/blob/master/LICENSE
 */
'use strict';

//JQUERY replacement helpers
//var matches = function(el, selector) {
//    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
//};
//var defaultActiveLink = "About";
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

//var unSelectHeaders = function unSelectHeaders(elts, attrSelected) {
//    elts.forEach(function (header_node) {
//        setAttributes(header_node, _defineProperty({}, attrSelected, 'false'));
//    });
//};
/*
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
*/
var plugin = function plugin() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    // Findig if first-level-link has sub-nav then changing its clasee to first-level-btn
    var $navigation = $('.main-navigation'),
        //$navItems = $navigation.find('.first-level-link'),
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
        ATTR_MULTISELECTABLE: 'data-multiselectable',
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
            //var $navigation = $('.main-navigation');
            var navItemsWithSubs2 = $navigation.find('.sub-nav').siblings('a');
            navItemsWithSubs2.attr("class", "first-level-btn");
            var childClassName = navItemsWithSubs2.attr('class');

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

            var $listAccordionsHeader = [].slice.call(accordion_node.querySelectorAll('.' + childClassName));
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
                addClass(accordionButton, childClassName);
                addClass(accordionButton, prefixClassName + CONFIG.ACCORDION_HEADER_STYLE);
                setAttributes(accordionButton, (_setAttributes2 = {}, _defineProperty(_setAttributes2, 'id', CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_BUTTON_ID + indexHeaderLisible), _defineProperty(_setAttributes2, CONFIG.ATTR_CONTROLS, CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_PANEL_ID + indexHeaderLisible), _defineProperty(_setAttributes2, DATA_HASH_ID, HASH_ID), _setAttributes2));

                // place button
                header_node.innerHTML = '';
                header_node.appendChild(accordionButton);

                // move title into panel
                //accordionPanel.insertBefore(header_node, accordionPanel.firstChild);
                // set title with attributes
                addClass(header_node, prefixClassName + CONFIG.ACCORDION_TITLE_STYLE);
                removeClass(header_node, childClassName);

                // set attributes to panels
                addClass(accordionPanel, prefixClassName + CONFIG.ACCORDION_PANEL_STYLE);
                setAttributes(accordionPanel, (_setAttributes3 = {}, _defineProperty(_setAttributes3, CONFIG.ATTR_ROLE, CONFIG.ACCORDION_ROLE_TABPANEL), _defineProperty(_setAttributes3, CONFIG.ATTR_LABELLEDBY, CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_BUTTON_ID + indexHeaderLisible), _defineProperty(_setAttributes3, 'id', CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_PANEL_ID + indexHeaderLisible), _defineProperty(_setAttributes3, DATA_HASH_ID, HASH_ID), _setAttributes3));

                if (accordionOpenedAttribute === 'true') {
                    accordionButton.setAttribute(CONFIG.ATTR_EXPANDED, 'true');
                    header_node.removeAttribute(CONFIG.ACCORDION_DATA_OPENED);
                    accordionPanel.setAttribute(CONFIG.ATTR_HIDDEN, 'false');
                    
                    //$(accordionPanel).find(".second-level-link").removeAttr("tabindex"); //JQ
                    accordionPanel.querySelectorAll(".second-level-link").forEach(function(item) {item.removeAttribute('tabindex');}); //JS
                } else {
                    accordionButton.setAttribute(CONFIG.ATTR_EXPANDED, 'false');
                    accordionPanel.setAttribute(CONFIG.ATTR_HIDDEN, 'true');
                    // making sure all second level links are not tabable
                    
                    //$(accordionPanel).find(".second-level-link").attr("tabindex", "-1"); //JQ
                    accordionPanel.querySelectorAll(".second-level-link").forEach(function(item) {item.setAttribute('tabindex', '-1');}); //JS

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
/*
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

                           // unSelectHeaders($accordionAllHeaders, CONFIG.ATTR_SELECTED);

                           // selectHeader(buttonTag, CONFIG.ATTR_SELECTED);
                        })();
                    }
*/
                    // click on button
                    if (hasClass(e.target, 'first-level-btn') === true && eventName === 'click') {
                        (function () {
                            var buttonTag = e.target;
                            var accordionContainer = findById(searchParent(buttonTag, CONFIG.ACCORDION_JS, hashId), hashId);
                            var coolSelectors = CONFIG.ACCORDION_DATA_COOL_SELECTORS === true;
                            var $accordionAllHeaders = [].slice.call(accordionContainer.querySelectorAll('.first-level-btn'));
                            //var accordionMultiSelectable = accordionContainer.getAttribute(CONFIG.ATTR_MULTISELECTABLE);
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
                                //$(destination).addClass("open"); //JQ
                                addClass(destination,"open"); //JS
                                // making second level links tabbable if sub nav panel is opened
                                //$(destination).find(".second-level-link").removeAttr("tabindex"); //JQ
                                destination.querySelectorAll(".second-level-link").forEach(function(item) {item.removeAttribute('tabindex');}); //JS
                            } else {
                                buttonTag.setAttribute(CONFIG.ATTR_EXPANDED, false);
                                destination.setAttribute(CONFIG.ATTR_HIDDEN, true);
                                removeClass(destination,"open"); //JS
                                //$(destination).removeClass("open"); //JQ
                                // adding tabindex to links to make sure they are not tabable if sub nav panel is closed
                                //$(destination).find(".second-level-link").attr("tabindex", "-1");
                                destination.querySelectorAll(".second-level-link").forEach(function(item) {item.setAttribute('tabindex', '-1');}); //JS
                            }

                            if (!mobileView()) {
                                $accordionAllHeaders.forEach(function (header_node) {
                                    //Close all the other panels

                                    var destinationPanel = findById(header_node.getAttribute(CONFIG.ATTR_CONTROLS), hashId);

                                    if (header_node !== buttonTag) {
                                       // header_node.setAttribute(CONFIG.ATTR_SELECTED, false);
                                        header_node.setAttribute(CONFIG.ATTR_EXPANDED, false);
                                        //$(destinationPanel).removeClass("open"); //JQ

                                        removeClass(destinationPanel,"open"); //JS
                                        //destinationPanel.setAttribute(CONFIG.ATTR_HIDDEN, true);

                                       //Added fix to make closed panels non-tabbable
                                       destinationPanel.querySelectorAll(".second-level-link").forEach(function(item) {item.setAttribute('tabindex', '-1');}); //JS
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
    //JS
    document.querySelectorAll(".first-level-btn").forEach(function(el) {el.setAttribute("aria-expanded", "false");});
    document.querySelectorAll(".sub-nav").forEach(function(el) {
        el.setAttribute("aria-hidden", "true");
        removeClass(el,"open");
    });
    document.querySelectorAll(".second-level-link").forEach(function(el) {el.setAttribute("tabindex", "-1");});

    if (window.innerWidth <= 991) {
        document.querySelectorAll(".rotate").forEach(function(el) {el.style.display="block";});
     } else {
        document.querySelectorAll(".rotate").forEach(function(el) {el.style.display="none";});
        var nav = document.querySelector("#navigation");
        removeClass(nav,"collapse");
        nav.removeAttribute("aria-hidden");
    }

    //JQ
    //$(".first-level-btn").attr("aria-expanded", "false");
    // // $(".first-level-btn").attr("aria-selected", "false");
    //$(".sub-nav").attr("aria-hidden", "true").removeClass("open");
    //$(".second-level-link").attr("tabindex", "-1");
    //var $toggleSubNav = $('<div class="ca-gov-icon-caret-right rotate" aria-hidden="true"></div>');
    
    //if (window.innerWidth <= 991) {
    //    //$('.has-sub').append($toggleSubNav);
    //    $(".rotate").css("display", "block");
    // }
    //else {
    //    $("#navigation").removeClass("collapse").removeAttr("aria-hidden");
    //    $(".rotate").css("display", "none");
   // }

}

var mobileView = function() {
    //JQ
    //return $('.global-header .mobile-controls').css('display') !== "none"; // mobile view uses arrow to show subnav instead of first touch
    //JS
    return getComputedStyle(document.querySelector('.global-header .mobile-controls'))['display'] !== 'none';
};

function AlmostJQueryDocumentReady(callbackFunction){
    if(document.readyState != 'loading')
        callbackFunction();
    else
        document.addEventListener("DOMContentLoaded", callbackFunction);
}

// Remove href if <a> has a link
AlmostJQueryDocumentReady(function () { //JS
//$(document).ready(function () { //JQ
    var navigationJS = document.querySelector(".main-navigation");

    var subnavbtnJS = document.querySelectorAll(".main-navigation .nav-item a.has-sub-btn");
    subnavbtnJS.forEach(function (item) {
        // Change <a> tag to div since you can't place button into <a> tag
        var newDiv = document.createElement("div");
        newDiv.innerHTML = item.innerHTML;
        newDiv.classList.add('has-sub-btn');
        item.replaceWith(newDiv);
    });

    // Change <a> tag to div since you can't place button into <a> tag
    /*
     //JQ//
    var subnavbtn = $(".nav-item .has-sub-btn");
    $(".has-sub-btn").removeAttr("href");
    subnavbtn.replaceWith(function () {
        
        return $('<div/>', {
            class: 'has-sub-btn',
            html: this.innerHTML
        });
    });
    */

    if (mobileView()) {
        //JS
        navigationJS.classList.add('collapse');
        /*
        JQ
        $('#navigation').addClass('collapse');
        $('#navigation').addClass('collapse');
        */
    }

    // Variables JQ
    //var $navigation = $('.main-navigation'),
        //$navItems = $navigation.find('.nav-item'), // JQ first level link containers'
        //$navItemsWithSubs = $navItems.has('.sub-nav'), //JQ
        //$subNavs = $navigation.find('.sub-nav'),//JQ
        //megamenu = $navigation.hasClass('megadropdown'),//JQ
        //dropdown = $navigation.hasClass('dropdown'),//JQ
     //   singleLevel = $navigation.hasClass('singleLevel'),
     //   setActiveLinkByFolder = $navigation.hasClass('auto-highlight'); // Use new folder matching method to highlight the current navigation tab

    // Variables JS

    var singleLevel = navigationJS.classList.contains('singleLevel');
    var setActiveLinkByFolder = navigationJS.classList.contains('auto-highlight');

    var navItemsJS = document.querySelectorAll(".main-navigation .nav-item");
    var navItemsWithSubsJS = [].slice.call(document.querySelectorAll(".main-navigation .nav-item")).filter(function (x) {return x.querySelector('.sub-nav');});

    // HIGHLIGHT APPROPRIATE NAV ITEM
    var reMainNav = "";
    if (typeof defaultActiveLink !== "undefined") { //Globally set var
        // eslint-disable-next-line no-undef
        reMainNav = new RegExp("^" + defaultActiveLink + "$", "i"); // Regex for finding the index of the default main list item
    }

    navItemsJS.forEach(function (navItem) {
        var link = navItem.querySelector(".first-level-btn, .first-level-link");

        if (reMainNav) {
            if (link.textContent.match(reMainNav)) {
                navItem.classList.add('active');
            }
        } else if (setActiveLinkByFolder && link.getAttribute('href')) {
            var arrNavLink = link.getAttribute('href').split("/");
            var arrCurrentURL = location.href.split("/");

            if (arrNavLink.length > 4 && arrCurrentURL[3] === arrNavLink[3]) { // folder of current URL matches this nav link
            //if (arrNavLink.length > 1 && arrNavLink[arrNavLink.length - 1].trim().toLowerCase() === arrCurrentURL[arrCurrentURL.length - 1].trim().toLowerCase() ) { 
                // folder of current URL matches this nav link
                navItem.classList.add('active');
            }
        }
    });
    
    /* JQ
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
*/

    // Reset if click outside of nav
    document.addEventListener("mouseup", function (e) { //JS
    //$(document).mouseup(function (e) { //JQ

        //var navContainer = $(".main-navigation"); //JQ
        var navContainer = document.querySelector(".main-navigation"); //JS

        // if the target of the click isn't the navigation container nor a descendant of the navigation
        //if (!navContainer.is(e.target) && navContainer.has(e.target).length === 0) { //JQ
        if (navContainer !== e.target && !navContainer.contains(e.target)) { //JS
            NavReset();
        }
    //}); //JQ
    }); //JS


    // Nav items with subs
    //JQ
    //$navItemsWithSubs.each(function () {
    //    var itemCount = $(this).find('.second-level-nav > li').length;
    //    if (itemCount <= 2) {
    //        $(this).find('.sub-nav').addClass('with-few-items');
    //    }
    //});
    //JS
    navItemsWithSubsJS.forEach(function(el) {
        var itemCount = el.querySelectorAll('.second-level-nav > li').length;
        if (itemCount <= 2) {
            var subnav = el.querySelector('.sub-nav');
            addClass(subnav,'with-few-items');
        }
    });


    // Add class has-sub, then add carrots
    if (!singleLevel) {
        //$navItemsWithSubs.each(function () { //JQ
        
            //$(this).find('.first-level-btn').addClass('has-sub'); //JQ
            document.querySelectorAll(".first-level-btn").forEach(function(el) { //JS
                addClass(el,"has-sub"); //JS

                //JQ
                //var carrot = $('<span class="ca-gov-icon-triangle-down carrot" aria-hidden="true"></span>');
                //var $toggleSubNav = $('<div class="ca-gov-icon-caret-right rotate" aria-hidden="true"></div>');
                
                //if (mobileView()) {
                //    $toggleSubNav.css("display", "block");
                //  } else {
                //    $toggleSubNav.css("display", "none");
                //}
                //$(this).find('.has-sub').append($toggleSubNav);
                //$(this).find('.has-sub').append(carrot);


                //JS
                var carrot = document.createElement("span");
                addClass(carrot,"ca-gov-icon-triangle-down");
                addClass(carrot,"carrot");
                carrot.setAttribute("aria-hidden","true");

                var $toggleSubNav = document.createElement("div");
                addClass($toggleSubNav,"ca-gov-icon-caret-right");
                addClass($toggleSubNav,"rotate");
                $toggleSubNav.setAttribute("aria-hidden","true");

                if (mobileView()) {
                    $toggleSubNav.style.display="block";
                } else {
                    $toggleSubNav.style.display="none";
                }

                el.appendChild($toggleSubNav);
                el.appendChild(carrot);
            });
        //}); //JQ
    }

    // Addig class first-level-btn to first-level-link to make sure left and right keyboard keys work for all navigation links
  //$(".first-level-link").addClass("first-level-btn");

});

// Do Navigation Reset function on window resize uless it's mobile device.
window.addEventListener('resize', function() { //JS
//$(window).on('resize', function () { //JQ
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
//JS
        document.querySelector(".toggle-menu").setAttribute("aria-expanded","false");

        //Collapse the nav when narrow
        var nav = document.querySelector("#navigation");
        addClass(nav,"collapse");
        removeClass(nav,"show");
        nav.setAttribute("aria-hidden", "true");

//JQ
        //$("#navigation").addClass("collapse").removeClass("show").attr("aria-hidden", "true");
        //$(".toggle-menu").attr('aria-expanded', 'false');

        NavReset();
    }

});

// Reset on escape
//JQ
//$(document).keyup(function (e) {
//    if (e.keyCode === 27) {
//        NavReset();
//    }
//});
//JS
document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
        NavReset();
    }
});


/* Mobile Controls fix */
//Doesn't appear to do anything
//$(document).ready(function () {
    //$("#navigation .mobile-controls").removeClass("nav-menu");
    //$("#navigation .mobile-control a").removeAttr("aria-hidden aria-expanded role id").removeClass("sub-nav with-few-items subnav-closed");
    //$("#navigation .mobile-control .sr-only").removeAttr("aria-hidden aria-expanded role id").removeClass("sub-nav with-few-items subnav-closed");
//});