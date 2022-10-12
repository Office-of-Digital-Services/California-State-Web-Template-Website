/* EXTERNAL LINK ICON */
function linkAnnotator() {
 const ext =
  '<span class="external-link-icon" aria-hidden="true"></span>';

 // Check if link is external function
 function linkIsExternal(linkElement) {
  return window.location.host.indexOf(linkElement.host) > -1;
 }

 // Looping thru all links inside of the main content body, agency footer and statewide footer
 const externalLink = document.querySelectorAll(
  'main a, .agency-footer a, .site-footer a, footer a',
 );
 externalLink.forEach((element) => {
  const anchorLink = element.href.indexOf('#') === 0;
  const localHost = element.href.indexOf('localhost') > -1;
  const localEmail = element.href.indexOf('@') > -1;
  const linkElement = element;
  if (
   linkIsExternal(linkElement) === false &&
   !anchorLink &&
   !localEmail &&
   !localHost
  ) {
   linkElement.innerHTML += ext; // += concatenates to external links
  }
 });
}

linkAnnotator();