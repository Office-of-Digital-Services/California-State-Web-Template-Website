//@ts-check

/* -----------------------------------------
   TABS -- custom accessible tabs
----------------------------------------- */

(function () {
  // Get relevant elements and collections
  const allTabs = document.querySelectorAll(".tabs");
  allTabs.forEach(tabbed => {
    const tablist = tabbed.querySelector("ul");
    const tabs = tablist.querySelectorAll("a");
    /** @type {NodeListOf<HTMLElement>} */
    const panels = tabbed.querySelectorAll('[id^="section"]');

    // The tab switching function
    /**
     *
     * @param {Element} oldTab
     * @param {HTMLElement} newTab
     */
    const switchTab = (oldTab, newTab) => {
      newTab.focus();
      // Make the active tab focusable by the user (Tab key)
      newTab.removeAttribute("tabindex");
      // Set the selected state
      newTab.setAttribute("aria-selected", "true");
      oldTab.removeAttribute("aria-selected");
      oldTab.setAttribute("tabindex", "-1");
      // Get the indices of the new and old tabs to find the correct
      // tab panels to show and hide
      const index = Array.prototype.indexOf.call(tabs, newTab);
      const oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
      panels[oldIndex].hidden = true;
      panels[index].hidden = false;
    };

    // Add the tablist role to the first <ul> in the .tabbed container
    tablist.setAttribute("role", "tablist");

    // Add semantics are remove user focusability for each tab

    tabs.forEach((tab, i) => {
      tab.setAttribute("role", "tab");
      tab.setAttribute("tabindex", "-1");
      /** @type {Element} */ (tab.parentNode).setAttribute(
        "role",
        "presentation"
      );

      // Handle clicking of tabs for mouse users
      tab.addEventListener("click", e => {
        e.preventDefault();
        const currentTab = tablist.querySelector("[aria-selected]");
        if (e.currentTarget !== currentTab) {
          switchTab(currentTab, /** @type {HTMLElement} */ (e.currentTarget));
        }
      });

      // Handle keydown events for keyboard users
      tab.addEventListener("keydown", e => {
        // Get the index of the current tab in the tabs node list
        const index = Array.prototype.indexOf.call(tabs, e.currentTarget);
        // Work out which key the user is pressing and
        // Calculate the new tab's index where appropriate
        const dir = ["ArrowLeft", "Left"].includes(e.key)
          ? index - 1
          : ["ArrowRight", "Right"].includes(e.key)
          ? index + 1
          : ["ArrowDown", "Down"].includes(e.key)
          ? "down"
          : null;
        if (dir !== null) {
          e.preventDefault();
          // If the down key is pressed, move focus to the open panel,
          // otherwise switch to the adjacent tab
          dir === "down"
            ? panels[i].focus()
            : tabs[dir]
            ? switchTab(/** @type {Element} */ (e.currentTarget), tabs[dir])
            : void 0;
        }
      });
    });

    // Add tab panel semantics and hide them all
    panels.forEach((panel, i) => {
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("tabindex", "-1");
      panel.setAttribute("aria-label", tabs[i].innerText);
      panel.hidden = true;
    });

    // Initially activate the first tab and reveal the first tab panel
    tabs[0].removeAttribute("tabindex");
    tabs[0].setAttribute("aria-selected", "true");
    panels[0].hidden = false;
  });
})();
