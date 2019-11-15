$(document).ready(function () {
    $('.number-counter').each(initCountUp);
});

function initCountUp() {
    // our main component
    var counter = $(this);

    // get our values the user has configured
    var endCount = counter.text().trim();

    // prepare the dom
    counter.text('0');
    counter.css({'visibility': 'visible'});



    // countUp lib options
    var options = {
        "useEasing": true,
        "useGrouping": false,
        "separator": "",
        "decimal": ".",
        "prefix": ""
    };


    // handle if user has set decimal precision
    var decimals = 0;
    if (endCount.indexOf('.') !== -1) {
        decimals = endCount.split('.')[1].length;
    }

    // handle if user has set a comma
    if (endCount.indexOf(',') !== -1) {
        options.useGrouping = true;
        options.separator = ',';
        endCount = parseFloat(endCount.replace(/,/g, ''));
    }

    // target, startVal, endVal, decimals, duration, options
    var demo = new CountUp(counter.get(0), 0, endCount, decimals, 3.5, options);

    var waypoint = new Waypoint({
        element: counter.get(0),
        // start when it appears at the bottom
        offset: '100%',
        handler: function () {
            demo.start();
        }
    });
}


// polyfill for ie8
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
