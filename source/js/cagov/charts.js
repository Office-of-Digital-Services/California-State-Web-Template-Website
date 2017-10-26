$(function () {
    // the half circle dashboard things built with the Donut functions
    $('.stats-highlight').each(initStats);
    $('.plotly-chart').each(initPlotly);
});

// TODO: fallback image for non-js,
// Description and details for screen readers
function initPlotly(d3, Plotly) {
    var container = $(this);

    if ($('html').hasClass('ie8') || $('html').hasClass('ie7')) {
        //  TODO: Unsupport graphs fall back to image
        if (!container.has('img').length) {
            container.html('<span class="plotly-chart--loading">Chart image not found</span>')
        }
        return;
    }

    // no supplied image fallback show loading indicator
    if (!container.has('img').length) {
        container.html('<span class="plotly-chart--loading">Loading</span>')
    }

    var libs = [
        'd3', 'Plotly',
        // for ie9 support
        (('Float32Array' in window)
            ? ''
            : 'typedarray')
    ];

    requirejs(libs, function (d3, Plotly) {
        var WIDTH_IN_PERCENT_OF_PARENT = 100,
            HEIGHT_IN_PERCENT_OF_PARENT = 100;
        container.empty();

        function getHeight() {
            var tempHeight = container.attr('data-fixed-height')
                ? container.attr('data-fixed-height') + "px"
                : HEIGHT_IN_PERCENT_OF_PARENT + "%";

            return tempHeight;
        }
        var gd3 = d3.select(container.get(0)).style({
            width: WIDTH_IN_PERCENT_OF_PARENT + '%',
            'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

            height: getHeight(),
            'margin-top': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%'
        });

        var gd = gd3.node();
        var title = container.attr("data-title");
        var xLabel = container.attr('data-x-label');
        var yLabel = container.attr('data-y-label');

        getConfig(d3, container, function (config) {
            Plotly.plot(gd, config, {
                title: title,
                font: {
                    family: "Source Sans Pro, sans-serif",
                    size: 20,
                    color: '#333'
                },
                xaxis: {
                    title: xLabel,
                    titlefont: {
                        family: "Source Sans Pro, sans-serif",
                        size: 18,
                        color: "#333"
                    }
                },
                yaxis: {
                    title: yLabel,
                    titlefont: {
                        family: "Source Sans Pro, sans-serif",
                        size: 18,
                        color: "#333"
                    }
                }
                // not setting the background color atm, keep default
                // paper_bgcolor: container.css("background-color")
            });

            // This does not work atm,
            // following this issue for updates
            // https://github.com/plotly/plotly.js/issues/102

            // container.on('mousemove', function (data) {
            //
            //     // make things bigger
            //     var hovertext = container.find(".hovertext");
            //     var trans = hovertext.attr('transform')
            //     // hovertext.attr('transform', trans + ' scale(1.3)');
            //
            //     // give more padding around text by setting stroke to the
            //     // same color as the fill
            //     var path = hovertext.find('path');
            //     var color = path.css('fill');
            //     console.log(color);
            //     path.css({'stroke-width': 7, 'stroke': color})
            // });
        })

        $(window).resize(function () {

            var gd3 = d3.select(container.get(0)).style({height: getHeight()});
            Plotly.Plots.resize(gd);
        });

    });
}

var defaultBar = [
    {
        "type": "bar",
        "x": [],
        "y": [],
        "marker": {
            "color": "#046B99",
            "line": {
                "width": 0.5
            }
        }
    }
];

var defaultLine = [
    {
        "x": [],
        "y": [],
        "mode": "lines",
        "name": "Solid",
        "line": {
            "color": "#046B99",
            "dash": "solid",
            "width": 4
        }
    }
];

var defaultPie = [
    {
        "values": [],
        "labels": [],
        "hoverinfo": "label+percent",
        "type": "pie",
        "marker": {
            "colors": [
                "#E1F2F7",
                "#9FDBF1",
                "#02BFE7",
                "#35BBAA",
                "#72CE6F",
                "#815AB4",
                "#D34A37",
                "#F27E31",
                "#FFCA4A"
            ]
        }
    }
];

