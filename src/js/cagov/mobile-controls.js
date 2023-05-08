//@ts-check

(() => {
  // VARIABLES
  const bodyCont = document.querySelector("body");
  const mainNav = document.querySelector(".main-navigation");
  const navButton = document.querySelector(".toggle-menu");
  const navSearchCont = document.querySelector(".navigation-search");
  const mobileCntls = document.querySelector(".global-header .mobile-controls");
  const mainCont = document.querySelector(".main-content");
  const footerGlobal = document.querySelector("footer");
  const footerSite = document.querySelector(".site-footer");
  const siteSettings = document.querySelector(".site-settings");
  const headerutility = document.querySelector(".utility-header");
  const headerutilityLinksCont = document.querySelector(
    ".utility-header .container .flex-row"
  );
  const navButtonCont = document.querySelector(
    ".mobile-controls .main-nav-icons"
  );
  const siteBranding = document.querySelector(".branding");
  const logoContainer = document.querySelector(".header-organization-banner");
  const utilityLinks = document.querySelector(".settings-links");
  let navDupLogo;
  let mobileControlsDisplay = getComputedStyle(mobileCntls).display;
  let allNavLinks;
  let allUtilityLinks;
  // We need timeout here to make sure navigation is created first (becasue naviagion.js is creating button elements dynamicaly) and then we can assign all thise links to our variable
  setTimeout(() => {
    allNavLinks = document.querySelectorAll(
      '.navigation-search a.first-level-link, .navigation-search button.first-level-btn, .navigation-search input, .navigation-search button, .navigation-search [tabindex]:not([tabindex="-1"])'
    );
    allUtilityLinks = document.querySelectorAll(
      '.settings-links a, .settings-links button, .settings-links input, .settings-links select, .settings-links [tabindex]:not([tabindex="-1"])'
    );
  }, 100);

  // all focusable elements other than navigation
  const allBodyLinks = document.querySelectorAll(
    '.utility-header .social-media-links a, .utility-header .social-media-links input, .utility-header .social-media-links button, .utility-header .social-media-links [tabindex]:not([tabindex="-1"]), .site-settings button, .site-settings a, .site-settings [tabindex]:not([tabindex="-1"]), .branding a, .branding button, .branding input, .branding select, .main-content a[href], .main-content button, .main-content input, .main-content textarea, .main-content select, .main-content details, .main-content [tabindex]:not([tabindex="-1"]), .site-footer a[href], .site-footer button, .site-footer input, .site-footer textarea, .site-footer select, .site-footer details, .site-footer [tabindex]:not([tabindex="-1"]), footer a[href], footer button, footer input, footer textarea, footer select, footer details, footer [tabindex]:not([tabindex="-1"])'
  );

  // create container for drawer mobile nav items
  const mobileItemsCont = document.createElement("div");
  mobileItemsCont.setAttribute("class", "nav-drawer");

  function duplicateLogo() {
    const logoDup = document.createElement("div");
    logoDup.setAttribute("class", "logo-nav");
    logoDup.innerHTML = logoContainer.innerHTML;
    return logoDup;
  }

  // move mobile navigation toggle button back into mobile controls container
  function moveNavToggleButtonToMobileControlsContainer() {
    setTimeout(() => {
      navButton.setAttribute("aria-expanded", "false");
      navButtonCont?.append(navButton);
    }, 300);
  }

  // ONLOAD
  window.onload = function () {
    // move duplicated logo to navigation drawer section
    navSearchCont?.prepend(mobileItemsCont);
    mobileItemsCont?.prepend(duplicateLogo());
    // assign logo link to nav the duplicate logo variable
    navDupLogo = document.querySelector(".logo-nav a");
    // if mobile
    if (mobileControlsDisplay == "block") {
      mobileNavDefault();
      // if desktop
    } else {
      desktopNavDefault();
    }
  };

  // Button click open and close menu function
  function openMenu() {
    mobileItemsCont.append(navButton);
    navSearchCont?.classList.toggle("visible");
    navSearchCont?.classList.toggle("not-visible");
    // Open
    if (navSearchCont?.classList.contains("visible")) {
      navButton.setAttribute("aria-expanded", "true");
      bodyCont?.classList.add("overflow-hidden");
      navSearchCont?.setAttribute("aria-hidden", "false");
      // make links focusable
      allNavLinks?.forEach(el => {
        el.removeAttribute("tabindex");
      });
      allUtilityLinks?.forEach(el => {
        el.removeAttribute("tabindex");
      });
      // make all the rest of the links not focusable
      allBodyLinks?.forEach(el => {
        el.setAttribute("tabindex", "-1");
      });
      navDupLogo?.removeAttribute("tabindex");
      // Hide all the website areas (add aria-hidden)
      mainCont?.setAttribute("aria-hidden", "true");
      footerGlobal?.setAttribute("aria-hidden", "true");
      footerSite?.setAttribute("aria-hidden", "true");
      siteSettings?.setAttribute("aria-hidden", "true");
      headerutility?.setAttribute("aria-hidden", "true");
      siteBranding?.setAttribute("aria-hidden", "true");

      // Close
    } else {
      navButton.setAttribute("aria-expanded", "false");
      bodyCont?.classList.remove("overflow-hidden");
      navSearchCont?.setAttribute("aria-hidden", "true");
      // removing focus
      allNavLinks?.forEach(el => {
        el.setAttribute("tabindex", "-1");
      });
      allUtilityLinks?.forEach(el => {
        el.setAttribute("tabindex", "-1");
      });
      allBodyLinks?.forEach(el => {
        el.removeAttribute("tabindex");
      });
      navDupLogo?.setAttribute("tabindex", "-1");
      // remove aria hidden for the rest of the site
      mainCont?.removeAttribute("aria-hidden");
      footerGlobal?.removeAttribute("aria-hidden");
      footerSite?.removeAttribute("aria-hidden");
      siteSettings?.removeAttribute("aria-hidden");
      headerutility?.removeAttribute("aria-hidden");
      siteBranding?.removeAttribute("aria-hidden");
      moveNavToggleButtonToMobileControlsContainer();
    }
  }

  // Default state for mobile
  function mobileNavDefault() {
    moveNavToggleButtonToMobileControlsContainer();
    mainNav?.before(utilityLinks);
    bodyCont?.classList.remove("overflow-hidden");
    navSearchCont?.classList.add("not-visible");
    navSearchCont?.classList.remove("visible");
    navSearchCont?.setAttribute("aria-hidden", "true");
    // removing focus
    allNavLinks?.forEach(el => {
      el.setAttribute("tabindex", "-1");
    });
    allUtilityLinks?.forEach(el => {
      el.setAttribute("tabindex", "-1");
    });
    allBodyLinks?.forEach(el => {
      el.removeAttribute("tabindex");
    });
    navDupLogo?.setAttribute("tabindex", "-1");
    // remove aria hidden for the rest of the site
    mainCont?.removeAttribute("aria-hidden");
    footerGlobal?.removeAttribute("aria-hidden");
    footerSite?.removeAttribute("aria-hidden");
    siteSettings?.removeAttribute("aria-hidden");
    headerutility?.removeAttribute("aria-hidden");
    siteBranding?.removeAttribute("aria-hidden");
  }

  // Default state for desktop
  function desktopNavDefault() {
    moveNavToggleButtonToMobileControlsContainer();
    headerutilityLinksCont?.append(utilityLinks);
    bodyCont?.classList.remove("overflow-hidden");
    navSearchCont?.classList.add("visible");
    navSearchCont?.classList.remove("not-visible");
    navSearchCont?.setAttribute("aria-hidden", "false");
    allNavLinks?.forEach(el => {
      el.removeAttribute("tabindex");
    });
    allUtilityLinks?.forEach(el => {
      el.removeAttribute("tabindex");
    });
    allBodyLinks?.forEach(el => {
      el.removeAttribute("tabindex");
    });
    navDupLogo?.removeAttribute("tabindex");
    // remove aria hidden for the rest of the site
    mainCont?.removeAttribute("aria-hidden");
    footerGlobal?.removeAttribute("aria-hidden");
    footerSite?.removeAttribute("aria-hidden");
    siteSettings?.removeAttribute("aria-hidden");
    headerutility?.removeAttribute("aria-hidden");
    siteBranding?.removeAttribute("aria-hidden");
    // move logo back to branding section
  }

  // Button Click event
  navButton.addEventListener("click", openMenu);

  // on resize function (hide mobile nav)
  window.addEventListener("resize", () => {
    // set changing wariable in here
    mobileControlsDisplay = getComputedStyle(mobileCntls).display;
    // if mobile
    if (mobileControlsDisplay == "block") {
      mobileNavDefault();
      // if desctop
    } else {
      desktopNavDefault();
    }
  });
})();
