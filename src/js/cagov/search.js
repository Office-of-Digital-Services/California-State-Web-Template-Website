//@ts-check
/* -----------------------------------------
   SEARCH - /source/js/cagov/search.js
----------------------------------------- */
window.addEventListener("load", () => {
  const searchContainer = document.querySelector("#head-search"); // contains the search form
  /** @type {HTMLInputElement} */
  const searchText = document.querySelector(".search-textfield"); // search textfield, unique
  const resultsContainer = document.querySelector(".search-results-container"); // /sample/featured-search.html -- maybe not used?
  const searchInput = document.querySelector(
    "#head-search #Search .search-textfield"
  ); // search textfield -- same as searchText ?
  const searchSubmit = document.querySelector(
    "#head-search #Search .gsc-search-button"
  ); // search button, unique
  const searchReset = document.querySelector(
    "#head-search #Search .close-search"
  ); // hide search form on subpages, unique

  const featuredsearch = searchContainer?.classList.contains("featured-search"); // only exists on the home page (featured search) layout, and /sample/navigation-full-width-utility.html
  const searchactive = searchContainer?.classList.contains("active"); // "active" is applied on subpages when search form is visible

  const searchlabel = document.querySelector("#SearchInput"); // label for textfield
  /** @type {HTMLElement} */
  const globalHeader = document.querySelector(".global-header"); // header, contains nav, search form, etc, unique
  /** @type {HTMLElement} */
  const searchbox = document.querySelector(
    ".search-container:not(.featured-search)"
  ); // only on subpages, unique, same as #head-search
  const headerHeight = globalHeader.offsetHeight; // header height
  /** @type {HTMLElement} */
  const utility = document.querySelector(".utility-header"); // utility header, unique

  const utilityHeight = utility?.offsetHeight || 0;

  // utility header height
  /** @type {NodeListOf<HTMLElement>} */
  const alertBanner = document.querySelectorAll(".alert-banner"); // page can have multiple
  const alertClose = document.querySelectorAll(".alert-banner .close");
  let alertbannerHeight = 0;
  let navigationHeight = 0;
  //const fullnav = document.querySelector(".top-level-nav"); // navigation ul tag, unique
  const navsearch = document.querySelector(".navigation-search"); // contains navigation and search form, unique

  const body = document.querySelector("body");

  if (searchText) {
    // Unfreeze search width when blured.
    const unfreezeSearchWidth = () => {
      searchContainer.classList.remove("focus");
      document.querySelector(".search-container").classList.add("focus"); // search-container is unique
    };
    searchText.addEventListener("blur", unfreezeSearchWidth, false);
    searchText.addEventListener("focus", unfreezeSearchWidth, false);
    const chgHandler = function () {
      if (this.value) {
        body.classList.add("active-search");
      }
    };
    searchText.addEventListener("change", chgHandler, false);
    searchText.addEventListener("keyup", chgHandler, false);
    searchText.addEventListener("paste", chgHandler, false);
  }

  if (!featuredsearch) {
    // added aria expaned attr for accessibility
    const firstLevelBtn = document.querySelector("button.first-level-link");
    if (firstLevelBtn) {
      document
        .querySelector("button.first-level-link")
        .setAttribute("aria-expanded", "false");
    }
  }

  //  search box top position
  if (!mobileView_for_search()) {
    // taking into account multiple alert banners
    alertBanner.forEach(oneBanner => {
      alertbannerHeight += oneBanner.offsetHeight;
    });
    //fullwidth navigation
    if (navsearch.classList.contains("full-width-nav")) {
      navigationHeight = 82;
    }
    // calulation search box top position
    const searchtop =
      headerHeight - utilityHeight - alertbannerHeight - navigationHeight;
    if (!mobileView_for_search() && searchbox) {
      searchbox.style.top = `${Math.max(searchtop, 82)}px`;
    }
  }

  // have the close button remove search results and the applied classes
  //resultsContainer.find('.close').on('click', removeSearchResults);
  const resContainClose = document.querySelector(
    ".search-results-container .close"
  );
  if (resContainClose) {
    resContainClose.addEventListener("click", removeSearchResults, false);
  }

  //searchContainer.find('.close').on('click', removeSearchResults);
  const hsClose = document.querySelector("#head-search .close");
  if (hsClose) {
    hsClose.addEventListener("click", removeSearchResults, false);
  }

  // Our special nav icon which we need to hook into for starting the search
  // $('#nav-item-search')

  // so instead we are binding to what I'm assuming will always be the search
  const searchButton = document.querySelector("#nav-item-search");
  if (searchButton) {
    document.querySelector("#nav-item-search").addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        searchText.focus();
        // mobile
        if (
          mobileView_for_search() &&
          !searchContainer.classList.contains("active")
        ) {
          window.scrollTo({
            top: searchContainer.getBoundingClientRect().top,
            left: 0,
            behavior: "smooth"
          });
        }

        if (
          !featuredsearch &&
          document.querySelector(".search-container:not(.featured-search)")
        ) {
          document
            .querySelector(".search-container:not(.featured-search)")
            .classList.toggle("active");
        }

        // hide Search form if it's not active
        if (searchactive) {
          // added aria expanded attr for accessibility
          this.querySelector("button").setAttribute("aria-expanded", "true");
          removeSearchAttr();
        } else {
          // added aria expaned attr for accessibility
          this.querySelector("button").setAttribute("aria-expanded", "false");
          setSearchAttr();
        }

        if (featuredsearch) {
          removeSearchAttr();
        }

        if (mobileView_for_search() && featuredsearch) {
          searchContainer.classList.toggle("active");
          ariaHidden();
        }

        // let the user know the input box is where they should search
        searchContainer.classList.add("play-animation");
        searchContainer.addEventListener("animationend", function () {
          this.classList.remove("play-animation");
        });
      },
      false
    );
  }

  // Close search when close icon is clicked
  if (searchReset) {
    searchReset.addEventListener("click", () => {
      removeSearchResults();
    });
  }

  function removeSearchResults() {
    body.classList.remove("active-search");
    searchText.value = "";
    searchContainer.classList.remove("active");
    searchContainer.setAttribute("aria-hidden", "true");
    if (resultsContainer) {
      resultsContainer.classList.remove("visible");
    }
    if (document.querySelector(".ask-group")) {
      document.querySelector(".ask-group").classList.remove("fade-out");
    }

    if (!featuredsearch) {
      // added aria expaned attr for accessibility
      document
        .querySelector("button.first-level-link")
        .setAttribute("aria-expanded", "false");
      setSearchAttr();
    }
    // fire a scroll event to help update headers if need be
    window.dispatchEvent(new CustomEvent("scroll"));

    //        document.dispatchEvent('cagov.searchresults.hide'); // ???

    if (mobileView_for_search()) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      ariaHidden();
    }
  }

  function removeSearchAttr() {
    if (searchInput) {
      searchInput.removeAttribute("tabindex");
      searchInput.removeAttribute("aria-hidden");
    }
    if (searchSubmit) {
      searchSubmit.removeAttribute("tabindex");
      searchSubmit.removeAttribute("aria-hidden");
    }
    if (searchReset) {
      searchReset.removeAttribute("tabindex");
      searchReset.removeAttribute("aria-hidden");
    }
    if (searchlabel) searchlabel.removeAttribute("aria-hidden");

    if (searchContainer) searchContainer.removeAttribute("aria-hidden");
  }

  function setSearchAttr() {
    if (searchInput) {
      searchInput.setAttribute("tabindex", "-1");
      searchInput.setAttribute("aria-hidden", "true");
    }
    if (searchSubmit) {
      searchSubmit.setAttribute("tabindex", "-1");
      searchSubmit.setAttribute("aria-hidden", "true");
    }
    if (searchReset) {
      searchReset.setAttribute("tabindex", "-1");
      searchReset.setAttribute("aria-hidden", "true");
    }
    if (searchlabel) searchlabel.setAttribute("aria-hidden", "true");

    if (searchContainer) searchContainer.setAttribute("aria-hidden", "true");
  }

  // Mobile Search toggle
  document.querySelector(".toggle-search").addEventListener("click", () => {
    document.querySelector(".search-container").classList.toggle("active");

    if (searchactive) {
      removeSearchAttr();

      searchText.focus();
      window.scrollTo({
        top: searchContainer.getBoundingClientRect().top,
        left: 0,
        behavior: "smooth"
      });
    } else {
      setSearchAttr();
    }
  });

  // Make Search form tabable if it's featured
  if (searchContainer) {
    if (searchContainer.classList.contains("featured-search")) {
      removeSearchAttr();
    } else {
      setSearchAttr();
    }
  }

  // on alert close event
  alertClose.forEach(oneClose => {
    oneClose.addEventListener("click", () => {
      searchTop();
    });
  });

  ariaHidden();
});

