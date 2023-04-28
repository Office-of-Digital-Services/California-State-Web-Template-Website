//@ts-check

/* sticky header / hiding official header on scroll */
(() => {
  const doc = document.documentElement;

  let prevScroll = window.scrollY || doc.scrollTop;
  let curScroll;
  let direction = 0;
  let prevDirection = 0;
  const headerAlert = document.querySelector("header .alert");
  const header = document.querySelector(".utility-header");
  const mainheader = document.querySelector("header");

  const checkScroll = () => {
    /*
     ** Find the direction of scroll
     ** 0 - initial, 1 - up, 2 - down
     */

    curScroll = window.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      //scrolled up
      direction = 2;
    } else if (curScroll < prevScroll) {
      //scrolled down
      direction = 1;
    }

    if (direction !== prevDirection) {
      // Toggle Header
      if (direction === 2 && curScroll > 40) {
        const hiddenheight =
          header.clientHeight + (headerAlert ? headerAlert.clientHeight : 0);

        mainheader.style.top = `-${hiddenheight}px`;
        prevDirection = direction;
      } else if (direction === 1 && curScroll < 40) {
        // mainheader.classList.remove('scrolled');
        // header.classList.remove('is-hidden');
        // header.removeAttribute("style");
        //mainheader.style.removeProperty("top"); //
        mainheader.removeAttribute("style");
        prevDirection = direction;
      }
    }

    prevScroll = curScroll;
  };

  window.addEventListener("scroll", checkScroll);
})();

// retain scroll position