function getConfigSkeleton(type) {
    switch (type) {
        case "bar":
            return defaultBar;
        case "pie":
            return defaultPie;
        case "line":
            return defaultLine;
        default:
            return [];
    }
}

function getConfig(d3, container, func) {
    var sourceUrl = container.attr('data-datasource-url');
    var configUrl = container.attr('data-config-url');
    var chartType = container.attr('data-type');
    var color = container.attr('data-color');

    if (configUrl) {
        $.getJSON(configUrl, func);
        return;
    }

    var config = getConfigSkeleton(chartType);

    var xValues = container.attr('data-x-values');
    var yValues = container.attr('data-y-values');

    if (xValues) {
        xValues = xValues.split('|').map(function (d) {
            if(isNaN(parseFloat(d))) {
              return d;
            }
            return + d
        });
    } else {
        xValues = [];
    }

    if (yValues) {
        yValues = yValues.split('|');
    } else {
        yValues = [];
    }
    switch (chartType) {
        case "line":
        case "bar":
            config[0].x = xValues
            config[0].y = yValues.map(function (d) {
                return + d
            });
            break;

        case "pie":
            config[0].values = xValues;
            config[0].labels = yValues;
            break;
        default:

    }

    if (!color) {
        color = '#046B99';
    }

    // specifiying the color
    switch (chartType) {
        case "line":
            config[0].line.color = d3.rgb(color).toString();
            break;
        case "bar":
            config[0].marker.color = d3.rgb(color).toString();
            break;

        case "pie":
            var colorA = d3.hsl(color);
            var colorB = d3.hsl((colorA.h - (4 * xValues.length)) % 360, colorA.s, colorA.l)

            var colorScale = d3.scale.linear().domain(xValues).interpolate(d3.interpolateHsl).range([colorA.toString(), colorB.toString()]);
            var colors = xValues.map(function (d) {
                return colorScale(d);
            });
            config[0].marker.colors = colors;

            break;
        default:

    }

    func(config);

}

function initStats() {
    var container = $(this);
    var libs = ['d3'];
    if ($('html').hasClass('ie8')|| $('html').hasClass('ie7') ) {
        return;
        //  TODO: Unsupport graphs fall back to something else
    }
    requirejs(libs, function (d3) {

        var shouldFlip = container.attr('data-direction') == 'right'
            ? true
            : false;

        var data = parseFloat(container.attr('data-percentfill'));
        var chart = container.find('.half-gauge-chart');
        var color = container.attr('data-colorfill');
        var showHalfTick = container.find('.small-goal-text').length != 0;

        var config = {
            bindTo: chart.get(0),
            background: true,
            maxValue: 100,
            startAngle: -90,
            endAngle: 90,
            thickness: 5,
            color: color,
            showHalfTick: showHalfTick,
            size: {
                width: chart.get(0).clientWidth,
                height: chart.get(0).clientWidth
            },
            flipStart: shouldFlip
        };
        var Donut = initHalfDonut(d3);

        var donutChart = new Donut(config);

        donutChart.load({data: 0});

        function sizeText() {
            var width = chart.get(0).clientWidth;
            var height = chart.get(0).clientHeight;
            var detail = container.find('.small-goal-text');
            var lineHeight = parseFloat(container.find('.small-goal-text').css('line-height'));

            container.find('.info').css({
                top: -width / 4
            });
            detail.css({
                'font-size': width / 18
            });
            var detailHeight = detail.height();

            detail.css({
                top: (width < 400)
                    ? detailHeight * 2 + 20
                    : (detailHeight * 1.5)
            })
            container.find('.big-number').css({
                'font-size': width / 6
            });
            container.find('.percent-detail').css({
                'font-size': width / 10
            });
        }

        sizeText();

        $(window).resize(function () {

            window.setTimeout(function () {
                config.size = {
                    width: chart.width(),
                    height: chart.width()
                }
                config.data = data;
                donutChart = new Donut(config);
                donutChart.load({data: data});
                sizeText();
            }, 10)

        });

        var waypoint = new Waypoint({
            element: chart.get(0),
            // start when it appears at the bottom
            offset: '100%',
            handler: function () {
                donutChart.load({data: data})
            }
        });
    })

}

