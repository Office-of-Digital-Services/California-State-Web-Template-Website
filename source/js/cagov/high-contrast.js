/* -----------------------------------------
   HIGH CONTRAST MODES
   /source/js/cagov/high-contrast.js
----------------------------------------- */

// TODO: Settings stored in cookies

$(document).ready(function () {

    //
    // HIGH CONTRAST MODE
    // --------------------------------------------------

    var enableHighContrastButton = $('.enableHighContrastMode');
    var disableHighContrastButton = $('.disableHighContrastMode');
    var theHTML = $('html');

    var isHighContrast = localStorage.getItem('high-contrast');

    function onContrast() {
        enableHighContrastButton.addClass('active');
        disableHighContrastButton.removeClass('active');
        theHTML.addClass('high-contrast');
        localStorage.setItem('high-contrast', 'true');
    }

    function OffContrast() {
        disableHighContrastButton.addClass('active');
        enableHighContrastButton.removeClass('active');
        theHTML.removeClass('high-contrast');
        // disable
        localStorage.removeItem('high-contrast');
    }


    if (isHighContrast) {
        onContrast();
    }

    // Enable High Contrast
    enableHighContrastButton.on('click', onContrast);

    // Disable High Contrast
    disableHighContrastButton.on('click', OffContrast);

    //
    // TEXT ONLY MODE
    // --------------------------------------------------

    var enableTextOnlyButton = $('.enableTextOnlyMode');
    var disableTextOnlyButton = $('.disableTextOnlyMode');

    // Enable Text Only
    enableTextOnlyButton.on("click", function () {
        enableTextOnlyButton.addClass('active');
        disableTextOnlyButton.removeClass('active');
        $('link[rel~="stylesheet"]').prop('disabled', true);
    });

    // Disable Text Only
    disableTextOnlyButton.on("click", function () {
        disableTextOnlyButton.addClass('active');
        enableTextOnlyButton.removeClass('active');
        $('link[rel~="stylesheet"]').prop('disabled', false);
    });

    //
    // INCREASE FONT SIZE
    // --------------------------------------------------  TODO: Evaluate the

    //accessibility duplication vs using inbuilt browser
    //controls

    var incFontSize = $('.increaseTextSize');
    var decFontSize = $('.decreaseTextSize');
    var resetFontSize = $('.resetTextSize');

    // in rems's
    var MAXFONTSIZE = 1.5;
    var MINFONTSIZE = 1;
    var STEPVALUE = .1;

    // Read in previous settings and convert to number
    var fontSize = +localStorage.getItem('font-size');
    if (fontSize) {
        $('html').css("font-size", fontSize + 'rem')
    } else {
        fontSize = 1;
        $('html').css("font-size", fontSize + 'rem')
    }

    // init button styles for fonts
    updateFontBtns(fontSize);

    // utility functions
    function updateFont(f) {
        var updatedSize = Math.min(MAXFONTSIZE, Math.max(f, MINFONTSIZE))
        localStorage.setItem('font-size', updatedSize);
        $('html').css("font-size", updatedSize + "rem");
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

    incFontSize.on('click', function () {
        fontSize += STEPVALUE
        fontSize = updateFont(fontSize);
    });

    decFontSize.on('click', function () {
        fontSize -= STEPVALUE;
        fontSize = updateFont(fontSize);
    });

    resetFontSize.on('click', function () {
        fontSize = updateFont(1)
    })
});
