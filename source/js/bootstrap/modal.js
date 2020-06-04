/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.0): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

/**
  * ------------------------------------------------------------------------
  * Constants
  * ------------------------------------------------------------------------
  */

var NAME$5 = 'modal';
var VERSION$5 = '4.5.0';
var DATA_KEY$5 = 'bs.modal';
var EVENT_KEY$5 = "." + DATA_KEY$5;
var DATA_API_KEY$5 = '.data-api';
var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
};
var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
};
var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
var EVENT_RESIZE = "resize" + EVENT_KEY$5;
var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
var CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable';
var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
var CLASS_NAME_BACKDROP = 'modal-backdrop';
var CLASS_NAME_OPEN = 'modal-open';
var CLASS_NAME_FADE$1 = 'fade';
var CLASS_NAME_SHOW$3 = 'show';
var CLASS_NAME_STATIC = 'modal-static';
var SELECTOR_DIALOG = '.modal-dialog';
var SELECTOR_MODAL_BODY = '.modal-body';
var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]';
var SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]';
var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
var SELECTOR_STICKY_CONTENT = '.sticky-top';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Modal = /*#__PURE__*/function () {
    function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(SELECTOR_DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._isTransitioning = false;
        this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isShown || this._isTransitioning) {
            return;
        }

        if ($(this._element).hasClass(CLASS_NAME_FADE$1)) {
            this._isTransitioning = true;
        }

        var showEvent = $.Event(EVENT_SHOW$2, {
            relatedTarget: relatedTarget
        });
        $(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
            return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        this._setEscapeEvent();

        this._setResizeEvent();

        $(this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
            return _this.hide(event);
        });
        $(this._dialog).on(EVENT_MOUSEDOWN_DISMISS, function () {
            $(_this._element).one(EVENT_MOUSEUP_DISMISS, function (event) {
                if ($(event.target).is(_this._element)) {
                    _this._ignoreBackdropClick = true;
                }
            });
        });

        this._showBackdrop(function () {
            return _this._showElement(relatedTarget);
        });
    };

    _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
            event.preventDefault();
        }

        if (!this._isShown || this._isTransitioning) {
            return;
        }

        var hideEvent = $.Event(EVENT_HIDE$2);
        $(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
            return;
        }

        this._isShown = false;
        var transition = $(this._element).hasClass(CLASS_NAME_FADE$1);

        if (transition) {
            this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $(document).off(EVENT_FOCUSIN);
        $(this._element).removeClass(CLASS_NAME_SHOW$3);
        $(this._element).off(EVENT_CLICK_DISMISS);
        $(this._dialog).off(EVENT_MOUSEDOWN_DISMISS);

        if (transition) {
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $(this._element).one(Util.TRANSITION_END, function (event) {
                return _this2._hideModal(event);
            }).emulateTransitionEnd(transitionDuration);
        } else {
            this._hideModal();
        }
    };

    _proto.dispose = function dispose() {
        [window, this._element, this._dialog].forEach(function (htmlElement) {
            return $(htmlElement).off(EVENT_KEY$5);
        });
        /**
         * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
         * Do not move `document` in `htmlElements` array
         * It will remove `EVENT_CLICK_DATA_API` event that should remain
         */

        $(document).off(EVENT_FOCUSIN);
        $.removeData(this._element, DATA_KEY$5);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._isTransitioning = null;
        this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
    } // Private
        ;

    _proto._getConfig = function _getConfig(config) {
        config = _objectSpread2(_objectSpread2({}, Default$3), config);
        Util.typeCheckConfig(NAME$5, config, DefaultType$3);
        return config;
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
        var _this3 = this;

        if (this._config.backdrop === 'static') {
            var hideEventPrevented = $.Event(EVENT_HIDE_PREVENTED);
            $(this._element).trigger(hideEventPrevented);

            if (hideEventPrevented.defaultPrevented) {
                return;
            }

            this._element.classList.add(CLASS_NAME_STATIC);

            var modalTransitionDuration = Util.getTransitionDurationFromElement(this._element);
            $(this._element).one(Util.TRANSITION_END, function () {
                _this3._element.classList.remove(CLASS_NAME_STATIC);
            }).emulateTransitionEnd(modalTransitionDuration);

            this._element.focus();
        } else {
            this.hide();
        }
    };

    _proto._showElement = function _showElement(relatedTarget) {
        var _this4 = this;

        var transition = $(this._element).hasClass(CLASS_NAME_FADE$1);
        var modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null;

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
            // Don't move modal's DOM position
            document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.setAttribute('aria-modal', true);

        if ($(this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
            modalBody.scrollTop = 0;
        } else {
            this._element.scrollTop = 0;
        }

        if (transition) {
            Util.reflow(this._element);
        }

        $(this._element).addClass(CLASS_NAME_SHOW$3);

        if (this._config.focus) {
            this._enforceFocus();
        }

        var shownEvent = $.Event(EVENT_SHOWN$2, {
            relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
            if (_this4._config.focus) {
                _this4._element.focus();
            }

            _this4._isTransitioning = false;
            $(_this4._element).trigger(shownEvent);
        };

        if (transition) {
            var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
            $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
            transitionComplete();
        }
    };

    _proto._enforceFocus = function _enforceFocus() {
        var _this5 = this;

        $(document).off(EVENT_FOCUSIN) // Guard against infinite focus loop
            .on(EVENT_FOCUSIN, function (event) {
                if (document !== event.target && _this5._element !== event.target && $(_this5._element).has(event.target).length === 0) {
                    _this5._element.focus();
                }
            });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this6 = this;

        if (this._isShown) {
            $(this._element).on(EVENT_KEYDOWN_DISMISS, function (event) {
                if (_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
                    event.preventDefault();

                    _this6.hide();
                } else if (!_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
                    _this6._triggerBackdropTransition();
                }
            });
        } else if (!this._isShown) {
            $(this._element).off(EVENT_KEYDOWN_DISMISS);
        }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
        var _this7 = this;

        if (this._isShown) {
            $(window).on(EVENT_RESIZE, function (event) {
                return _this7.handleUpdate(event);
            });
        } else {
            $(window).off(EVENT_RESIZE);
        }
    };

    _proto._hideModal = function _hideModal() {
        var _this8 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._element.removeAttribute('aria-modal');

        this._isTransitioning = false;

        this._showBackdrop(function () {
            $(document.body).removeClass(CLASS_NAME_OPEN);

            _this8._resetAdjustments();

            _this8._resetScrollbar();

            $(_this8._element).trigger(EVENT_HIDDEN$2);
        });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
            $(this._backdrop).remove();
            this._backdrop = null;
        }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
        var _this9 = this;

        var animate = $(this._element).hasClass(CLASS_NAME_FADE$1) ? CLASS_NAME_FADE$1 : '';

        if (this._isShown && this._config.backdrop) {
            this._backdrop = document.createElement('div');
            this._backdrop.className = CLASS_NAME_BACKDROP;

            if (animate) {
                this._backdrop.classList.add(animate);
            }

            $(this._backdrop).appendTo(document.body);
            $(this._element).on(EVENT_CLICK_DISMISS, function (event) {
                if (_this9._ignoreBackdropClick) {
                    _this9._ignoreBackdropClick = false;
                    return;
                }

                if (event.target !== event.currentTarget) {
                    return;
                }

                _this9._triggerBackdropTransition();
            });

            if (animate) {
                Util.reflow(this._backdrop);
            }

            $(this._backdrop).addClass(CLASS_NAME_SHOW$3);

            if (!callback) {
                return;
            }

            if (!animate) {
                callback();
                return;
            }

            var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
            $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
            $(this._backdrop).removeClass(CLASS_NAME_SHOW$3);

            var callbackRemove = function callbackRemove() {
                _this9._removeBackdrop();

                if (callback) {
                    callback();
                }
            };

            if ($(this._element).hasClass(CLASS_NAME_FADE$1)) {
                var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

                $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
            } else {
                callbackRemove();
            }
        } else if (callback) {
            callback();
        }
    } // ----------------------------------------------------------------------
        // the following methods are used to handle overflowing modals
        // todo (fat): these should probably be refactored out of modal.js
        // ----------------------------------------------------------------------
        ;

    _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
            this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
            this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
        var _this10 = this;

        if (this._isBodyOverflowing) {
            // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
            //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
            var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
            var stickyContent = [].slice.call(document.querySelectorAll(SELECTOR_STICKY_CONTENT)); // Adjust fixed content padding

            $(fixedContent).each(function (index, element) {
                var actualPadding = element.style.paddingRight;
                var calculatedPadding = $(element).css('padding-right');
                $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
            }); // Adjust sticky content margin

            $(stickyContent).each(function (index, element) {
                var actualMargin = element.style.marginRight;
                var calculatedMargin = $(element).css('margin-right');
                $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
            }); // Adjust body padding

            var actualPadding = document.body.style.paddingRight;
            var calculatedPadding = $(document.body).css('padding-right');
            $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }

        $(document.body).addClass(CLASS_NAME_OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
        $(fixedContent).each(function (index, element) {
            var padding = $(element).data('padding-right');
            $(element).removeData('padding-right');
            element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + SELECTOR_STICKY_CONTENT));
        $(elements).each(function (index, element) {
            var margin = $(element).data('margin-right');

            if (typeof margin !== 'undefined') {
                $(element).css('margin-right', margin).removeData('margin-right');
            }
        }); // Restore body padding

        var padding = $(document.body).data('padding-right');
        $(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    } // Static
        ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
            var data = $(this).data(DATA_KEY$5);

            var _config = _objectSpread2(_objectSpread2(_objectSpread2({}, Default$3), $(this).data()), typeof config === 'object' && config ? config : {});

            if (!data) {
                data = new Modal(this, _config);
                $(this).data(DATA_KEY$5, data);
            }

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                }

                data[config](relatedTarget);
            } else if (_config.show) {
                data.show(relatedTarget);
            }
        });
    };

    _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
            return VERSION$5;
        }
    }, {
        key: "Default",
        get: function get() {
            return Default$3;
        }
    }]);

    return Modal;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


$(document).on(EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
        target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread2(_objectSpread2({}, $(target).data()), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
    }

    var $target = $(target).one(EVENT_SHOW$2, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
            // Only register focus restorer if modal will actually get shown
            return;
        }

        $target.one(EVENT_HIDDEN$2, function () {
            if ($(_this11).is(':visible')) {
                _this11.focus();
            }
        });
    });

    Modal._jQueryInterface.call($(target), config, this);
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME$5] = Modal._jQueryInterface;
$.fn[NAME$5].Constructor = Modal;

$.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
};