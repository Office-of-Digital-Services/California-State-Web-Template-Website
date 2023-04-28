//@ts-check

/**
 * @typedef {Object} ScrollCounter_Properties
 * @property {boolean} counterAlreadyFired
 * @property {number} counterSpeed
 * @property {number} counterTarget
 * @property {number} counterCount
 * @property {number} counterStep
 * @property {()=>void} updateCounter
 * @typedef {HTMLElement & ScrollCounter_Properties} ScrollCounter
 */

document.addEventListener("DOMContentLoaded", () => {
  // You can change this class to specify which elements are going to behave as counters.
  /** @type {NodeListOf<ScrollCounter>} */
  const elements = document.querySelectorAll(".scroll-counter");

  elements.forEach(item => {
    // Add new attributes to the elements with the '.scroll-counter' HTML class
    item.counterAlreadyFired = false;
    item.counterSpeed = Number(item.getAttribute("data-counter-time")) / 45;
    item.counterTarget = +item.innerText;
    item.counterCount = 0;
    item.counterStep = item.counterTarget / item.counterSpeed;

    item.updateCounter = () => {
      item.counterCount += item.counterStep;
      item.innerText = Math.ceil(item.counterCount).toString();

      if (item.counterCount < item.counterTarget) {
        window.setTimeout(item.updateCounter, item.counterSpeed);
      } else {
        item.innerText = item.counterTarget.toString();
      }
    };
  });

  // Function to determine if an element is visible in the web page
  const isElementVisible = (/** @type {Element} */ el) => {
    const scroll = window.scrollY || window.pageYOffset;
    const boundsTop = el.getBoundingClientRect().top + scroll;
    const viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight
    };
    const bounds = {
      top: boundsTop,
      bottom: boundsTop + el.clientHeight
    };
    return (
      (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
      (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
    );
  };

  // Funciton that will get fired uppon scrolling
  const handleScroll = () => {
    elements.forEach(item => {
      if (item.counterAlreadyFired) return;
      if (!isElementVisible(item)) return;
      item.updateCounter();
      item.counterAlreadyFired = true;
    });
  };

  // Fire the function on load and scroll
  window.addEventListener("load", handleScroll);
  window.addEventListener("scroll", handleScroll);
});
