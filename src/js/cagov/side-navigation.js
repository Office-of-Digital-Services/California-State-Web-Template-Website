/* -----------------------------------------
   SEARCH - /source/js/cagov/side-navigation.js
----------------------------------------- */

// Remebemer scrolling position
let sidenavigation = document.querySelector(".side-navigation");
let topposition = localStorage.getItem("sidebar-scroll");



// Set active class on nav-heading links:
function addActiveClass() {
 var active_link = document.querySelectorAll(".nav-heading"),
  i = 0, len = active_link.length,
  full_path = location.href.split('#')[0]; //Ignore hashes?

 // Loop through each link.
 for (; i < len; i++) {
  if (active_link[i].href.split("#")[0] == full_path) {
   active_link[i].className += " active";
  }
 }
}
addActiveClass();


// Side nav heigth vs vewport

var siteHeader = document.querySelector("header");
var siteFooter = document.querySelector("footer");
if (siteHeader) {
 var siteHeaderHeight = siteHeader.clientHeight;
}
if (siteFooter) {
 var siteFooterHeight = siteFooter.clientHeight;
}

var mobileView$3 = function () {
 return getComputedStyle(document.querySelector('.global-header .mobile-controls'))['display'] !== 'none';
};

var timeout = false;
var delay = 250; // delay between calls 



function sidenavOverflow() {
 if (!mobileView$3()) {


  var viewportheight = document.documentElement.clientHeight;
  var viewportMinusHeader = viewportheight - siteHeaderHeight - 100;

  if (viewportMinusHeader <= document.querySelector(".side-navigation").clientHeight) {
   sidenavigation.classList.add("overflow-auto");
   // sidenavigation.setAttribute("style", "max-height:" + viewportMinusHeader + "px")
  }
  else {
   sidenavigation.classList.remove("overflow-auto");
   sidenavigation.removeAttribute("style");
  }

  if ([...sidenavigation.classList].includes("overflow-auto")) {
   sidenavigation.setAttribute("style", "max-height:" + viewportMinusHeader + "px")
  }
 }

 else {
  sidenavigation.classList.remove("overflow-auto");
  sidenavigation.removeAttribute("style");
 }


 // Remebemering scrolling position
 if (topposition !== null) {
  sidenavigation.scrollTop = parseInt(topposition, 10);
 }
 window.addEventListener("beforeunload", () => {
  localStorage.setItem("sidebar-scroll", sidenavigation.scrollTop);
 });


}

// Debouncing on resize
if (sidenavigation) {
 window.addEventListener('resize', function () {
  // clear the timeout
  clearTimeout(timeout);
  // start timing for event "completion"
  timeout = setTimeout(sidenavOverflow, delay);

 });
 sidenavOverflow();
}

