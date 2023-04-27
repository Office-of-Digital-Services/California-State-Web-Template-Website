//@ts-check

const parallax = document.querySelector(".parallax");

if (parallax instanceof HTMLElement) {
  window.addEventListener("scroll", () => {
    const scrolledHeight = window.pageYOffset,
      limit = parallax.offsetTop + parallax.offsetHeight;

    if (scrolledHeight > parallax.offsetTop && scrolledHeight <= limit) {
      parallax.style.backgroundPositionY = `${
        (scrolledHeight - parallax.offsetTop) / 1.5
      }px`;
    } else {
      parallax.style.backgroundPositionY = "0";
    }
  });
}
