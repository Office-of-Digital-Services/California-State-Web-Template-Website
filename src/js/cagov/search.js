/* -----------------------------------------
   SEARCH - /source/js/cagov/search.js
----------------------------------------- */
window.addEventListener("load", function () {
  var searchContainer = document.querySelector("#head-search"); // contains the search form
  var searchText = document.querySelector(".search-textfield"); // search textfield, unique
  var resultsContainer = document.querySelector(".search-results-container"); // /sample/featured-search.html -- maybe not used?
  var searchInput = document.querySelector(
    "#head-search #Search .search-textfield"
  ); // search textfield -- same as searchText ?
  var searchSubmit = document.querySelector(
    "#head-search #Search .gsc-search-button"
  ); // search button, unique
  var searchReset = document.querySelector(
    "#head-search #Search .close-search"
  ); // hide search form on subpages, unique
  if (searchContainer) {
    var featuredsearch = searchContainer.classList.contains("featured-search"); // only exists on the home page (featured search) layout, and /sample/navigation-full-width-utility.html
    var searchactive = searchContainer.classList.contains("active"); // "active" is applied on subpages when search form is visible
  }
  var searchlabel = document.querySelector("#SearchInput"); // label for textfield
  var globalHeader = document.querySelector(".global-header"); // header, contains nav, search form, etc, unique
  var searchbox = document.querySelector(
    ".search-container:not(.featured-search)"
  ); // only on subpages, unique, same as #head-search
  var headerHeight = globalHeader.innerHeight; // header height
  var utility = document.querySelector(".utility-header"); // utility header, unique
  if (utility) {
    var utilityHeight = utility.innerHeight;
  } else {
    var utilityHeight = 0;
  }
  // utility header height
  var alertBanner = document.querySelectorAll(".alert-banner"); // page can have multiple
  var alertClose = document.querySelectorAll(".alert-banner .close");
  var alertbannerHeight = 0;
  var navigationHeight = 0;
  var fullnav = document.querySelector(".top-level-nav"); // navigation ul tag, unique
  var navsearch = document.querySelector(".navigation-search"); // contains navigation and search form, unique

  var body = document.querySelector("body");

  //		not used:
  //    var $specialIcon =
  //        // setup the tabs
  //        $('.search-tabs button').on("click", function (e) {
  //            $(this).siblings().removeClass('active');
  //            $(this).tab('show').addClass('active');
  //            e.preventDefault();
  //        });

  if (searchText) {
    // Unfreeze search width when blured.
    var unfreezeSearchWidth = function (event) {
      searchContainer.classList.remove("focus");
      document.querySelector(".search-container").classList.add("focus"); // search-container is unique
    };
    searchText.addEventListener("blur", unfreezeSearchWidth, false);
    searchText.addEventListener("focus", unfreezeSearchWidth, false);
    var chgHandler = function (event) {
      if (this.value) {
        addSearchResults();
      }
    };
    searchText.addEventListener("change", chgHandler, false);
    searchText.addEventListener("keyup", chgHandler, false);
    searchText.addEventListener("paste", chgHandler, false);
  }

  if (!featuredsearch) {
    // added aria expaned attr for accessibility
    var firstLevelBtn = document.querySelector("button.first-level-link");
    if (firstLevelBtn) {
      document
        .querySelector("button.first-level-link")
        .setAttribute("aria-expanded", "false");
    }
  }

  //  search box top position
  if (!mobileView()) {
    // taking into account multiple alert banners
    alertBanner.forEach(oneBanner => {
      alertbannerHeight += oneBanner.innerHeight;
    });
    //fullwidth navigation
    if (navsearch.classList.contains("full-width-nav")) {
      navigationHeight = 82;
    }
    // calulation search box top position
    var searchtop =
      headerHeight - utilityHeight - alertbannerHeight - navigationHeight;
    if (!mobileView() && searchbox) {
      searchbox.style.top = Math.max(searchtop, 82);
    }
  }

  // have the close button remove search results and the applied classes
  //resultsContainer.find('.close').on('click', removeSearchResults);
  var resContainClose = document.querySelector(
    ".search-results-container .close"
  );
  if (resContainClose) {
    resContainClose.addEventListener("click", removeSearchResults, false);
  }

  //searchContainer.find('.close').on('click', removeSearchResults);
  var hsClose = document.querySelector("#head-search .close");
  if (hsClose) {
    hsClose.addEventListener("click", removeSearchResults, false);
  }

  // Our special nav icon which we need to hook into for starting the search
  // $('#nav-item-search')

  // so instead we are binding to what I'm assuming will aslways be the search
  var searchButton = document.querySelector("#nav-item-search");
  if (searchButton) {
    document.querySelector("#nav-item-search").addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        searchText.focus();
        // mobile
        if (mobileView() && !searchContainer.classList.contains("active")) {
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

        var featuredsearch =
          searchContainer.classList.contains("featured-search");
        var searchactive = searchContainer.classList.contains("active");
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

        if (mobileView() && featuredsearch) {
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

  // SEE navitgation.js for mobile click handlers

  // Close search when close icon is clicked
  if (searchReset) {
    searchReset.addEventListener("click", function () {
      removeSearchResults();
    });
  }

  // Helpers
  function addSearchResults() {
    body.classList.add("active-search");
    //searchContainer.addClass('active');
    //resultsContainer.addClass('visible');
    // close the the menu when we are search
    //$('#navigation').addClass('mobile-closed');
    // hide the ask group as well
    // $('.ask-group').addClass('fade-out');

    // fire a scroll event to help update headers if need be
    // $(window).scroll();

    // $.event.trigger('cagov.searchresults.show');
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

    if (mobileView()) {
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
  document
    .querySelector(".toggle-search")
    .addEventListener("click", function () {
      document.querySelector(".search-container").classList.toggle("active");
      var searchactive = searchContainer.classList.contains("active");
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
    oneClose.addEventListener("click", function () {
      searchTop();
    });
  });

  ariaHidden();
});

// Calculation search box top property on the scroll for the fixed nav
window.addEventListener("scroll", function () {
  if (!mobileView()) {
    // setting timeout before calculating the search box top property otherwise it can take into account transitional values.
    setTimeout(function () {
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
    } else {
      if (FeaturedSearch) {
        FeaturedSearch.classList.remove("hidden-up");
      }
    }
  }
});

//  search box top position if browser window is resized
window.addEventListener("resize", function () {
  searchTop();
  ariaHidden();
});

function searchTop() {
  var globalHeader = document.querySelector(".global-header");
  var searchbox = document.querySelector(
    ".search-container:not(.featured-search)"
  );
  var headerHeight = globalHeader.innerHeight;
  var utility = document.querySelector(".utility-header");
  var utilityHeight = utility.innerHeight;
  var alertBanner = document.querySelectorAll(".alert-banner");

  var alertbannerHeight = 0;

  var navsearch = document.querySelector(".navigation-search");
  // taking into account multiple alert banners
  alertBanner.forEach(oneBanner => {
    alertbannerHeight += oneBanner.innerHeight;
  });
  // Full width navigation
  if (navsearch.classList.contains("full-width-nav")) {
    navigationHeight = 82;
  } else {
    navigationHeight = 0;
  }
  // calulation search box top position
  var searchtop =
    headerHeight - utilityHeight - alertbannerHeight - navigationHeight;
  if (!mobileView() && searchbox) {
    searchbox.style.top = Math.max(searchtop, 55);
  }
}

function ariaHidden() {
  var searchContainer = document.querySelector("#head-search");
  if (searchContainer) {
    var featuredsearch = searchContainer.classList.contains("featured-search");
    if (featuredsearch) {
      if (mobileView()) {
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

var mobileView = function () {
  var mobileElement = document.querySelector(".global-header .mobile-controls");

  if (mobileElement) {
    return getComputedStyle(mobileElement)["display"] !== "none";
  } else {
    return false; // or whatever is supposed to be returned when there is no header
  }
};