// Calculation search box top property on the scroll for the fixed nav
window.addEventListener("scroll", () => {
  if (!mobileView_for_search()) {
    // setting timeout before calculating the search box top property otherwise it can take into account transitional values.
    setTimeout(() => {
      searchTop();
    }, 400);

    // remove featured search on scroll in desktop
    const FeaturedSearch = document.querySelector("nav ~ #head-search");
    if (
      document.body.scrollTop >= 100 ||
      document.documentElement.scrollTop >= 100
    ) {
      if (FeaturedSearch) {
        FeaturedSearch.classList.add("hidden-up");
      }
    } else if (FeaturedSearch) {
      FeaturedSearch.classList.remove("hidden-up");
    }
  }
});

//  search box top position if browser window is resized
window.addEventListener("resize", () => {
  searchTop();
  ariaHidden();
});

function searchTop() {
  /** @type {HTMLElement} */
  const globalHeader = document.querySelector(".global-header");
  /** @type {HTMLElement} */
  const searchbox = document.querySelector(
    ".search-container:not(.featured-search)"
  );
  const headerHeight = globalHeader.offsetHeight;
  /** @type {HTMLElement} */
  const utility = document.querySelector(".utility-header");
  const utilityHeight = utility.offsetHeight;
  /** @type {NodeListOf<HTMLElement>} */
  const alertBanner = document.querySelectorAll(".alert-banner");

  let alertbannerHeight = 0;
  let navigationHeight = 0;

  const navsearch = document.querySelector(".navigation-search");
  // taking into account multiple alert banners
  alertBanner.forEach(oneBanner => {
    alertbannerHeight += oneBanner.offsetHeight;
  });
  // Full width navigation
  if (navsearch.classList.contains("full-width-nav")) {
    navigationHeight = 82;
  } else {
    navigationHeight = 0;
  }
  // calulation search box top position
  const searchtop =
    headerHeight - utilityHeight - alertbannerHeight - navigationHeight;
  if (!mobileView_for_search() && searchbox) {
    searchbox.style.top = `${Math.max(searchtop, 55)}px`;
  }
}

function ariaHidden() {
  const searchContainer = document.querySelector("#head-search");
  if (searchContainer) {
    const featuredsearch =
      searchContainer.classList.contains("featured-search");
    if (featuredsearch) {
      if (mobileView_for_search()) {
        searchContainer.setAttribute("aria-hidden", "true");
        document.querySelector("[name='q']").setAttribute("tabindex", "-1");
        document
          .querySelector(".gsc-search-button")
          .setAttribute("tabindex", "-1");
      } else {
        searchContainer.removeAttribute("aria-hidden");
        document.querySelector("[name='q']").removeAttribute("tabindex");
        document
          .querySelector(".gsc-search-button")
          .removeAttribute("tabindex");
      }
    } else {
      searchContainer.setAttribute("aria-hidden", "true");
    }
  }
}

const mobileView_for_search = () => {
  const mobileElement = document.querySelector(
    ".global-header .mobile-controls"
  );

  if (mobileElement) {
    return getComputedStyle(mobileElement)["display"] !== "none";
  } else {
    return false; // or whatever is supposed to be returned when there is no header
  }
};
