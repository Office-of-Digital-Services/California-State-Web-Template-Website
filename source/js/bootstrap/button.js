/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.4.1): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

/**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

var NAME$1 = 'button';
var VERSION$1 = '4.4.1';
var DATA_KEY$1 = 'bs.button';
var EVENT_KEY$1 = "." + DATA_KEY$1;
var DATA_API_KEY$1 = '.data-api';
var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
var ClassName$1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
};
var Selector$1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLES: '[data-toggle="buttons"]',
    DATA_TOGGLE: '[data-toggle="button"]',
    DATA_TOGGLES_BUTTONS: '[data-toggle="buttons"] .btn',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
};
var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1),
    LOAD_DATA_API: "load" + EVENT_KEY$1 + DATA_API_KEY$1
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Button =
    /*#__PURE__*/
    function () {
        function Button(element) {
            this._element = element;
        } // Getters


        var _proto = Button.prototype;

        // Public
        _proto.toggle = function toggle() {
            var triggerChangeEvent = true;
            var addAriaPressed = true;
            var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLES)[0];

            if (rootElement) {
                var input = this._element.querySelector(Selector$1.INPUT);

                if (input) {
                    if (input.type === 'radio') {
                        if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
                            triggerChangeEvent = false;
                        } else {
                            var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

                            if (activeElement) {
                                $(activeElement).removeClass(ClassName$1.ACTIVE);
                            }
                        }
                    } else if (input.type === 'checkbox') {
                        if (this._element.tagName === 'LABEL' && input.checked === this._element.classList.contains(ClassName$1.ACTIVE)) {
                            triggerChangeEvent = false;
                        }
                    } else {
                        // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
                        triggerChangeEvent = false;
                    }

                    if (triggerChangeEvent) {
                        input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
                        $(input).trigger('change');
                    }

                    input.focus();
                    addAriaPressed = false;
                }
            }

            if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
                if (addAriaPressed) {
                    this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
                }

                if (triggerChangeEvent) {
                    $(this._element).toggleClass(ClassName$1.ACTIVE);
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


$(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
        button = $(button).closest(Selector$1.BUTTON)[0];
    }

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
        event.preventDefault(); // work around Firefox bug #1540995
    } else {
        var inputBtn = button.querySelector(Selector$1.INPUT);

        if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
            event.preventDefault(); // work around Firefox bug #1540995

            return;
        }

        Button._jQueryInterface.call($(button), 'toggle');
    }
}).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector$1.BUTTON)[0];
    $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
});
$(window).on(Event$1.LOAD_DATA_API, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(Selector$1.DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
        var button = buttons[i];
        var input = button.querySelector(Selector$1.INPUT);

        if (input.checked || input.hasAttribute('checked')) {
            button.classList.add(ClassName$1.ACTIVE);
        } else {
            button.classList.remove(ClassName$1.ACTIVE);
        }
    } // find all button toggles


    buttons = [].slice.call(document.querySelectorAll(Selector$1.DATA_TOGGLE));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
        var _button = buttons[_i];

        if (_button.getAttribute('aria-pressed') === 'true') {
            _button.classList.add(ClassName$1.ACTIVE);
        } else {
            _button.classList.remove(ClassName$1.ACTIVE);
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