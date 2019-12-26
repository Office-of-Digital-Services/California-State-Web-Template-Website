/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.4.1): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

/**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

var NAME$3 = 'collapse';
var VERSION$3 = '4.4.1';
var DATA_KEY$3 = 'bs.collapse';
var EVENT_KEY$3 = "." + DATA_KEY$3;
var DATA_API_KEY$3 = '.data-api';
var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
var Default$1 = {
    toggle: true,
    parent: ''
};
var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
};
var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
};
var ClassName$3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
};
var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
};
var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Collapse =
    /*#__PURE__*/
    function () {
        function Collapse(element, config) {
            this._isTransitioning = false;
            this._element = element;
            this._config = this._getConfig(config);
            this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
            var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

            for (var i = 0, len = toggleList.length; i < len; i++) {
                var elem = toggleList[i];
                var selector = Util.getSelectorFromElement(elem);
                var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
                    return foundElem === element;
                });

                if (selector !== null && filterElement.length > 0) {
                    this._selector = selector;

                    this._triggerArray.push(elem);
                }
            }

            this._parent = this._config.parent ? this._getParent() : null;

            if (!this._config.parent) {
                this._addAriaAndCollapsedClass(this._element, this._triggerArray);
            }

            if (this._config.toggle) {
                this.toggle();
            }
        } // Getters


        var _proto = Collapse.prototype;

        // Public
        _proto.toggle = function toggle() {
            if ($(this._element).hasClass(ClassName$3.SHOW)) {
                this.hide();
            } else {
                this.show();
            }
        };

        _proto.show = function show() {
            var _this = this;

            if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
                return;
            }

            var actives;
            var activesData;

            if (this._parent) {
                actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
                    if (typeof _this._config.parent === 'string') {
                        return elem.getAttribute('data-parent') === _this._config.parent;
                    }

                    return elem.classList.contains(ClassName$3.COLLAPSE);
                });

                if (actives.length === 0) {
                    actives = null;
                }
            }

            if (actives) {
                activesData = $(actives).not(this._selector).data(DATA_KEY$3);

                if (activesData && activesData._isTransitioning) {
                    return;
                }
            }

            var startEvent = $.Event(Event$3.SHOW);
            $(this._element).trigger(startEvent);

            if (startEvent.isDefaultPrevented()) {
                return;
            }

            if (actives) {
                Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

                if (!activesData) {
                    $(actives).data(DATA_KEY$3, null);
                }
            }

            var dimension = this._getDimension();

            $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
            this._element.style[dimension] = 0;

            if (this._triggerArray.length) {
                $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
            }

            this.setTransitioning(true);

            var complete = function complete() {
                $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
                _this._element.style[dimension] = '';

                _this.setTransitioning(false);

                $(_this._element).trigger(Event$3.SHOWN);
            };

            var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
            var scrollSize = "scroll" + capitalizedDimension;
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            this._element.style[dimension] = this._element[scrollSize] + "px";
        };

        _proto.hide = function hide() {
            var _this2 = this;

            if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
                return;
            }

            var startEvent = $.Event(Event$3.HIDE);
            $(this._element).trigger(startEvent);

            if (startEvent.isDefaultPrevented()) {
                return;
            }

            var dimension = this._getDimension();

            this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
            Util.reflow(this._element);
            $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
            var triggerArrayLength = this._triggerArray.length;

            if (triggerArrayLength > 0) {
                for (var i = 0; i < triggerArrayLength; i++) {
                    var trigger = this._triggerArray[i];
                    var selector = Util.getSelectorFromElement(trigger);

                    if (selector !== null) {
                        var $elem = $([].slice.call(document.querySelectorAll(selector)));

                        if (!$elem.hasClass(ClassName$3.SHOW)) {
                            $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
                        }
                    }
                }
            }

            this.setTransitioning(true);

            var complete = function complete() {
                _this2.setTransitioning(false);

                $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
            };

            this._element.style[dimension] = '';
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        };

        _proto.setTransitioning = function setTransitioning(isTransitioning) {
            this._isTransitioning = isTransitioning;
        };

        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY$3);
            this._config = null;
            this._parent = null;
            this._element = null;
            this._triggerArray = null;
            this._isTransitioning = null;
        } // Private
            ;

        _proto._getConfig = function _getConfig(config) {
            config = _objectSpread2({}, Default$1, {}, config);
            config.toggle = Boolean(config.toggle); // Coerce string values

            Util.typeCheckConfig(NAME$3, config, DefaultType$1);
            return config;
        };

        _proto._getDimension = function _getDimension() {
            var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
            return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
        };

        _proto._getParent = function _getParent() {
            var _this3 = this;

            var parent;

            if (Util.isElement(this._config.parent)) {
                parent = this._config.parent; // It's a jQuery object

                if (typeof this._config.parent.jquery !== 'undefined') {
                    parent = this._config.parent[0];
                }
            } else {
                parent = document.querySelector(this._config.parent);
            }

            var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
            var children = [].slice.call(parent.querySelectorAll(selector));
            $(children).each(function (i, element) {
                _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
            });
            return parent;
        };

        _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
            var isOpen = $(element).hasClass(ClassName$3.SHOW);

            if (triggerArray.length) {
                $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
            }
        } // Static
            ;

        Collapse._getTargetFromElement = function _getTargetFromElement(element) {
            var selector = Util.getSelectorFromElement(element);
            return selector ? document.querySelector(selector) : null;
        };

        Collapse._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data(DATA_KEY$3);

                var _config = _objectSpread2({}, Default$1, {}, $this.data(), {}, typeof config === 'object' && config ? config : {});

                if (!data && _config.toggle && /show|hide/.test(config)) {
                    _config.toggle = false;
                }

                if (!data) {
                    data = new Collapse(this, _config);
                    $this.data(DATA_KEY$3, data);
                }

                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }

                    data[config]();
                }
            });
        };

        _createClass(Collapse, null, [{
            key: "VERSION",
            get: function get() {
                return VERSION$3;
            }
        }, {
            key: "Default",
            get: function get() {
                return Default$1;
            }
        }]);

        return Collapse;
    }();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


$(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
        var $target = $(this);
        var data = $target.data(DATA_KEY$3);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
    });
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME$3] = Collapse._jQueryInterface;
$.fn[NAME$3].Constructor = Collapse;

$.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
};