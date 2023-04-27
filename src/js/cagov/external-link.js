//@ts-check

/* EXTERNAL LINK ICON */
function linkAnnotator() {
  const ext = '<span class="external-link-icon" aria-hidden="true"></span>';

  // Check if link is external function
  /**
   * @param {HTMLAnchorElement} linkElement
   */
  function linkIsExternal(linkElement) {
    return window.location.host.indexOf(linkElement.host) > -1;
  }

  // Add any exceptions to not render here
  const cssExceptions = `:not(
 code *
)`;

  // Looping thru all links inside of the main content body, agency footer and statewide footer
  const externalLink = document.querySelectorAll(
    `main a${cssExceptions}, .agency-footer a${cssExceptions}, .site-footer a${cssExceptions}, footer a${cssExceptions}`
  );
  externalLink.forEach(element => {
    if (element instanceof HTMLAnchorElement) {
      const anchorLink = element.href.indexOf("#") === 0;
      const localHost = element.href.indexOf("localhost") > -1;
      const localEmail = element.href.indexOf("@") > -1;
      const linkElement = element;
      if (
        linkIsExternal(linkElement) === false &&
        !anchorLink &&
        !localEmail &&
        !localHost
      ) {
        linkElement.innerHTML += ext; // += concatenates to external links
      }
    }
  });
}

linkAnnotator();