/**
 * Custom Half Donut plugin
 * TODO: code clean up, and refactor
 */

function initHalfDonut(d3) {

    var defaults = {
        className: 'donut',
        size: {
            width: 200,
            height: 200
        },
        margin: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        startAngle: 0,
        endAngle: 360,
        thickness: null,
        offset: 0,
        sort: null,
        maxValue: null,
        background: false,
        flipStart: false,
        color: 'rgb(49, 130, 189)',
        accessor: function (d, i) {
            return d;
        }
    };

    var Donut = function (config) {
        // need an extend fn
        this.config = extend({}, defaults, config);

        // setup radius
        this.config.radius = getRadius(this);

        // setup accessor
        this.accessor = this.config.accessor;

        // convenience method to map data to start/end angles
        this.pie = d3.layout.pie().sort(this.config.sort).startAngle(degToRad(this.config.startAngle)).endAngle(degToRad(this.config.endAngle))

        if (this.accessor && typeof this.accessor === 'function') {
            this.pie.value(this.accessor);
        }

        var thickness = getThickness(this);

        // setup the arc
        // divide offset by 4 because the middle of the stroke aligns to the edge
        // so it's 1/2 on the outside, 1/2 inside
        this.arc = d3.svg.arc().innerRadius(this.config.radius - thickness - (this.config.offset / 4)).outerRadius(this.config.radius + (this.config.offset / 4));

        bindSvgToDom(this);
    };

    Donut.prototype.load = function (newOpts) {
        // store data on object
        var data = (newOpts && newOpts.data != null)
            ? newOpts.data
            : this.data.map(this.accessor);

        // convert to array if not already
        data = Array.isArray(data)
            ? data
            : [data];

        if (this.config.maxValue) {
            this.data = this.pieMaxValue(data);
        } else {
            this.data = this.pie(data);
        }

        // drawPaths
        drawPaths(this);
    };

    Donut.prototype.pieMaxValue = function (data) {
        var accessor = this.accessor,
            self = this;

        // Compute the numeric values for each data element.
        var values = data.map(function (d, i) {
            return + accessor.call(self, d, i);
        });

        var sum = d3.sum(values),
            max = d3.max([this.config.maxValue, sum]),
            diff = max - sum;

        // Compute the start angle.
        var a = +(degToRad(this.config.startAngle));

        // Compute the angular scale factor: from value to radians.
        // include the diff because it will help create angles with a maxValue in mind
        var k = (degToRad(this.config.endAngle) - a) / (sum + diff);

        var index = d3.range(data.length);

        // Compute the arcs!
        // They are stored in the original data's order.
        var arcs = [];
        index.forEach(function (i) {
            var d;
            arcs[i] = {
                data: data[i],
                value: d = values[i],
                startAngle: a,
                endAngle: a += d * k
            };
        });
        return arcs;
    };

    function getThickness(donut) {
        return donut.config.thickness || donut.config.radius;
    }

    /*
     * Setup the svg in the DOM and cache a ref to it
     */
    function bindSvgToDom(donut) {
        var width = getWidth(donut),
            height = getHeight(donut);
        var transString = 'translate(' + width / 2 + ',' + height / 2 + ')' + ((donut.config.flipStart == true)
            ? ' scale(-1,1)'
            : '');

        var tempSVG = d3.select(donut.config.bindTo).select('svg');

        if (tempSVG.empty()) {
            donut.svg = d3.select(donut.config.bindTo).append('svg').attr('class', donut.config.classNames).attr('width', width).attr('height', height / 2).append('g').attr('transform', transString);
        } else {
            donut.svg = d3.select(donut.config.bindTo).select('svg').attr('class', donut.config.classNames).attr('width', width).attr('height', height / 2).select('g').attr('transform', transString);
            donut.svg.selectAll('*').remove();
        }

        if (donut.config.background) {
            donut.svg.append('path').attr('class', 'donut-background').transition().duration(0).attrTween('d', function (d, i) {
                var fullArc = {
                    value: 0,
                    startAngle: degToRad(donut.config.startAngle),
                    endAngle: degToRad(donut.config.endAngle)
                };
                return arcTween.call(this, fullArc, i, donut);
            });
        }

        if (donut.config.showHalfTick) {
            donut.svg.append('line').attr('class', 'donut-halfmark').attr('stroke', 'gray').attr('stroke-width', 1).attr({
                'x1': 0,
                'x2': 0,
                'y1': -height / 2 + 10,
                'y2': -height / 2 + 35
            });

        }
    }

    function drawPaths(donut) {
        var paths = donut.svg.selectAll('path.donut-section').data(donut.data);

        // enter new data
        paths.enter().append('path').attr('class', function (d, i) {
            return 'donut-section value-' + i;
        }).attr('fill', donut.config.color).attr('stroke', '#fff').attr('stroke-width', donut.config.offset / 2);

        // transition existing paths
        donut.svg.selectAll('path.donut-section').transition().duration(2000).attrTween('d', function (d, i) {
            return arcTween.call(this, d, i, donut);
        });

        // exit old data
        paths.exit().transition().duration(100).attrTween('d', function (d, i) {
            return removeArcTween.call(this, d, i, donut);
        }).remove();

    }

    // Store the currently-displayed angles in this._current.
    // Then, interpolate from this._current to the new angles.
    function arcTween(a, i, donut) {
        var prevSiblingArc,
            startAngle,
            newArc,
            interpolate;

        if (!this._current) {
            prevSiblingArc = donut.svg.selectAll('path')[0][i - 1]; // donut.data[i - 1];

            // start at the end of the previous one or start of entire donut
            startAngle = (prevSiblingArc && prevSiblingArc._current)
                ? prevSiblingArc._current.endAngle
                : degToRad(donut.config.startAngle);

            newArc = {
                startAngle: startAngle,
                endAngle: startAngle,
                value: 0
            };
        }

        interpolate = d3.interpolate(this._current || newArc, a);

        // cache a copy of data to each path
        this._current = interpolate(0);
        return function (t) {
            return donut.arc(interpolate(t));
        };
    }

    function removeArcTween(a, i, donut) {
        var emptyArc = {
                startAngle: degToRad(donut.config.endAngle),
                endAngle: degToRad(donut.config.endAngle),
                value: 0
            },
            i = d3.interpolate(a, emptyArc);
        return function (t) {
            return donut.arc(i(t));
        };
    }

    function getRadius(donut) {
        var width = getWidth(donut) - donut.config.margin.left - donut.config.margin.right,
            height = getHeight(donut) - donut.config.margin.top - donut.config.margin.bottom;

        return Math.min(width, height) / 2;
    }

    function getWidth(donut) {
        return donut.config.size && donut.config.size.width;
    }

    function getHeight(donut) {
        return donut.config.size && donut.config.size.height;
    }

    function degToRad(degree) {
        return degree * (Math.PI / 180);
    }

    function radToDeg(radian) {
        return radian * (180 / Math.PI);
    }

    /*
     * Simple extend fn like jQuery
     *
     * Usage: extend({ name: 'Default' }, { name: 'Matt' });
     * Result: { name: 'Matt' }
     */
    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            for (var prop in arguments[i]) {
                if (arguments[i].hasOwnProperty(prop)) {
                    arguments[0][prop] = arguments[i][prop];
                }
            }
        }
        return arguments[0];
    }

    return Donut;

}
