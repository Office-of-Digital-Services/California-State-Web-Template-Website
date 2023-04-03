/* -----------------------------------------
   PAGE NAVIGATION - /source/js/cagov/page-navigation.js
----------------------------------------- */

function pageNav() {
  const headings = document.querySelectorAll("h2");
  const h2heading = document.querySelector("h2");
  const pagenav = document.querySelector(".page-navigation");
  // check if page navigation is empty and page has h2 headings
  if (pagenav && pagenav.childNodes.length === 0 && h2heading) {
    pagenavUL = document.createElement("ul");

    headings.forEach(h2 => {
      // find each h2 and their innter text
      innertext = h2.innerHTML;

      // add dashes for inner text for IDs
      innertextID = h2.innerHTML.replace(/\s+/g, "-");

      // set ID for each h2 based on inner taxt
      h2.setAttribute("id", innertextID);

      // Create anchor links
      var anchorlinks = '<a href="#' + innertextID + '">' + innertext + "</a>";

      // create li element
      var listnav = document.createElement("li");

      // Add achor links into list item
      listnav.innerHTML = anchorlinks;

      // appned list item to the UL
      pagenavUL.appendChild(listnav);

      // count number of h2 and add columns class to the ul if there are too many list items
      var h2number = headings.length;
      if (h2number > 5) {
        pagenavUL.classList.add("columns-2");
      } else if (h2number > 8) {
        pagenavUL.classList.add("columns-3");
      }
    });

    // create on this page label
    var onthispage =
      '<div id="on-this-page-navigation-label" class="label">On this page</div>';
    pagenav.innerHTML = onthispage;

    // add ul item to the nav and set aria labelledby
    pagenav.appendChild(pagenavUL);
    pagenav.setAttribute("aria-labelledby", "on-this-page-navigation-label");
  }
}

// call out the function on the page load
pageNav();
