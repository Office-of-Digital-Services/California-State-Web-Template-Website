/* -----------------------------------------
   SOCIAL SHARER
   Rewritten using jquery for v5 template
   /source/js/cagov/socialsharer.js
----------------------------------------- */

$(document).ready(function(){
    var docTitle = sanitize(document.title);
    var docURL = window.location.href;
    docURL = encodeURIComponent(sanitize(docURL));

    // TODO: flickr, linkedin, instagram, pinterest, vimeo, youtube

    $(".ca-gov-icon-share-facebook").on('click', function(e) {
        PopupCentered('https://www.facebook.com/sharer/sharer.php?u=' + docURL + '&display=popup', 'socialsharer', '658', '450');
    });

    $(".ca-gov-icon-share-twitter").on('click', function(e) {
        PopupCentered('https://twitter.com/intent/tweet?text=' + docTitle + '&url=' + docURL, 'socialsharer', '568', '531');
    });

    $(".ca-gov-icon-share-googleplus").on('click', function(e) {
        PopupCentered('https://plus.google.com/share?url=' + docURL, 'socialsharer', '550', '552');
    });

    $(".ca-gov-icon-share-email").attr('href',  "mailto:?subject=" + docTitle + "&body=%0a" + docURL + "%0a%0a");

function sanitize(sText) {
  // Remove html tags from a string
  var re = /<\S[^>]*>/g;
  sText = sText.replace(re, " ");
  return sText;
}


// Display a popup window centered over the parent window. Works in all browsers
// except Opera with multiple displays. Opera displays the popup on the primary
// display only.
function PopupCentered(url, popupName, popupWidth, popupHeight) {
  // screenX/Y for IE9+ FF Op Chrome, screenLeft/Top for IE7 IE8 Chrome, left/top for old FF
  var parentLeft = window.screenX ? window.screenX : window.screenLeft ? window.screenLeft : screen.left ? screen.left : 0;
  var parentTop = window.screenY ? window.screenY : window.screenTop ? window.screenTop : screen.top ? screen.top : 0;

  var parentWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var parentHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var popupLeft = parentWidth / 2 - popupWidth / 2 + parentLeft;
  var popupTop = parentHeight / 2 - popupHeight / 2 + parentTop;

  window.open(url, popupName, 'scrollbars=yes, width=' + popupWidth + ', height=' + popupHeight + ', left=' + popupLeft + ', top=' + popupTop);
}
});
