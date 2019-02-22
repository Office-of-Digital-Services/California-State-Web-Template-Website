/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$8 = 'scrollspy';
var VERSION$8 = '4.3.1';
var DATA_KEY$8 = 'bs.scrollspy';
var EVENT_KEY$8 = "." + DATA_KEY$8;
var DATA_API_KEY$6 = '.data-api';
var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
};
var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
};
var Event$8 = {
    ACTIVATE: "activate" + EVENT_KEY$8,
    SCROLL: "scroll" + EVENT_KEY$8,
    LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
};
var ClassName$8 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
};
var Selector$8 = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
};
var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

};

var ScrollSpy =
    /*#__PURE__*/
    function () {
        function ScrollSpy(element, config) {
            var _this = this;

            this._element = element;
            this._scrollElement = element.tagName === 'BODY' ? window : element;
            this._config = this._getConfig(config);
            this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
            this._offsets = [];
            this._targets = [];
            this._activeTarget = null;
            this._scrollHeight = 0;
            $(this._scrollElement).on(Event$8.SCROLL, function (event) {
                return _this._process(event);
            });
            this.refresh();

            this._process();
        } // Getters


        var _proto = ScrollSpy.prototype;

        // Public
        _proto.refresh = function refresh() {
            var _this2 = this;

            var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
            var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
            var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
            this._offsets = [];
            this._targets = [];
            this._scrollHeight = this._getScrollHeight();
            var targets = [].slice.call(document.querySelectorAll(this._selector));
            targets.map(function (element) {
                var target;
                var targetSelector = Util.getSelectorFromElement(element);

                if (targetSelector) {
                    target = document.querySelector(targetSelector);
                }

                if (target) {
                    var targetBCR = target.getBoundingClientRect();

                    if (targetBCR.width || targetBCR.height) {
                        // TODO (fat): remove sketch reliance on jQuery position/offset
                        return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
                    }
                }

                return null;
            }).filter(function (item) {
                return item;
            }).sort(function (a, b) {
                return a[0] - b[0];
            }).forEach(function (item) {
                _this2._offsets.push(item[0]);

                _this2._targets.push(item[1]);
            });
        };

        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY$8);
            $(this._scrollElement).off(EVENT_KEY$8);
            this._element = null;
            this._scrollElement = null;
            this._config = null;
            this._selector = null;
            this._offsets = null;
            this._targets = null;
            this._activeTarget = null;
            this._scrollHeight = null;
        } // Private
            ;

        _proto._getConfig = function _getConfig(config) {
            config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});

            if (typeof config.target !== 'string') {
                var id = $(config.target).attr('id');

                if (!id) {
                    id = Util.getUID(NAME$8);
                    $(config.target).attr('id', id);
                }

                config.target = "#" + id;
            }

            Util.typeCheckConfig(NAME$8, config, DefaultType$6);
            return config;
        };

        _proto._getScrollTop = function _getScrollTop() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
        };

        _proto._getScrollHeight = function _getScrollHeight() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        };

        _proto._getOffsetHeight = function _getOffsetHeight() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
        };

        _proto._process = function _process() {
            var scrollTop = this._getScrollTop() + this._config.offset;

            var scrollHeight = this._getScrollHeight();

            var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

            if (this._scrollHeight !== scrollHeight) {
                this.refresh();
            }

            if (scrollTop >= maxScroll) {
                var target = this._targets[this._targets.length - 1];

                if (this._activeTarget !== target) {
                    this._activate(target);
                }

                return;
            }

            if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
                this._activeTarget = null;

                this._clear();

                return;
            }

            var offsetLength = this._offsets.length;

            for (var i = offsetLength; i--;) {
                var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

                if (isActiveTarget) {
                    this._activate(this._targets[i]);
                }
            }
        };

        _proto._activate = function _activate(target) {
            this._activeTarget = target;

            this._clear();

            var queries = this._selector.split(',').map(function (selector) {
                return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
            });

            var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

            if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
                $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
                $link.addClass(ClassName$8.ACTIVE);
            } else {
                // Set triggered link as active
                $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
                // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

                $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

                $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
            }

            $(this._scrollElement).trigger(Event$8.ACTIVATE, {
                relatedTarget: target
            });
        };

        _proto._clear = function _clear() {
            [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
                return node.classList.contains(ClassName$8.ACTIVE);
            }).forEach(function (node) {
                return node.classList.remove(ClassName$8.ACTIVE);
            });
        } // Static
            ;

        ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY$8);

                var _config = typeof config === 'object' && config;

                if (!data) {
                    data = new ScrollSpy(this, _config);
                    $(this).data(DATA_KEY$8, data);
                }

                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }

                    data[config]();
                }
            });
        };

        _createClass(ScrollSpy, null, [{
            key: "VERSION",
            get: function get() {
                return VERSION$8;
            }
        }, {
            key: "Default",
            get: function get() {
                return Default$6;
            }
        }]);

        return ScrollSpy;
    }();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


$(window).on(Event$8.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
        var $spy = $(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME$8] = ScrollSpy._jQueryInterface;
$.fn[NAME$8].Constructor = ScrollSpy;

$.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
};