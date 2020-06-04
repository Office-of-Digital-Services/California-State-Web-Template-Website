/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.0): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

/**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

var NAME$1 = 'button';
var VERSION$1 = '4.5.0';
var DATA_KEY$1 = 'bs.button';
var EVENT_KEY$1 = "." + DATA_KEY$1;
var DATA_API_KEY$1 = '.data-api';
var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
var CLASS_NAME_ACTIVE = 'active';
var CLASS_NAME_BUTTON = 'btn';
var CLASS_NAME_FOCUS = 'focus';
var SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
var SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
var SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
var SELECTOR_INPUT = 'input:not([type="hidden"])';
var SELECTOR_ACTIVE = '.active';
var SELECTOR_BUTTON = '.btn';
var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
var EVENT_FOCUS_BLUR_DATA_API = "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1);
var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$1 + DATA_API_KEY$1;
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Button = /*#__PURE__*/function () {
    function Button(element) {
        this._element = element;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $(this._element).closest(SELECTOR_DATA_TOGGLES)[0];

        if (rootElement) {
            var input = this._element.querySelector(SELECTOR_INPUT);

            if (input) {
                if (input.type === 'radio') {
                    if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
                        triggerChangeEvent = false;
                    } else {
                        var activeElement = rootElement.querySelector(SELECTOR_ACTIVE);

                        if (activeElement) {
                            $(activeElement).removeClass(CLASS_NAME_ACTIVE);
                        }
                    }
                }

                if (triggerChangeEvent) {
                    // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE);
                    }

                    $(input).trigger('change');
                }

                input.focus();
                addAriaPressed = false;
            }
        }

        if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
            if (addAriaPressed) {
                this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE));
            }

            if (triggerChangeEvent) {
                $(this._element).toggleClass(CLASS_NAME_ACTIVE);
            }
        }
    };

    _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$1);
        this._element = null;
    } // Static
        ;

    Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
            var data = $(this).data(DATA_KEY$1);

            if (!data) {
                data = new Button(this);
                $(this).data(DATA_KEY$1, data);
            }

            if (config === 'toggle') {
                data[config]();
            }
        });
    };

    _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
            return VERSION$1;
        }
    }]);

    return Button;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


$(document).on(EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;
    var initialButton = button;

    if (!$(button).hasClass(CLASS_NAME_BUTTON)) {
        button = $(button).closest(SELECTOR_BUTTON)[0];
    }

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
        event.preventDefault(); // work around Firefox bug #1540995
    } else {
        var inputBtn = button.querySelector(SELECTOR_INPUT);

        if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
            event.preventDefault(); // work around Firefox bug #1540995

            return;
        }

        if (initialButton.tagName === 'LABEL' && inputBtn && inputBtn.type === 'checkbox') {
            event.preventDefault(); // work around event sent to label and input
        }

        Button._jQueryInterface.call($(button), 'toggle');
    }
}).on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(SELECTOR_BUTTON)[0];
    $(button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
});
$(window).on(EVENT_LOAD_DATA_API, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
        var button = buttons[i];
        var input = button.querySelector(SELECTOR_INPUT);

        if (input.checked || input.hasAttribute('checked')) {
            button.classList.add(CLASS_NAME_ACTIVE);
        } else {
            button.classList.remove(CLASS_NAME_ACTIVE);
        }
    } // find all button toggles


    buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
        var _button = buttons[_i];

        if (_button.getAttribute('aria-pressed') === 'true') {
            _button.classList.add(CLASS_NAME_ACTIVE);
        } else {
            _button.classList.remove(CLASS_NAME_ACTIVE);
        }
    }
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME$1] = Button._jQueryInterface;
$.fn[NAME$1].Constructor = Button;

$.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
};