/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.0): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

/**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

var NAME$4 = 'dropdown';
var VERSION$4 = '4.5.0';
var DATA_KEY$4 = 'bs.dropdown';
var EVENT_KEY$4 = "." + DATA_KEY$4;
var DATA_API_KEY$4 = '.data-api';
var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
var EVENT_CLICK = "click" + EVENT_KEY$4;
var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
var CLASS_NAME_DISABLED = 'disabled';
var CLASS_NAME_SHOW$2 = 'show';
var CLASS_NAME_DROPUP = 'dropup';
var CLASS_NAME_DROPRIGHT = 'dropright';
var CLASS_NAME_DROPLEFT = 'dropleft';
var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
var CLASS_NAME_POSITION_STATIC = 'position-static';
var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
var SELECTOR_FORM_CHILD = '.dropdown form';
var SELECTOR_MENU = '.dropdown-menu';
var SELECTOR_NAVBAR_NAV = '.navbar-nav';
var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
var PLACEMENT_TOP = 'top-start';
var PLACEMENT_TOPEND = 'top-end';
var PLACEMENT_BOTTOM = 'bottom-start';
var PLACEMENT_BOTTOMEND = 'bottom-end';
var PLACEMENT_RIGHT = 'right-start';
var PLACEMENT_LEFT = 'left-start';
var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
};
var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Dropdown = /*#__PURE__*/function () {
    function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
        if (this._element.disabled || $(this._element).hasClass(CLASS_NAME_DISABLED)) {
            return;
        }

        var isActive = $(this._menu).hasClass(CLASS_NAME_SHOW$2);

        Dropdown._clearMenus();

        if (isActive) {
            return;
        }

        this.show(true);
    };

    _proto.show = function show(usePopper) {
        if (usePopper === void 0) {
            usePopper = false;
        }

        if (this._element.disabled || $(this._element).hasClass(CLASS_NAME_DISABLED) || $(this._menu).hasClass(CLASS_NAME_SHOW$2)) {
            return;
        }

        var relatedTarget = {
            relatedTarget: this._element
        };
        var showEvent = $.Event(EVENT_SHOW$1, relatedTarget);

        var parent = Dropdown._getParentFromElement(this._element);

        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
            return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar && usePopper) {
            /**
             * Check for Popper dependency
             * Popper - https://popper.js.org
             */
            if (typeof Popper === 'undefined') {
                throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
            }

            var referenceElement = this._element;

            if (this._config.reference === 'parent') {
                referenceElement = parent;
            } else if (Util.isElement(this._config.reference)) {
                referenceElement = this._config.reference; // Check if it's jQuery element

                if (typeof this._config.reference.jquery !== 'undefined') {
                    referenceElement = this._config.reference[0];
                }
            } // If boundary is not `scrollParent`, then set position to `static`
            // to allow the menu to "escape" the scroll parent's boundaries
            // https://github.com/twbs/bootstrap/issues/24251


            if (this._config.boundary !== 'scrollParent') {
                $(parent).addClass(CLASS_NAME_POSITION_STATIC);
            }

            this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $(parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
            $(document.body).children().on('mouseover', null, $.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $(this._menu).toggleClass(CLASS_NAME_SHOW$2);
        $(parent).toggleClass(CLASS_NAME_SHOW$2).trigger($.Event(EVENT_SHOWN$1, relatedTarget));
    };

    _proto.hide = function hide() {
        if (this._element.disabled || $(this._element).hasClass(CLASS_NAME_DISABLED) || !$(this._menu).hasClass(CLASS_NAME_SHOW$2)) {
            return;
        }

        var relatedTarget = {
            relatedTarget: this._element
        };
        var hideEvent = $.Event(EVENT_HIDE$1, relatedTarget);

        var parent = Dropdown._getParentFromElement(this._element);

        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
            return;
        }

        if (this._popper) {
            this._popper.destroy();
        }

        $(this._menu).toggleClass(CLASS_NAME_SHOW$2);
        $(parent).toggleClass(CLASS_NAME_SHOW$2).trigger($.Event(EVENT_HIDDEN$1, relatedTarget));
    };

    _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$4);
        $(this._element).off(EVENT_KEY$4);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
            this._popper.destroy();

            this._popper = null;
        }
    };

    _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
            this._popper.scheduleUpdate();
        }
    } // Private
        ;

    _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $(this._element).on(EVENT_CLICK, function (event) {
            event.preventDefault();
            event.stopPropagation();

            _this.toggle();
        });
    };

    _proto._getConfig = function _getConfig(config) {
        config = _objectSpread2(_objectSpread2(_objectSpread2({}, this.constructor.Default), $(this._element).data()), config);
        Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
        return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
            var parent = Dropdown._getParentFromElement(this._element);

            if (parent) {
                this._menu = parent.querySelector(SELECTOR_MENU);
            }
        }

        return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $(this._element.parentNode);
        var placement = PLACEMENT_BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
            placement = $(this._menu).hasClass(CLASS_NAME_MENURIGHT) ? PLACEMENT_TOPEND : PLACEMENT_TOP;
        } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
            placement = PLACEMENT_RIGHT;
        } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
            placement = PLACEMENT_LEFT;
        } else if ($(this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
            placement = PLACEMENT_BOTTOMEND;
        }

        return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
        return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
        var _this2 = this;

        var offset = {};

        if (typeof this._config.offset === 'function') {
            offset.fn = function (data) {
                data.offsets = _objectSpread2(_objectSpread2({}, data.offsets), _this2._config.offset(data.offsets, _this2._element) || {});
                return data;
            };
        } else {
            offset.offset = this._config.offset;
        }

        return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
        var popperConfig = {
            placement: this._getPlacement(),
            modifiers: {
                offset: this._getOffset(),
                flip: {
                    enabled: this._config.flip
                },
                preventOverflow: {
                    boundariesElement: this._config.boundary
                }
            }
        }; // Disable Popper.js if we have a static display

        if (this._config.display === 'static') {
            popperConfig.modifiers.applyStyle = {
                enabled: false
            };
        }

        return _objectSpread2(_objectSpread2({}, popperConfig), this._config.popperConfig);
    } // Static
        ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
            var data = $(this).data(DATA_KEY$4);

            var _config = typeof config === 'object' ? config : null;

            if (!data) {
                data = new Dropdown(this, _config);
                $(this).data(DATA_KEY$4, data);
            }

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                }

                data[config]();
            }
        });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
            return;
        }

        var toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$2));

        for (var i = 0, len = toggles.length; i < len; i++) {
            var parent = Dropdown._getParentFromElement(toggles[i]);

            var context = $(toggles[i]).data(DATA_KEY$4);
            var relatedTarget = {
                relatedTarget: toggles[i]
            };

            if (event && event.type === 'click') {
                relatedTarget.clickEvent = event;
            }

            if (!context) {
                continue;
            }

            var dropdownMenu = context._menu;

            if (!$(parent).hasClass(CLASS_NAME_SHOW$2)) {
                continue;
            }

            if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
                continue;
            }

            var hideEvent = $.Event(EVENT_HIDE$1, relatedTarget);
            $(parent).trigger(hideEvent);

            if (hideEvent.isDefaultPrevented()) {
                continue;
            } // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support


            if ('ontouchstart' in document.documentElement) {
                $(document.body).children().off('mouseover', null, $.noop);
            }

            toggles[i].setAttribute('aria-expanded', 'false');

            if (context._popper) {
                context._popper.destroy();
            }

            $(dropdownMenu).removeClass(CLASS_NAME_SHOW$2);
            $(parent).removeClass(CLASS_NAME_SHOW$2).trigger($.Event(EVENT_HIDDEN$1, relatedTarget));
        }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
            parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
    } // eslint-disable-next-line complexity
        ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
            return;
        }

        if (this.disabled || $(this).hasClass(CLASS_NAME_DISABLED)) {
            return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $(parent).hasClass(CLASS_NAME_SHOW$2);

        if (!isActive && event.which === ESCAPE_KEYCODE) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
            if (event.which === ESCAPE_KEYCODE) {
                $(parent.querySelector(SELECTOR_DATA_TOGGLE$2)).trigger('focus');
            }

            $(this).trigger('click');
            return;
        }

        var items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS)).filter(function (item) {
            return $(item).is(':visible');
        });

        if (items.length === 0) {
            return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
            // Up
            index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
            // Down
            index++;
        }

        if (index < 0) {
            index = 0;
        }

        items[index].focus();
    };

    _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
            return VERSION$4;
        }
    }, {
        key: "Default",
        get: function get() {
            return Default$2;
        }
    }, {
        key: "DefaultType",
        get: function get() {
            return DefaultType$2;
        }
    }]);

    return Dropdown;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


$(document).on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown._dataApiKeydownHandler).on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler).on(EVENT_CLICK_DATA_API$4 + " " + EVENT_KEYUP_DATA_API, Dropdown._clearMenus).on(EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
}).on(EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
    e.stopPropagation();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME$4] = Dropdown._jQueryInterface;
$.fn[NAME$4].Constructor = Dropdown;

$.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
};