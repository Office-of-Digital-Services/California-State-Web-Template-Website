//@ts-check

/* -----------------------------------------
   NAVIGATION - /source/js/cagov/navigation.js
----------------------------------------- */

/*
 * ES2015 accessible accordion system, using ARIA
 * Website: https://van11y.net/accessible-accordion/
 * License MIT: https://github.com/nico3333fr/van11y-accessible-accordion-aria/blob/master/LICENSE
 */
(() => {
  /**
   * @param {Object} obj
   * @param {String} key
   * @param {String | Number} value
   */
  const _defineProperty = (obj, key, value) => {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  };

  const loadConfig = () => {
    const CACHE = {};

    /**
     * @param {String | Number} id
     * @param {Object} config
     */
    const set = (id, config) => {
      CACHE[id] = config;
    };

    /**
     *
     * @param {String | Number} id
     */
    const get = id => {
      return CACHE[id];
    };

    /**
     *
     * @param {String | Number} id
     */
    const remove = id => {
      return CACHE[id];
    };

    return {
      set: set,
      get: get,
      remove: remove
    };
  };

  const DATA_HASH_ID = "data-nav-id";

  const pluginConfig = loadConfig();

  /** Find an element based on an Id
   * @param  {String} id Id to find
   * @param  {String} hash hash id (not mandatory)
   * @return {Element} the element with the specified id
   */
  const findById = (id, hash) => {
    return document.querySelector(`#${id}[${DATA_HASH_ID}="${hash}"]`);
  };

  /**
   * @param {Element} node
   * @param {{}} attrs
   */
  const setAttributes = (node, attrs) => {
    Object.keys(attrs).forEach(attribute => {
      node.setAttribute(attribute, attrs[attribute]);
    });
  };

  /** search if element is or is contained in another element with attribute data-nav-id
   * @param  {Element} el element (node)
   * @param  {String} hashId the attribute data-hashtooltip-id
   * @return {String} the value of attribute data-hashtooltip-id
   */
  const searchParentHashId = (el, hashId) => {
    let found = false;

    let parentElement = el;
    while (parentElement && !found) {
      if (parentElement.hasAttribute(hashId)) {
        return parentElement.getAttribute(hashId);
      } else {
        parentElement = parentElement.parentElement;
      }
    }
    return "";
  };

  /**
   * @param {Element} el
   * @param {String} parentClass
   * @param {String} hashId
   */
  const searchParent = (el, parentClass, hashId) => {
    let found = false;

    let parentElement = el;
    while (parentElement && !found) {
      if (
        parentElement.classList.contains(parentClass) &&
        parentElement.getAttribute(DATA_HASH_ID) === hashId
      ) {
        return parentElement.getAttribute("id");
      } else {
        parentElement = parentElement.parentElement;
      }
    }
    return "";
  };

  const mobileView = () => {
    const mobileElement = document.querySelector(
      ".global-header .mobile-controls"
    );

    return mobileElement
      ? getComputedStyle(mobileElement)["display"] !== "none"
      : false;
  };

  /**
   * @param  {...any} pluginArgs
   */
  const plugin = (...pluginArgs) => {
    // Arrow functions do not have their own arguments object.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

    const config =
      pluginArgs.length <= 0 || pluginArgs[0] === undefined
        ? {}
        : pluginArgs[0];
    // Finding if first-level-link has sub-nav then changing its clasee to first-level-btn
    const className = "first-level-btn";

    //Change all the links next to sub-navs to first-level-btn
    document.querySelectorAll(".main-navigation .sub-nav").forEach(node => {
      node.parentElement.querySelector("a").className = className;
    });

    let CONFIG = {
      ACCORDION_JS: "main-navigation",
      ACCORDION_JS_HEADER: className, // Assigning button class to link that has sub-nav
      ACCORDION_JS_PANEL: "nav-panel",

      ACCORDION_DATA_PREFIX_CLASS: "data-nav-prefix-classes",
      ACCORDION_DATA_OPENED: "data-nav-opened",
      ACCORDION_DATA_MULTISELECTABLE: "data-nav-multiselectable",
      ACCORDION_DATA_COOL_SELECTORS: true,

      ACCORDION_PREFIX_IDS: "nav",
      ACCORDION_BUTTON_ID: "_tab",
      ACCORDION_PANEL_ID: "_panel",

      ACCORDION_STYLE: "nav",
      ACCORDION_TITLE_STYLE: "has-sub-btn",
      ACCORDION_HEADER_STYLE: "nav-header",
      ACCORDION_PANEL_STYLE: "sub-nav",

      ACCORDION_ROLE_TABLIST: "tablist",
      ACCORDION_ROLE_TAB: "tab",
      ACCORDION_ROLE_TABPANEL: "tabpanel",

      ATTR_ROLE: "role",
      ATTR_MULTISELECTABLE: "data-multiselectable",
      ATTR_EXPANDED: "aria-expanded",
      ATTR_LABELLEDBY: "aria-labelledby",
      ATTR_HIDDEN: "aria-hidden",
      ATTR_CONTROLS: "aria-controls",
      ATTR_SELECTED: "aria-selected"
    };

    CONFIG = Object.assign(CONFIG, config);

    const HASH_ID = Math.random().toString(32).slice(2, 12);

    pluginConfig.set(HASH_ID, CONFIG);

    // Find all accordions inside a container
    /**
     * @param  {Element[]} listAccordionArgs
     */
    const listAccordions = listAccordionArgs => {
      // Arrow functions do not have their own arguments object.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

      const node =
        listAccordionArgs.length <= 0
          ? document.documentElement
          : listAccordionArgs[0];

      return /** @type {Element[]} */ (
        [].slice.call(node.querySelectorAll(`.${CONFIG.ACCORDION_JS}`))
      );
    };

    // Build accordions for a container
    /**
     * @param {...Element} node
     */
    const attach = (...node) => {
      listAccordions(node).forEach(accordion_node => {
        const iLisible = `z${Math.random().toString(32).slice(2, 12)}`; // avoid selector exception when starting by a number

        const prefixClassName = accordion_node.hasAttribute(
          CONFIG.ACCORDION_DATA_PREFIX_CLASS
        )
          ? `${accordion_node.getAttribute(
              CONFIG.ACCORDION_DATA_PREFIX_CLASS
            )}-`
          : "";

        const coolSelectors = CONFIG.ACCORDION_DATA_COOL_SELECTORS;
        const childClassName = "first-level-btn";

        // Init attributes accordion
        accordion_node.setAttribute(
          CONFIG.ATTR_MULTISELECTABLE,
          mobileView() ? "true" : "false"
        );

        accordion_node.setAttribute(DATA_HASH_ID, HASH_ID);
        accordion_node.classList.add(prefixClassName + CONFIG.ACCORDION_STYLE);

        /** @type {Element[]} */
        const listAccordionsHeader = [].slice.call(
          accordion_node.querySelectorAll(`.${childClassName}`)
        );
        listAccordionsHeader.forEach((header_node, index_header) => {
          let _setAttributes2, _setAttributes3;

          // if we do not have cool selectors enabled,
          // it is not a direct child, we ignore it
          if (header_node.parentNode !== accordion_node && !coolSelectors) {
            return;
          }

          const indexHeaderLisible = index_header + 1;
          const accordionPanel = header_node.nextElementSibling;
          const accordionHeaderText = header_node.innerHTML;
          const accordionButton = document.createElement("BUTTON");
          const accordionOpenedAttribute = header_node.hasAttribute(
            CONFIG.ACCORDION_DATA_OPENED
          )
            ? header_node.getAttribute(CONFIG.ACCORDION_DATA_OPENED)
            : "";

          // set button with attributes
          accordionButton.innerHTML = accordionHeaderText;
          accordionButton.classList.add(
            childClassName,
            prefixClassName + CONFIG.ACCORDION_HEADER_STYLE
          );
          setAttributes(
            accordionButton,
            ((_setAttributes2 = {}),
            _defineProperty(
              _setAttributes2,
              "id",
              CONFIG.ACCORDION_PREFIX_IDS +
                iLisible +
                CONFIG.ACCORDION_BUTTON_ID +
                indexHeaderLisible
            ),
            _defineProperty(
              _setAttributes2,
              CONFIG.ATTR_CONTROLS,
              CONFIG.ACCORDION_PREFIX_IDS +
                iLisible +
                CONFIG.ACCORDION_PANEL_ID +
                indexHeaderLisible
            ),
            _defineProperty(_setAttributes2, DATA_HASH_ID, HASH_ID),
            _setAttributes2)
          );

          // place button
          header_node.innerHTML = "";
          header_node.appendChild(accordionButton);

          // set title with attributes
          header_node.classList.add(
            prefixClassName + CONFIG.ACCORDION_TITLE_STYLE
          );
          header_node.classList.remove(childClassName);

          // set attributes to panels
          accordionPanel.classList.add(
            prefixClassName + CONFIG.ACCORDION_PANEL_STYLE
          );
          setAttributes(
            accordionPanel,
            ((_setAttributes3 = {}),
            _defineProperty(
              _setAttributes3,
              CONFIG.ATTR_ROLE,
              CONFIG.ACCORDION_ROLE_TABPANEL
            ),
            _defineProperty(
              _setAttributes3,
              CONFIG.ATTR_LABELLEDBY,
              CONFIG.ACCORDION_PREFIX_IDS +
                iLisible +
                CONFIG.ACCORDION_BUTTON_ID +
                indexHeaderLisible
            ),
            _defineProperty(
              _setAttributes3,
              "id",
              CONFIG.ACCORDION_PREFIX_IDS +
                iLisible +
                CONFIG.ACCORDION_PANEL_ID +
                indexHeaderLisible
            ),
            _defineProperty(_setAttributes3, DATA_HASH_ID, HASH_ID),
            _setAttributes3)
          );

          if (accordionOpenedAttribute === "true") {
            accordionButton.setAttribute(CONFIG.ATTR_EXPANDED, "true");
            header_node.removeAttribute(CONFIG.ACCORDION_DATA_OPENED);
            accordionPanel.setAttribute(CONFIG.ATTR_HIDDEN, "false");
            accordionPanel
              .querySelectorAll(".second-level-link")
              .forEach(item => {
                item.removeAttribute("tabindex");
              });
          } else {
            accordionButton.setAttribute(CONFIG.ATTR_EXPANDED, "false");
            accordionPanel.setAttribute(CONFIG.ATTR_HIDDEN, "true");
            // making sure all second level links are not tabable
            accordionPanel
              .querySelectorAll(".second-level-link")
              .forEach(item => {
                item.setAttribute("tabindex", "-1");
              });
          }
        });
      });
    };

    return {
      attach: attach
    };
  };

  const main = function main() {
    /* listeners for all configs */
    ["click", "keydown", "focus"].forEach(eventName => {
      document.body.addEventListener(
        eventName,
        e => {
          const hashId = searchParentHashId(
            /** @type {Element} */ (e.target),
            DATA_HASH_ID
          );
          // search if click on button or on element in a button contains data-hash-id (it is needed to load config and know which class to search)

          if (hashId !== "") {
            (() => {
              // loading config from element
              const CONFIG = pluginConfig.get(hashId);

              // click on button
              if (
                /** @type {Element} */ (e.target).classList.contains(
                  "first-level-btn"
                ) &&
                eventName === "click"
              ) {
                (() => {
                  const buttonTag = /** @type {HTMLInputElement} */ (e.target);
                  const accordionContainer = findById(
                    searchParent(buttonTag, CONFIG.ACCORDION_JS, hashId),
                    hashId
                  );
                  const coolSelectors =
                    CONFIG.ACCORDION_DATA_COOL_SELECTORS === true;

                  /**@type {Element[]} */
                  let accordionAllHeaders = [].slice.call(
                    accordionContainer.querySelectorAll(".first-level-btn")
                  );

                  const destination = findById(
                    buttonTag.getAttribute(CONFIG.ATTR_CONTROLS),
                    hashId
                  );
                  const stateButton = buttonTag.getAttribute(
                    CONFIG.ATTR_EXPANDED
                  );

                  if (!coolSelectors) {
                    accordionAllHeaders = accordionAllHeaders.filter(
                      element =>
                        element.parentNode.parentNode === accordionContainer
                    );
                  }

                  // if closed
                  if (stateButton === "false") {
                    buttonTag.setAttribute(CONFIG.ATTR_EXPANDED, "true");
                    destination.removeAttribute(CONFIG.ATTR_HIDDEN);
                    destination.classList.add("open");
                    // making second level links tabbable if sub nav panel is opened
                    destination
                      .querySelectorAll(".second-level-link")
                      .forEach(item => item.removeAttribute("tabindex"));
                  } else {
                    buttonTag.setAttribute(CONFIG.ATTR_EXPANDED, "false");
                    destination.setAttribute(CONFIG.ATTR_HIDDEN, "true");
                    destination.classList.remove("open");
                    // adding tabindex to links to make sure they are not tabable if sub nav panel is closed
                    destination
                      .querySelectorAll(".second-level-link")
                      .forEach(item => item.setAttribute("tabindex", "-1"));
                  }

                  if (!mobileView()) {
                    accordionAllHeaders.forEach(header_node => {
                      //Close all the other panels

                      const destinationPanel = findById(
                        header_node.getAttribute(CONFIG.ATTR_CONTROLS),
                        hashId
                      );

                      if (header_node !== buttonTag) {
                        header_node.setAttribute(CONFIG.ATTR_EXPANDED, "false");
                        destinationPanel.classList.remove("open");

                        //Added fix to make closed panels non-tabbable
                        destinationPanel
                          .querySelectorAll(".second-level-link")
                          .forEach(item => item.setAttribute("tabindex", "-1"));
                      }
                    });
                  }

                  setTimeout(() => {
                    buttonTag.focus();
                  }, 0);
                  e.stopPropagation(); // making icons and other buttons elements clickable  https://css-tricks.com/slightly-careful-sub-elements-clickable-things/
                  e.preventDefault();
                })();
              }
            })();
          }
        },
        true
      );
    });

    return plugin;
  };

  // @ts-ignore
  window.van11yAccessibleAccordionAria = main();

  const onLoad = function onLoad() {
    // @ts-ignore
    const expand_default = window.van11yAccessibleAccordionAria();
    expand_default.attach();

    document.removeEventListener("DOMContentLoaded", onLoad);
  };

  document.addEventListener("DOMContentLoaded", onLoad);

  function NavReset() {
    //RESET
    document
      .querySelectorAll(".first-level-btn")
      .forEach(el => el.setAttribute("aria-expanded", "false"));
    document.querySelectorAll(".sub-nav").forEach(el => {
      el.setAttribute("aria-hidden", "true");
      el.classList.remove("open");
    });
    document
      .querySelectorAll(".second-level-link")
      .forEach(el => el.setAttribute("tabindex", "-1"));

    if (window.innerWidth <= 991) {
      document
        .querySelectorAll(".rotate")
        .forEach(
          (/**@type {HTMLElement} */ el) => (el.style.display = "block")
        );
    } else {
      document
        .querySelectorAll(".rotate")
        .forEach((/**@type {HTMLElement} */ el) => (el.style.display = "none"));
      const nav = document.querySelector("#navigation");
      nav.classList.remove("collapse");
      nav.removeAttribute("aria-hidden");
    }
  }

  const isDocumentReady = (
    /** @type {{ (): void; (this: Document, ev: Event): any; }} */ callbackFunction
  ) => {
    if (document.readyState != "loading") callbackFunction();
    else document.addEventListener("DOMContentLoaded", callbackFunction);
  };

  // Remove href if <a> has a link
  isDocumentReady(() => {
    const navigationJS = document.querySelector(".main-navigation");

    const subnavbtnJS = document.querySelectorAll(
      ".main-navigation .nav-item a.has-sub-btn"
    );
    subnavbtnJS.forEach(item => {
      // Change <a> tag to div since you can't place button into <a> tag
      const newDiv = document.createElement("div");
      newDiv.innerHTML = item.innerHTML;
      newDiv.classList.add("has-sub-btn");
      item.replaceWith(newDiv);
    });

    if (mobileView()) {
      navigationJS.classList.add("collapse");
    }

    const singleLevel = navigationJS.classList.contains("singleLevel");
    const setActiveLinkByFolder =
      navigationJS.classList.contains("auto-highlight");

    const navItemsJS = document.querySelectorAll(".main-navigation .nav-item");

    const navItemsWithSubsJS = /** @type {Element[]} */ (
      [].slice.call(navItemsJS)
    ).filter(x => x.querySelector(".sub-nav"));

    // HIGHLIGHT APPROPRIATE NAV ITEM

    /**@type {String} */
    let defaultActiveLink;
    //TODO: Why is this always blank?  History, we used to ask them to put a var like this in the root of their page to set default menu.

    //Globally set var
    const reMainNav =
      typeof defaultActiveLink !== "undefined"
        ? new RegExp(`^${defaultActiveLink}$`, "i")
        : null; // Regex for finding the index of the default main list item

    navItemsJS.forEach(navItem => {
      const link = navItem.querySelector(".first-level-btn, .first-level-link");

      if (reMainNav) {
        if (link.textContent.match(reMainNav)) {
          navItem.classList.add("active");
        }
      } else if (setActiveLinkByFolder && link.getAttribute("href")) {
        const arrNavLink = link.getAttribute("href").split("/");
        const arrCurrentURL = location.href.split("/");

        if (arrNavLink.length > 4 && arrCurrentURL[3] === arrNavLink[3]) {
          // folder of current URL matches this nav link
          navItem.classList.add("active");
        }
      }
    });

    // Reset if click outside of nav
    document.addEventListener("mouseup", e => {
      const navContainer = document.querySelector(".main-navigation");

      // if the target of the click isn't the navigation container nor a descendant of the navigation
      if (
        navContainer !== e.target &&
        !navContainer.contains(/**@type {Node} */ (e.target))
      ) {
        NavReset();
      }
    });

    // Nav items with subs
    navItemsWithSubsJS.forEach(el => {
      const itemCount = el.querySelectorAll(".second-level-nav > li").length;
      if (itemCount <= 2) {
        const subnav = el.querySelector(".sub-nav");
        subnav.classList.add("with-few-items");
      }
    });

    // Add class has-sub, then add carrots
    if (!singleLevel) {
      document.querySelectorAll(".first-level-btn").forEach(el => {
        el.classList.add("has-sub");

        const carrot = document.createElement("span");
        carrot.classList.add("ca-gov-icon-caret-down", "carrot");
        carrot.setAttribute("aria-hidden", "true");

        const toggleSubNav = document.createElement("div");
        toggleSubNav.classList.add("ca-gov-icon-caret-right", "rotate");
        toggleSubNav.setAttribute("aria-hidden", "true");
        toggleSubNav.style.display = mobileView() ? "block" : "none";

        el.appendChild(toggleSubNav);
        el.appendChild(carrot);
      });
    }
  });

  // Do Navigation Reset function on window resize uless it's mobile device.
  window.addEventListener("resize", () => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      return false;
    } else {
      document
        .querySelector(".toggle-menu")
        .setAttribute("aria-expanded", "false");

      //Collapse the nav when narrow
      const nav = document.querySelector("#navigation");
      nav.classList.add("collapse");
      nav.classList.remove("show");
      nav.setAttribute("aria-hidden", "true");

      NavReset();
    }
  });

  // Reset on escape
  document.addEventListener("keyup", e => {
    // keyCode has been deprecated
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    if (e.key === "Escape") {
      NavReset();
    }
  });

  // Add bold to current subnav link
  const addActive = () => {
    /** @type {NodeListOf<HTMLAnchorElement>} */
    const activeLink = document.querySelectorAll(".second-level-link"),
      len = activeLink.length,
      full_path = location.href.split("#")[0]; //Ignore hashes?

    // Loop through each link.
    for (let i = 0; i < len; i++) {
      if (activeLink[i].href.split("#")[0] == full_path) {
        activeLink[i].className += " bold";
      }
    }
  };
  addActive();
})();
