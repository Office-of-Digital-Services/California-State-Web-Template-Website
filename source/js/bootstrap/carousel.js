/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$2 = 'carousel';
var VERSION$2 = '4.3.1';
var DATA_KEY$2 = 'bs.carousel';
var EVENT_KEY$2 = "." + DATA_KEY$2;
var DATA_API_KEY$2 = '.data-api';
var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

var SWIPE_THRESHOLD = 40;
var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
};
var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
};
var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
};
var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
};
var ClassName$2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
};
var Selector$2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
};
var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

};

var Carousel =
    /*#__PURE__*/
    function () {
        function Carousel(element, config) {
            this._items = null;
            this._interval = null;
            this._activeElement = null;
            this._isPaused = false;
            this._isSliding = false;
            this.touchTimeout = null;
            this.touchStartX = 0;
            this.touchDeltaX = 0;
            this._config = this._getConfig(config);
            this._element = element;
            this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
            this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
            this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

            this._addEventListeners();
        } // Getters


        var _proto = Carousel.prototype;

        // Public
        _proto.next = function next() {
            if (!this._isSliding) {
                this._slide(Direction.NEXT);
            }
        };

        _proto.nextWhenVisible = function nextWhenVisible() {
            // Don't call next when the page isn't visible
            // or the carousel or its parent isn't visible
            if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
                this.next();
            }
        };

        _proto.prev = function prev() {
            if (!this._isSliding) {
                this._slide(Direction.PREV);
            }
        };

        _proto.pause = function pause(event) {
            if (!event) {
                this._isPaused = true;
            }

            if (this._element.querySelector(Selector$2.NEXT_PREV)) {
                Util.triggerTransitionEnd(this._element);
                this.cycle(true);
            }

            clearInterval(this._interval);
            this._interval = null;
        };

        _proto.cycle = function cycle(event) {
            if (!event) {
                this._isPaused = false;
            }

            if (this._interval) {
                clearInterval(this._interval);
                this._interval = null;
            }

            if (this._config.interval && !this._isPaused) {
                this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
            }
        };

        _proto.to = function to(index) {
            var _this = this;

            this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

            var activeIndex = this._getItemIndex(this._activeElement);

            if (index > this._items.length - 1 || index < 0) {
                return;
            }

            if (this._isSliding) {
                $(this._element).one(Event$2.SLID, function () {
                    return _this.to(index);
                });
                return;
            }

            if (activeIndex === index) {
                this.pause();
                this.cycle();
                return;
            }

            var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

            this._slide(direction, this._items[index]);
        };

        _proto.dispose = function dispose() {
            $(this._element).off(EVENT_KEY$2);
            $.removeData(this._element, DATA_KEY$2);
            this._items = null;
            this._config = null;
            this._element = null;
            this._interval = null;
            this._isPaused = null;
            this._isSliding = null;
            this._activeElement = null;
            this._indicatorsElement = null;
        } // Private
            ;

        _proto._getConfig = function _getConfig(config) {
            config = _objectSpread({}, Default, config);
            Util.typeCheckConfig(NAME$2, config, DefaultType);
            return config;
        };

        _proto._handleSwipe = function _handleSwipe() {
            var absDeltax = Math.abs(this.touchDeltaX);

            if (absDeltax <= SWIPE_THRESHOLD) {
                return;
            }

            var direction = absDeltax / this.touchDeltaX; // swipe left

            if (direction > 0) {
                this.prev();
            } // swipe right


            if (direction < 0) {
                this.next();
            }
        };

        _proto._addEventListeners = function _addEventListeners() {
            var _this2 = this;

            if (this._config.keyboard) {
                $(this._element).on(Event$2.KEYDOWN, function (event) {
                    return _this2._keydown(event);
                });
            }

            if (this._config.pause === 'hover') {
                $(this._element).on(Event$2.MOUSEENTER, function (event) {
                    return _this2.pause(event);
                }).on(Event$2.MOUSELEAVE, function (event) {
                    return _this2.cycle(event);
                });
            }

            if (this._config.touch) {
                this._addTouchEventListeners();
            }
        };

        _proto._addTouchEventListeners = function _addTouchEventListeners() {
            var _this3 = this;

            if (!this._touchSupported) {
                return;
            }

            var start = function start(event) {
                if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
                    _this3.touchStartX = event.originalEvent.clientX;
                } else if (!_this3._pointerEvent) {
                    _this3.touchStartX = event.originalEvent.touches[0].clientX;
                }
            };

            var move = function move(event) {
                // ensure swiping with one touch and not pinching
                if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
                    _this3.touchDeltaX = 0;
                } else {
                    _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
                }
            };

            var end = function end(event) {
                if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
                    _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
                }

                _this3._handleSwipe();

                if (_this3._config.pause === 'hover') {
                    // If it's a touch-enabled device, mouseenter/leave are fired as
                    // part of the mouse compatibility events on first tap - the carousel
                    // would stop cycling until user tapped out of it;
                    // here, we listen for touchend, explicitly pause the carousel
                    // (as if it's the second time we tap on it, mouseenter compat event
                    // is NOT fired) and after a timeout (to allow for mouse compatibility
                    // events to fire) we explicitly restart cycling
                    _this3.pause();

                    if (_this3.touchTimeout) {
                        clearTimeout(_this3.touchTimeout);
                    }

                    _this3.touchTimeout = setTimeout(function (event) {
                        return _this3.cycle(event);
                    }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
                }
            };

            $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
                return e.preventDefault();
            });

            if (this._pointerEvent) {
                $(this._element).on(Event$2.POINTERDOWN, function (event) {
                    return start(event);
                });
                $(this._element).on(Event$2.POINTERUP, function (event) {
                    return end(event);
                });

                this._element.classList.add(ClassName$2.POINTER_EVENT);
            } else {
                $(this._element).on(Event$2.TOUCHSTART, function (event) {
                    return start(event);
                });
                $(this._element).on(Event$2.TOUCHMOVE, function (event) {
                    return move(event);
                });
                $(this._element).on(Event$2.TOUCHEND, function (event) {
                    return end(event);
                });
            }
        };

        _proto._keydown = function _keydown(event) {
            if (/input|textarea/i.test(event.target.tagName)) {
                return;
            }

            switch (event.which) {
                case ARROW_LEFT_KEYCODE:
                    event.preventDefault();
                    this.prev();
                    break;

                case ARROW_RIGHT_KEYCODE:
                    event.preventDefault();
                    this.next();
                    break;

                default:
            }
        };

        _proto._getItemIndex = function _getItemIndex(element) {
            this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
            return this._items.indexOf(element);
        };

        _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
            var isNextDirection = direction === Direction.NEXT;
            var isPrevDirection = direction === Direction.PREV;

            var activeIndex = this._getItemIndex(activeElement);

            var lastItemIndex = this._items.length - 1;
            var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

            if (isGoingToWrap && !this._config.wrap) {
                return activeElement;
            }

            var delta = direction === Direction.PREV ? -1 : 1;
            var itemIndex = (activeIndex + delta) % this._items.length;
            return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
        };

        _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
            var targetIndex = this._getItemIndex(relatedTarget);

            var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

            var slideEvent = $.Event(Event$2.SLIDE, {
                relatedTarget: relatedTarget,
                direction: eventDirectionName,
                from: fromIndex,
                to: targetIndex
            });
            $(this._element).trigger(slideEvent);
            return slideEvent;
        };

        _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
            if (this._indicatorsElement) {
                var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
                $(indicators).removeClass(ClassName$2.ACTIVE);

                var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

                if (nextIndicator) {
                    $(nextIndicator).addClass(ClassName$2.ACTIVE);
                }
            }
        };

        _proto._slide = function _slide(direction, element) {
            var _this4 = this;

            var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

            var activeElementIndex = this._getItemIndex(activeElement);

            var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

            var nextElementIndex = this._getItemIndex(nextElement);

            var isCycling = Boolean(this._interval);
            var directionalClassName;
            var orderClassName;
            var eventDirectionName;

            if (direction === Direction.NEXT) {
                directionalClassName = ClassName$2.LEFT;
                orderClassName = ClassName$2.NEXT;
                eventDirectionName = Direction.LEFT;
            } else {
                directionalClassName = ClassName$2.RIGHT;
                orderClassName = ClassName$2.PREV;
                eventDirectionName = Direction.RIGHT;
            }

            if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
                this._isSliding = false;
                return;
            }

            var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

            if (slideEvent.isDefaultPrevented()) {
                return;
            }

            if (!activeElement || !nextElement) {
                // Some weirdness is happening, so we bail
                return;
            }

            this._isSliding = true;

            if (isCycling) {
                this.pause();
            }

            this._setActiveIndicatorElement(nextElement);

            var slidEvent = $.Event(Event$2.SLID, {
                relatedTarget: nextElement,
                direction: eventDirectionName,
                from: activeElementIndex,
                to: nextElementIndex
            });

            if ($(this._element).hasClass(ClassName$2.SLIDE)) {
                $(nextElement).addClass(orderClassName);
                Util.reflow(nextElement);
                $(activeElement).addClass(directionalClassName);
                $(nextElement).addClass(directionalClassName);
                var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

                if (nextElementInterval) {
                    this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
                    this._config.interval = nextElementInterval;
                } else {
                    this._config.interval = this._config.defaultInterval || this._config.interval;
                }

                var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
                $(activeElement).one(Util.TRANSITION_END, function () {
                    $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
                    $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
                    _this4._isSliding = false;
                    setTimeout(function () {
                        return $(_this4._element).trigger(slidEvent);
                    }, 0);
                }).emulateTransitionEnd(transitionDuration);
            } else {
                $(activeElement).removeClass(ClassName$2.ACTIVE);
                $(nextElement).addClass(ClassName$2.ACTIVE);
                this._isSliding = false;
                $(this._element).trigger(slidEvent);
            }

            if (isCycling) {
                this.cycle();
            }
        } // Static
            ;

        Carousel._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY$2);

                var _config = _objectSpread({}, Default, $(this).data());

                if (typeof config === 'object') {
                    _config = _objectSpread({}, _config, config);
                }

                var action = typeof config === 'string' ? config : _config.slide;

                if (!data) {
                    data = new Carousel(this, _config);
                    $(this).data(DATA_KEY$2, data);
                }

                if (typeof config === 'number') {
                    data.to(config);
                } else if (typeof action === 'string') {
                    if (typeof data[action] === 'undefined') {
                        throw new TypeError("No method named \"" + action + "\"");
                    }

                    data[action]();
                } else if (_config.interval && _config.ride) {
                    data.pause();
                    data.cycle();
                }
            });
        };

        Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
            var selector = Util.getSelectorFromElement(this);

            if (!selector) {
                return;
            }

            var target = $(selector)[0];

            if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
                return;
            }

            var config = _objectSpread({}, $(target).data(), $(this).data());

            var slideIndex = this.getAttribute('data-slide-to');

            if (slideIndex) {
                config.interval = false;
            }

            Carousel._jQueryInterface.call($(target), config);

            if (slideIndex) {
                $(target).data(DATA_KEY$2).to(slideIndex);
            }

            event.preventDefault();
        };

        _createClass(Carousel, null, [{
            key: "VERSION",
            get: function get() {
                return VERSION$2;
            }
        }, {
            key: "Default",
            get: function get() {
                return Default;
            }
        }]);

        return Carousel;
    }();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


$(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
$(window).on(Event$2.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME$2] = Carousel._jQueryInterface;
$.fn[NAME$2].Constructor = Carousel;

$.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
};