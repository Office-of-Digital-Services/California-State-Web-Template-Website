/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.0): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

/**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

var NAME$9 = 'tab';
var VERSION$9 = '4.5.0';
var DATA_KEY$9 = 'bs.tab';
var EVENT_KEY$9 = "." + DATA_KEY$9;
var DATA_API_KEY$7 = '.data-api';
var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
var CLASS_NAME_ACTIVE$3 = 'active';
var CLASS_NAME_DISABLED$1 = 'disabled';
var CLASS_NAME_FADE$4 = 'fade';
var CLASS_NAME_SHOW$6 = 'show';
var SELECTOR_DROPDOWN$1 = '.dropdown';
var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
var SELECTOR_ACTIVE$2 = '.active';
var SELECTOR_ACTIVE_UL = '> li > .active';
var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
var SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Tab = /*#__PURE__*/function () {
    function Tab(element) {
        this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(CLASS_NAME_ACTIVE$3) || $(this._element).hasClass(CLASS_NAME_DISABLED$1)) {
            return;
        }

        var target;
        var previous;
        var listElement = $(this._element).closest(SELECTOR_NAV_LIST_GROUP$1)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
            var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$2;
            previous = $.makeArray($(listElement).find(itemSelector));
            previous = previous[previous.length - 1];
        }

        var hideEvent = $.Event(EVENT_HIDE$3, {
            relatedTarget: this._element
        });
        var showEvent = $.Event(EVENT_SHOW$3, {
            relatedTarget: previous
        });

        if (previous) {
            $(previous).trigger(hideEvent);
        }

        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
            return;
        }

        if (selector) {
            target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
            var hiddenEvent = $.Event(EVENT_HIDDEN$3, {
                relatedTarget: _this._element
            });
            var shownEvent = $.Event(EVENT_SHOWN$3, {
                relatedTarget: previous
            });
            $(previous).trigger(hiddenEvent);
            $(_this._element).trigger(shownEvent);
        };

        if (target) {
            this._activate(target, target.parentNode, complete);
        } else {
            complete();
        }
    };

    _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$9);
        this._element = null;
    } // Private
        ;

    _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(SELECTOR_ACTIVE_UL) : $(container).children(SELECTOR_ACTIVE$2);
        var active = activeElements[0];
        var isTransitioning = callback && active && $(active).hasClass(CLASS_NAME_FADE$4);

        var complete = function complete() {
            return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
            var transitionDuration = Util.getTransitionDurationFromElement(active);
            $(active).removeClass(CLASS_NAME_SHOW$6).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
            complete();
        }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
            $(active).removeClass(CLASS_NAME_ACTIVE$3);
            var dropdownChild = $(active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];

            if (dropdownChild) {
                $(dropdownChild).removeClass(CLASS_NAME_ACTIVE$3);
            }

            if (active.getAttribute('role') === 'tab') {
                active.setAttribute('aria-selected', false);
            }
        }

        $(element).addClass(CLASS_NAME_ACTIVE$3);

        if (element.getAttribute('role') === 'tab') {
            element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);

        if (element.classList.contains(CLASS_NAME_FADE$4)) {
            element.classList.add(CLASS_NAME_SHOW$6);
        }

        if (element.parentNode && $(element.parentNode).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
            var dropdownElement = $(element).closest(SELECTOR_DROPDOWN$1)[0];

            if (dropdownElement) {
                var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE$1));
                $(dropdownToggleList).addClass(CLASS_NAME_ACTIVE$3);
            }

            element.setAttribute('aria-expanded', true);
        }

        if (callback) {
            callback();
        }
    } // Static
        ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(DATA_KEY$9);

            if (!data) {
                data = new Tab(this);
                $this.data(DATA_KEY$9, data);
            }

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                }

                data[config]();
            }
        });
    };

    _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
            return VERSION$9;
        }
    }]);

    return Tab;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


$(document).on(EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME$9] = Tab._jQueryInterface;
$.fn[NAME$9].Constructor = Tab;

$.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
};