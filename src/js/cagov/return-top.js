//@ts-check
const returnTop = document.querySelector(".return-top");

// Add on-click event
returnTop.addEventListener("click", goToTopFunction);

function goToTopFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// If an user scrolls down the page for more than 400px activate back to top button
// othervise keep it invisible
let timer = 0;

let lastScrollTop = 0;

window.addEventListener(
  "scroll",
  () => {
    const returnTopButton = document.querySelector(".return-top");
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      returnTopButton.classList.remove("is-visible");
    } else if (
      document.body.scrollTop >= 400 ||
      document.documentElement.scrollTop >= 400
    ) {
      // upscroll code

      if (timer) {
        window.clearTimeout(timer);
      }
      returnTopButton.classList.add("is-visible");

      timer = window.setTimeout(() => {
        returnTopButton.classList.remove("is-visible");
      }, 2000); //Back to top removes itself after 2 sec of inactivity
    }
    // bottom of the page
    else {
      returnTopButton.classList.remove("is-visible");
    }

    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  },
  false
);

// Hittin' rock bottom
window.onscroll = () => {
  const returnTopButton = document.querySelector(".return-top");
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    returnTopButton.classList.add("is-visible");
  }
};

// Back to top link in the global footer
const backToTop = document.querySelector("a[href='#skip-to-content']");
if (backToTop) {
  backToTop.addEventListener("click", backToTopFunction);
}

/**
 * @param {Event} event
 */
function backToTopFunction(event) {
  event.preventDefault();
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
