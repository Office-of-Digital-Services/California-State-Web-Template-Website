/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

/**
  * ------------------------------------------------------------------------
  * Constants
  * ------------------------------------------------------------------------
  */

var NAME$9 = 'tab';
var VERSION$9 = '4.3.1';
var DATA_KEY$9 = 'bs.tab';
var EVENT_KEY$9 = "." + DATA_KEY$9;
var DATA_API_KEY$7 = '.data-api';
var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
var Event$9 = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
};
var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
};
var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

};

var Tab =
    /*#__PURE__*/
    function () {
        function Tab(element) {
            this._element = element;
        } // Getters


        var _proto = Tab.prototype;

        // Public
        _proto.show = function show() {
            var _this = this;

            if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
                return;
            }

            var target;
            var previous;
            var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
            var selector = Util.getSelectorFromElement(this._element);

            if (listElement) {
                var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
                previous = $.makeArray($(listElement).find(itemSelector));
                previous = previous[previous.length - 1];
            }

            var hideEvent = $.Event(Event$9.HIDE, {
                relatedTarget: this._element
            });
            var showEvent = $.Event(Event$9.SHOW, {
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
                var hiddenEvent = $.Event(Event$9.HIDDEN, {
                    relatedTarget: _this._element
                });
                var shownEvent = $.Event(Event$9.SHOWN, {
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

            var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
            var active = activeElements[0];
            var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

            var complete = function complete() {
                return _this2._transitionComplete(element, active, callback);
            };

            if (active && isTransitioning) {
                var transitionDuration = Util.getTransitionDurationFromElement(active);
                $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            } else {
                complete();
            }
        };

        _proto._transitionComplete = function _transitionComplete(element, active, callback) {
            if (active) {
                $(active).removeClass(ClassName$9.ACTIVE);
                var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

                if (dropdownChild) {
                    $(dropdownChild).removeClass(ClassName$9.ACTIVE);
                }

                if (active.getAttribute('role') === 'tab') {
                    active.setAttribute('aria-selected', false);
                }
            }

            $(element).addClass(ClassName$9.ACTIVE);

            if (element.getAttribute('role') === 'tab') {
                element.setAttribute('aria-selected', true);
            }

            Util.reflow(element);

            if (element.classList.contains(ClassName$9.FADE)) {
                element.classList.add(ClassName$9.SHOW);
            }

            if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
                var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

                if (dropdownElement) {
                    var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
                    $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
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


$(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
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