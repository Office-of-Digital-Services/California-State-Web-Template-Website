/* sticky header / highding official header on scroll */
(function () {

 var doc = document.documentElement;
 var w = window;

 var prevScroll = w.scrollY || doc.scrollTop;
 var curScroll;
 var direction = 0;
 var prevDirection = 0;
 var headerAlert = document.querySelector('header .alert');
 var header = document.querySelector('.utility-header');
 var mainheader = document.querySelector('header');

 var checkScroll = function () {

  /*
  ** Find the direction of scroll
  ** 0 - initial, 1 - up, 2 - down
  */


  curScroll = w.scrollY || doc.scrollTop;
  if (curScroll > prevScroll) {
   //scrolled up
   direction = 2;
  }
  else if (curScroll < prevScroll) {
   //scrolled down
   direction = 1;
  }

  if (direction !== prevDirection) {
   toggleHeader(direction, curScroll);
  }

  prevScroll = curScroll;
 };

 var toggleHeader = function (direction, curScroll) {
  if (direction === 2 && curScroll > 40) {

   var hiddenheight = "";
   if (headerAlert) {
    var hiddenheight = headerAlert.clientHeight + header.clientHeight;
    mainheader.style.top = "-" + hiddenheight + "px";
   }
   else {
    var hiddenheight = header.clientHeight;
    mainheader.style.top = "-" + hiddenheight + "px";
   }
   prevDirection = direction;
  }
  else if (direction === 1 && curScroll < 40) {
   // mainheader.classList.remove('scrolled');
   // header.classList.remove('is-hidden');
   // header.removeAttribute("style");
   mainheader.removeAttribute("style");
   prevDirection = direction;
  }
 };

 window.addEventListener('scroll', checkScroll);

})();


// retain scroll position
