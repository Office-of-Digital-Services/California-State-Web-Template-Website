/* -----------------------------------------
   SETTINGS OPTIONS
   /source/js/cagov/settings.js
----------------------------------------- */


//
// HIGH CONTRAST MODE
// --------------------------------------------------
window.addEventListener('load', function () {
   var enableHighContrastButton = document.querySelector('.enableHighContrastMode');
   var disableHighContrastButton = document.querySelector('.disableHighContrastMode');
   var theHTML = document.querySelector('html');

   var isHighContrast = localStorage.getItem('high-contrast');
   var isDyslexic = localStorage.getItem('dyslexic');

   function onContrast() {
      enableHighContrastButton.classList.add('active');
      disableHighContrastButton.classList.remove('active');
      theHTML.classList.add('high-contrast');
      localStorage.setItem('high-contrast', 'true');
   }

   function OffContrast() {
      disableHighContrastButton.classList.add('active');
      enableHighContrastButton.classList.remove('active');
      theHTML.classList.remove('high-contrast');
      // disable
      localStorage.removeItem('high-contrast');
   }


   if (isHighContrast) {
      onContrast();
   }

   // Enable High Contrast
   enableHighContrastButton.addEventListener('click', onContrast, false);

   // Disable High Contrast
   disableHighContrastButton.addEventListener('click', OffContrast, false);



   //
   // INCREASE FONT SIZE
   // --------------------------------------------------  TODO: Evaluate the

   //accessibility duplication vs using inbuilt browser
   //controls

   var incFontSize = document.querySelector('.increaseTextSize');
   var decFontSize = document.querySelector('.decreaseTextSize');
   var resetFontSize = document.querySelector('.resetTextSize');
   var dyslexicFontBtn = document.querySelector('.dyslexicFont');

   // in rems's
   var MAXFONTSIZE = 1.5;
   var MINFONTSIZE = 1;
   var STEPVALUE = .1;

   // Read in previous settings and convert to number
   var fontSize = +localStorage.getItem('font-size');
   if (fontSize) {
      document.querySelector('html').style.fontSize = fontSize + 'rem';
   } else {
      fontSize = 1;
      document.querySelector('html').style.fontSize = fontSize + 'rem';
   }

   // init button styles for fonts
   updateFontBtns(fontSize);

   // utility functions
   function updateFont(f) {
      var updatedSize = Math.min(MAXFONTSIZE, Math.max(f, MINFONTSIZE));
      localStorage.setItem('font-size', updatedSize);
      document.querySelector('html').style.fontSize = updatedSize + "rem";
      updateFontBtns(updatedSize);
      return updatedSize;
   }

   function updateFontBtns(f) {
      if (f >= MAXFONTSIZE) {
         // incFontSize.addClass('disabled')
         // decFontSize.removeClass('disabled');
      } else if (f <= MINFONTSIZE) {
         // decFontSize.addClass('disabled')
         // incFontSize.removeClass('disabled');
      } else {
         // incFontSize.removeClass('disabled');
         // decFontSize.removeClass('disabled')
      }
   }

   incFontSize.addEventListener('click', function () {
      fontSize += STEPVALUE;
      fontSize = updateFont(fontSize);
   }, false);

   decFontSize.addEventListener('click', function () {
      fontSize -= STEPVALUE;
      fontSize = updateFont(fontSize);
   }, false);

   resetFontSize.addEventListener('click', function () {
      document.querySelector('html').removeAttribute("style");
      document.querySelector('body, h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .first-level-link, .slide-text, .slide-text .title, .stat-counter, .explore-invite .explore-title').removeAttribute("style");
      localStorage.removeItem('dyslexic');
      localStorage.removeItem('font-size');
   }, false);


   if (isDyslexic) {
      dyslexicFont();
   }

   dyslexicFontBtn.addEventListener('click', function () {
      dyslexicFont();
   }, false);

   function dyslexicFont() {
      document.querySelector('body, h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .first-level-link, .slide-text, .slide-text .title, .stat-counter, .explore-invite .explore-title').setAttribute("style", "font-family: 'OpenDyslexicAlta Regular', sans serif !important");
      localStorage.setItem('dyslexic', 'true');
   }
});
