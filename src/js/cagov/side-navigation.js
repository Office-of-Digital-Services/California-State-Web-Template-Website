/* -----------------------------------------
   SEARCH - /source/js/cagov/side-navigation.js
----------------------------------------- */


let sidenavigation = document.querySelector(".side-navigation");

let topposition = localStorage.getItem("sidebar-scroll");
if (sidenavigation) {
 if (topposition !== null) {
  sidenavigation.scrollTop = parseInt(topposition, 10);
 }


 window.addEventListener("beforeunload", () => {
  localStorage.setItem("sidebar-scroll", sidenavigation.scrollTop);
 });
}

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
