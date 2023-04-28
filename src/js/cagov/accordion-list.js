//@ts-check
((w, doc) => {
  /**
   * Local object for method references
   * and define script meta-data
   */
  const ARIAaccordion = {};
  w["ARIAaccordion"] = ARIAaccordion;

  ARIAaccordion.NS = "ARIAaccordion";
  ARIAaccordion.AUTHOR = "Scott O'Hara";
  ARIAaccordion.VERSION = "3.2.1";
  ARIAaccordion.LICENSE =
    "https://github.com/scottaohara/accessible_accordions/blob/master/LICENSE";

  const widgetClass = "accordion";
  const widgetTriggerClass = `${widgetClass}__trigger`;
  const widgetHeadingClass = `${widgetClass}__heading`;
  const widgetPanelClass = `${widgetClass}__panel`;

  const widgetHeading = "[data-aria-accordion-heading]";
  const widgetPanel = "[data-aria-accordion-panel]";

  let idCounter = 0;

  /**
   * gets the correct selector, "LI" children or not
   * @param {Document} mydoc
   * @param {string} id
   */
  const getChildSelector = (mydoc, id) =>
    mydoc.querySelectorAll(`#${id}> li`).length ? `#${id} li > ` : `#${id} > `;

  /**
   * Global Create
   *
   * This function validates that the minimum required markup
   * is present to create the ARIA widget(s).
   * Any additional markup elements or attributes that
   * do not exist in the found required markup patterns
   * will be generated via this function.
   */
  ARIAaccordion.create = () => {
    let defaultPanel = "none";

    const widget = doc.querySelectorAll("[data-aria-accordion]");

    idCounter += 1;

    for (let i = 0; i < widget.length; i++) {
      const self = widget[i];

      /**
       * Check for IDs and create arrays of necessary
       * panels & headings for further setup functions.
       */
      if (!self.hasAttribute("id")) {
        self.id = `acc_${idCounter}-${i}`;
      }

      /**
       * Setup accordion classes
       */
      self.classList.add(widgetClass);

      /**
       * Get all panels & headings of an accordion pattern based
       * on a specific ID > direct child selector (this will ensure
       * that nested accordions don't get properties meant for
       * the parent accordion, or vice-versa).
       *
       * If accordions are contained within an ol/ul, the selector
       * needs to be different.
       */
      const childSelector = getChildSelector(doc, self.id);
      const panels = doc.querySelectorAll(`${childSelector}${widgetPanel}`);
      const headings = doc.querySelectorAll(`${childSelector}${widgetHeading}`);

      /**
       * Check for options:
       * data-default - is there a default opened panel?
       * data-constant - should the accordion always have A panel open?
       */
      if (self.hasAttribute("data-default")) {
        defaultPanel = self.getAttribute("data-default");
      }

      /**
       * Accordions with a constantly open panel are not a default
       * but if a data-constant attribute is used, then we need this
       * to be true.
       */
      const constantPanel = self.hasAttribute("data-constant");

      /**
       * Accordions can have multiple panels open at a time,
       * if they have a data-multi attribute.
       */
      //const multiPanel = self.hasAttribute("data-multi");

      /**
       * If accordion panels are meant to transition, apply this inline style.
       * This is to help mitigate a quick flash of CSS being applied to the
       * no-js styling, and having an unwanted transition on initial page load.
       */
      if (self.hasAttribute("data-transition")) {
        const thesePanels = self.querySelectorAll(widgetPanel);

        for (let t = 0; t < thesePanels.length; t++) {
          thesePanels[t].classList.add(`${widgetPanelClass}--transition`);
        }
      }

      /**
       * Setup Panels, Headings & Buttons
       */
      ARIAaccordion.setupPanels(self.id, panels, defaultPanel, constantPanel);
      ARIAaccordion.setupHeadingButton(headings, constantPanel);

      const triggers = doc.querySelectorAll(
        `${childSelector}${widgetHeading} .${widgetTriggerClass}`
      );

      /**
       * Now that the headings/triggers and panels are setup
       * we can grab all the triggers and setup their functionality.
       */
      for (let t = 0; t < triggers.length; t++) {
        triggers[t].addEventListener("click", ARIAaccordion.actions);
        triggers[t].addEventListener("keydown", ARIAaccordion.keytrolls);
      }
    } // for(widget.length)
  }; // ARIAaccordion.create()

  ARIAaccordion.setupPanels = function (
    /** @type {string} */ id,
    /** @type {NodeListOf<Element>} */ panels,
    /** @type {string} */ defaultPanel,
    /** @type {boolean} */ constantPanel
  ) {
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      const panelID = `${id}_panel_${i + 1}`;
      const setPanel = defaultPanel;
      const constant = constantPanel;

      panel.setAttribute("id", panelID);
      ariaHidden(panels[0], true);

      panel.classList.add(widgetPanelClass);

      /**
       * Set the accordion to have the appropriately
       * opened panel if a data-default value is set.
       * If no value set, then no panels are open.
       */
      //Removing broken code...
      //if (setPanel !== 'none' && parseInt(setPanel) !== NaN) {
      if (setPanel !== "none" && !Number.isNaN(parseInt(setPanel))) {
        const setPanelInt = parseInt(setPanel);

        // if value is 1 or less
        if (setPanelInt <= 1) {
          ariaHidden(panels[0], false);
        }

        // if value is more than the number of panels, then open
        // the last panel by default
        else if (setPanelInt - 1 >= panels.length) {
          ariaHidden(panels[panels.length - 1], false);
        }

        // for any other value between 2 - the last panel #, open that one
        else {
          ariaHidden(panels[setPanelInt - 1], false);
        }
      }

      /**
       * If an accordion is meant to have a consistently open panel,
       * and a default open panel was not set (or was not set correctly),
       * then run one more check.
       */
      // removing broken code...
      // if ((constant && setPanel === "none") || parseInt(setPanel) === NaN) {
      if (
        constant &&
        (setPanel === "none" || Number.isNaN(parseInt(setPanel)))
      ) {
        ariaHidden(panels[0], false);
      }
    }
  }; // ARIAaccordion.setupPanels

  ARIAaccordion.setupHeadingButton = function (
    /** @type {NodeListOf<Element>} */ headings,
    /** @type {boolean} */ constantPanel
  ) {
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const targetID = heading.nextElementSibling.id;
      const targetState = doc
        .getElementById(targetID)
        .getAttribute("aria-hidden");

      // setup new heading buttons
      const newButton = doc.createElement("button");
      const buttonText = heading.textContent;
      // clear out the heading's content
      heading.innerHTML = "";
      // provide the heading with a class for styling
      heading.classList.add(widgetHeadingClass);

      newButton.setAttribute("type", "button");
      newButton.setAttribute("aria-controls", targetID);
      newButton.setAttribute("id", `${targetID}_trigger`);
      newButton.classList.add(widgetTriggerClass);

      /**
       * Check the corresponding panel to see if it was set up
       * to be hidden or shown by default. Add an aria-expanded
       * attribute value that is appropriate.
       */
      if (targetState === "false") {
        ariaExpanded(newButton, true);
        isCurrent(newButton, true);

        /**
         * Check to see if this an accordion that needs a constantly
         * opened panel, and if the button's target is not hidden.
         */
        if (constantPanel) {
          newButton.setAttribute("aria-disabled", "true");
        }
      } else {
        ariaExpanded(newButton, false);
        isCurrent(newButton, false);
      }

      // Add the Button & previous heading text
      heading.appendChild(newButton);
      newButton.appendChild(doc.createTextNode(buttonText));
    }
  }; // ARIAaccordion.createButton

  ARIAaccordion.actions = function (/** @type {Event} */ e) {
    // Need to pass in if this is a multi accordion or not.
    // Also need to pass in existing trigger arrays.
    const thisAccordion = this.id.replace(/_panel.*$/g, "");
    const thisTarget = doc.getElementById(this.getAttribute("aria-controls"));

    const childSelector = getChildSelector(doc, thisAccordion);
    const thisTriggers = doc.querySelectorAll(
      `${childSelector}${widgetHeading} .${widgetTriggerClass}`
    );

    e.preventDefault();

    ARIAaccordion.togglePanel(e, thisAccordion, thisTarget, thisTriggers);
  }; // ARIAaccordion.actions()

  ARIAaccordion.togglePanel = function (
    /** @type {Event} */ e,
    /** @type {string} */ thisAccordion,
    /** @type {Element} */ targetPanel,
    /** @type {NodeListOf<Element>} */ triggers
  ) {
    const thisTrigger = /** @type {Element} */ (e.target);

    // check to see if a trigger is disabled
    if (thisTrigger.getAttribute("aria-disabled") !== "true") {
      let getID = thisTrigger.getAttribute("aria-controls");

      isCurrent(thisTrigger, true);

      if (thisTrigger.getAttribute("aria-expanded") === "true") {
        ariaExpanded(thisTrigger, false);
        ariaHidden(targetPanel, true);
      } else {
        ariaExpanded(thisTrigger, true);
        ariaHidden(targetPanel, false);

        if (doc.getElementById(thisAccordion).hasAttribute("data-constant")) {
          ariaDisabled(thisTrigger, true);
        }
      }

      if (
        doc.getElementById(thisAccordion).hasAttribute("data-constant") ||
        !doc.getElementById(thisAccordion).hasAttribute("data-multi")
      ) {
        for (let i = 0; i < triggers.length; i++) {
          if (thisTrigger !== triggers[i]) {
            isCurrent(triggers[i], false);
            getID = triggers[i].getAttribute("aria-controls");
            ariaDisabled(triggers[i], false);
            ariaExpanded(triggers[i], false);
            ariaHidden(doc.getElementById(getID), true);
          }
        }
      }
    }
  };

  ARIAaccordion.keytrolls = function (/** @type {KeyboardEvent} */ e) {
    if (
      /** @type {HTMLElement} */ (e.target).classList.contains(
        widgetTriggerClass
      )
    ) {
      const keyCode = e.keyCode || e.which;

      // const keyUp = 38;
      // const keyDown = 40;
      const keyHome = 36;
      const keyEnd = 35;

      const thisAccordion = this.id.replace(/_panel.*$/g, "");

      const childSelector = getChildSelector(doc, thisAccordion);

      /** @type {NodeListOf<HTMLElement>} */
      const thisTriggers = doc.querySelectorAll(
        `${childSelector}${widgetHeading} .${widgetTriggerClass}`
      );

      switch (keyCode) {
        /**
         * keyUp & keyDown are optional controls
         * for accordion components.
         */
        // case keyUp:
        //  if ( doc.getElementById(thisAccordion).hasAttribute('data-up-down') ) {
        //   e.preventDefault();
        //   // optional up arrow controls
        //  }
        //  break;
        // case keyDown:
        //  if ( doc.getElementById(thisAccordion).hasAttribute('data-up-down') ) {
        //   e.preventDefault();
        //   // optional down arrow control
        //  }
        //  break;
        /**
         * keyEnd/Home are optional functions that may not be inherently known
         * to most users and, in the case of END, conflict with expected
         * usage of that key with NVDA.
         */
        case keyEnd:
          e.preventDefault();
          thisTriggers[thisTriggers.length - 1].focus();
          break;

        case keyHome:
          e.preventDefault();
          thisTriggers[0].focus();
          break;

        default:
          break;
      }
    }
  }; // ARIAaccordion.keytrolls()

  /**
   * Initialize Accordion Functions
   * if expanding this script, place any other
   * initialize functions within here.
   */
  ARIAaccordion.init = function () {
    ARIAaccordion.create();
  };

  /**
   * Helper Functions
   * Just to cut down on the verboseness of some declarations
   */
  const ariaHidden = function (
    /** @type {Element} */ el,
    /** @type {boolean} */ state
  ) {
    el.setAttribute("aria-hidden", state.toString());
  };

  const ariaExpanded = function (
    /** @type {Element} */ el,
    /** @type {boolean} */ state
  ) {
    el.setAttribute("aria-expanded", state.toString());
  };

  const ariaDisabled = function (
    /** @type {Element} */ el,
    /** @type {boolean} */ state
  ) {
    el.setAttribute("aria-disabled", state.toString());
  };

  const isCurrent = function (
    /** @type {Element} */ el,
    /** @type {boolean} */ state
  ) {
    el.setAttribute("data-current", state.toString());
  };

  // go go JavaScript
  ARIAaccordion.init();
})(window, document);
