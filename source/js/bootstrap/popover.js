/**
  * --------------------------------------------------------------------------
  * Bootstrap (v4.5.0): popover.js
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  * --------------------------------------------------------------------------
  */

/**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

var NAME$7 = 'popover';
var VERSION$7 = '4.5.0';
var DATA_KEY$7 = 'bs.popover';
var EVENT_KEY$7 = "." + DATA_KEY$7;
var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
var CLASS_PREFIX$1 = 'bs-popover';
var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

var Default$5 = _objectSpread2(_objectSpread2({}, Tooltip.Default), {}, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
});

var DefaultType$5 = _objectSpread2(_objectSpread2({}, Tooltip.DefaultType), {}, {
    content: '(string|element|function)'
});

var CLASS_NAME_FADE$3 = 'fade';
var CLASS_NAME_SHOW$5 = 'show';
var SELECTOR_TITLE = '.popover-header';
var SELECTOR_CONTENT = '.popover-body';
var Event$1 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Popover = /*#__PURE__*/function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
        return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $(this.config.template)[0];
        return this.tip;
    };

    _proto.setContent = function setContent() {
        var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
            content = content.call(this.element);
        }

        this.setElementContent($tip.find(SELECTOR_CONTENT), content);
        $tip.removeClass(CLASS_NAME_FADE$3 + " " + CLASS_NAME_SHOW$5);
    } // Private
        ;

    _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

        if (tabClass !== null && tabClass.length > 0) {
            $tip.removeClass(tabClass.join(''));
        }
    } // Static
        ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
            var data = $(this).data(DATA_KEY$7);

            var _config = typeof config === 'object' ? config : null;

            if (!data && /dispose|hide/.test(config)) {
                return;
            }

            if (!data) {
                data = new Popover(this, _config);
                $(this).data(DATA_KEY$7, data);
            }

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                }

                data[config]();
            }
        });
    };

    _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
            return VERSION$7;
        }
    }, {
        key: "Default",
        get: function get() {
            return Default$5;
        }
    }, {
        key: "NAME",
        get: function get() {
            return NAME$7;
        }
    }, {
        key: "DATA_KEY",
        get: function get() {
            return DATA_KEY$7;
        }
    }, {
        key: "Event",
        get: function get() {
            return Event$1;
        }
    }, {
        key: "EVENT_KEY",
        get: function get() {
            return EVENT_KEY$7;
        }
    }, {
        key: "DefaultType",
        get: function get() {
            return DefaultType$5;
        }
    }]);

    return Popover;
}(Tooltip);
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */


$.fn[NAME$7] = Popover._jQueryInterface;
$.fn[NAME$7].Constructor = Popover;

$.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
};