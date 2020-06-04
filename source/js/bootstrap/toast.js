/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.0): toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
/**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

var NAME$a = 'toast';
var VERSION$a = '4.5.0';
var DATA_KEY$a = 'bs.toast';
var EVENT_KEY$a = "." + DATA_KEY$a;
var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
var CLASS_NAME_FADE$5 = 'fade';
var CLASS_NAME_HIDE = 'hide';
var CLASS_NAME_SHOW$7 = 'show';
var CLASS_NAME_SHOWING = 'showing';
var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
};
var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
};
var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Toast = /*#__PURE__*/function () {
    function Toast(element, config) {
        this._element = element;
        this._config = this._getConfig(config);
        this._timeout = null;

        this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
        var _this = this;

        var showEvent = $.Event(EVENT_SHOW$4);
        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
            return;
        }

        if (this._config.animation) {
            this._element.classList.add(CLASS_NAME_FADE$5);
        }

        var complete = function complete() {
            _this._element.classList.remove(CLASS_NAME_SHOWING);

            _this._element.classList.add(CLASS_NAME_SHOW$7);

            $(_this._element).trigger(EVENT_SHOWN$4);

            if (_this._config.autohide) {
                _this._timeout = setTimeout(function () {
                    _this.hide();
                }, _this._config.delay);
            }
        };

        this._element.classList.remove(CLASS_NAME_HIDE);

        Util.reflow(this._element);

        this._element.classList.add(CLASS_NAME_SHOWING);

        if (this._config.animation) {
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
            complete();
        }
    };

    _proto.hide = function hide() {
        if (!this._element.classList.contains(CLASS_NAME_SHOW$7)) {
            return;
        }

        var hideEvent = $.Event(EVENT_HIDE$4);
        $(this._element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
            return;
        }

        this._close();
    };

    _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        this._timeout = null;

        if (this._element.classList.contains(CLASS_NAME_SHOW$7)) {
            this._element.classList.remove(CLASS_NAME_SHOW$7);
        }

        $(this._element).off(EVENT_CLICK_DISMISS$1);
        $.removeData(this._element, DATA_KEY$a);
        this._element = null;
        this._config = null;
    } // Private
        ;

    _proto._getConfig = function _getConfig(config) {
        config = _objectSpread2(_objectSpread2(_objectSpread2({}, Default$7), $(this._element).data()), typeof config === 'object' && config ? config : {});
        Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
        return config;
    };

    _proto._setListeners = function _setListeners() {
        var _this2 = this;

        $(this._element).on(EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
            return _this2.hide();
        });
    };

    _proto._close = function _close() {
        var _this3 = this;

        var complete = function complete() {
            _this3._element.classList.add(CLASS_NAME_HIDE);

            $(_this3._element).trigger(EVENT_HIDDEN$4);
        };

        this._element.classList.remove(CLASS_NAME_SHOW$7);

        if (this._config.animation) {
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
            complete();
        }
    } // Static
        ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY$a);

            var _config = typeof config === 'object' && config;

            if (!data) {
                data = new Toast(this, _config);
                $element.data(DATA_KEY$a, data);
            }

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                }

                data[config](this);
            }
        });
    };

    _createClass(Toast, null, [{
        key: "VERSION",
        get: function get() {
            return VERSION$a;
        }
    }, {
        key: "DefaultType",
        get: function get() {
            return DefaultType$7;
        }
    }, {
        key: "Default",
        get: function get() {
            return Default$7;
        }
    }]);

    return Toast;
}();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */


$.fn[NAME$a] = Toast._jQueryInterface;
$.fn[NAME$a].Constructor = Toast;

$.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
};