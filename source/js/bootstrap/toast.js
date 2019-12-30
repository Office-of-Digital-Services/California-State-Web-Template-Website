/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.4.1): toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
/**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

var NAME$a = 'toast';
var VERSION$a = '4.4.1';
var DATA_KEY$a = 'bs.toast';
var EVENT_KEY$a = "." + DATA_KEY$a;
var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
var Event$a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
    HIDE: "hide" + EVENT_KEY$a,
    HIDDEN: "hidden" + EVENT_KEY$a,
    SHOW: "show" + EVENT_KEY$a,
    SHOWN: "shown" + EVENT_KEY$a
};
var ClassName$a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
};
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
var Selector$a = {
    DATA_DISMISS: '[data-dismiss="toast"]'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Toast =
    /*#__PURE__*/
    function () {
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

            var showEvent = $.Event(Event$a.SHOW);
            $(this._element).trigger(showEvent);

            if (showEvent.isDefaultPrevented()) {
                return;
            }

            if (this._config.animation) {
                this._element.classList.add(ClassName$a.FADE);
            }

            var complete = function complete() {
                _this._element.classList.remove(ClassName$a.SHOWING);

                _this._element.classList.add(ClassName$a.SHOW);

                $(_this._element).trigger(Event$a.SHOWN);

                if (_this._config.autohide) {
                    _this._timeout = setTimeout(function () {
                        _this.hide();
                    }, _this._config.delay);
                }
            };

            this._element.classList.remove(ClassName$a.HIDE);

            Util.reflow(this._element);

            this._element.classList.add(ClassName$a.SHOWING);

            if (this._config.animation) {
                var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            } else {
                complete();
            }
        };

        _proto.hide = function hide() {
            if (!this._element.classList.contains(ClassName$a.SHOW)) {
                return;
            }

            var hideEvent = $.Event(Event$a.HIDE);
            $(this._element).trigger(hideEvent);

            if (hideEvent.isDefaultPrevented()) {
                return;
            }

            this._close();
        };

        _proto.dispose = function dispose() {
            clearTimeout(this._timeout);
            this._timeout = null;

            if (this._element.classList.contains(ClassName$a.SHOW)) {
                this._element.classList.remove(ClassName$a.SHOW);
            }

            $(this._element).off(Event$a.CLICK_DISMISS);
            $.removeData(this._element, DATA_KEY$a);
            this._element = null;
            this._config = null;
        } // Private
            ;

        _proto._getConfig = function _getConfig(config) {
            config = _objectSpread2({}, Default$7, {}, $(this._element).data(), {}, typeof config === 'object' && config ? config : {});
            Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
            return config;
        };

        _proto._setListeners = function _setListeners() {
            var _this2 = this;

            $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
                return _this2.hide();
            });
        };

        _proto._close = function _close() {
            var _this3 = this;

            var complete = function complete() {
                _this3._element.classList.add(ClassName$a.HIDE);

                $(_this3._element).trigger(Event$a.HIDDEN);
            };

            this._element.classList.remove(ClassName$a.SHOW);

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