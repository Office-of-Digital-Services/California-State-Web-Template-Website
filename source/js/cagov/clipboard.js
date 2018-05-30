$(document).ready(function () {

    // Init

    var thumbnailEnpdoint = window.__cagovThumbnailService || "http://caportal.local/api/sitecore/Clipboard/GetThumbnail";

    var siteURL = "http://" + top.location.host.toString();
    var prefixStr = "ca-clip://"
    var prefixRegex = new RegExp('^' + prefixStr, 'g');
    // The currently shown tooltip
    var current;
    // we need to hold onto our timeoutID for potentially hiding the tooltip
    var hideTimeout;

    // global state variables
    var clipCount = getClipCount();
    var clipList = getClipList();
    var clipHoverMode = getClipHoverMode();

    var $clipItemTemplate = $(".clipboard-settings [data-template]");
    // update based upon our clip count
    updateUI();


    var parentMatch = ".wrapper, .main-primary";
    var matchLinks = "a:not([href^='#']):not([href^='javascript:;'])";

    $(parentMatch).on("mouseenter.cagov.clipboard", matchLinks, showTooltip);
    $(parentMatch).on("mouseleave.cagov.clipboard", matchLinks, hideTooltip);

    var templateString = '<div class="tooltip clipboard-tooltip " role="tooltip">' +
        '<div class="tooltip-arrow">' + '</div><div class="tooltip-inner "></div></div>';

    // create our tooltips for all our matching links
    var tooltipOptions = {

        trigger: "manual",
        placement: "left",
        html: true,
        title: clipUIELement,
        template: templateString
    };

    // Hold up our tooltip if we are over it
    $(parentMatch).on('mouseenter.cagov.clipboard', '.clipboard-tooltip', function () {
        if (current) {
            window.clearTimeout(hideTimeout);
        }
    });

    // hide our tooltip if we leave it
    $(parentMatch).on('mouseleave.cagov.clipboard', '.clipboard-tooltip', hideTooltip);

    // Add our link on a click of our tooltip
    $(parentMatch).on('click.cagov.clipboard', '.clipboard-tooltip', addToClipboard);


    $(".clipboard-activeonhover").on('click.cagov.clipboard', function () {
        var mode = toggleClipHoverMode();
        if (mode) {
            $(parentMatch).on("mouseenter.cagov.clipboard", matchLinks, showTooltip);
        } else {
            $(parentMatch).off("mouseenter.cagov.clipboard");
        }
        this.trigger("blur");
        updateUI();
    });


    $(".clipboard-addpage").on('click.cagov.clipboard', function () {
        var url = normalizeURL(window.location.href);
        if (checkClip(url)) {
            // TODO: Let user know they are trying to add a duplicate url
            console.log("Duplicate")
            return;
        }

        setClip(createClip(url));
        console.log("Added");
        updateUI();
        animateCount();
    });

    $(".clipboard__handle").on('click.cagov.clipboard', function (e) {
        e.preventDefault();
        console.log("Click Handle")
        $(".clipboard-settings").toggleClass("in")
    });

    $('.clipboard__help').on('click.cagov.clipboard', function (e) {
         e.preventDefault();
        $(".clipboard__help-text").toggle();
    });
    
    $('.clipboard-removeall').on('click.cagov.clipboard', function(e){
         e.preventDefault();
        removeAllClips();
    });


    /** Passed into the tooltip library and given for "this" the current
     * element the tooltip is attached to.
     */
    function clipUIELement() {
        var url = normalizeURL($(this).attr("href"));
        var wasSaved = checkClip(url);
        var saved = "<div class='clipboard-details-msg'>Saved! </div>";
        var icon = "<span class='" + (wasSaved ? "saved" : "") + " ca-gov-icon-pushpin'></span>";

        var stopMsg = "<div class='clipboard-details-msg'> <a role='button'  href='javascript:;' class=''>Don't show me this. <i>(disables clips)</i></a></div>";

        return (wasSaved == true) ? saved + icon : icon;  //+ " Click to add to saved links" + stopMsg
    }


    /**
     * * Brings up the ui element for adding links to the clipboard
     * */
    function showTooltip(e) {
        // remove any old tooltips or timers
        if (current && !current.is($(this))) {

            current.tooltip("hide");
        }
        window.clearTimeout(hideTimeout);
        // set our new tooltip
        current = $(this).tooltip(tooltipOptions);
        current.tooltip('show');
        console.log("In");
    }

    /**
 * Hides the ui element for adding links to the clipboard
 */
    function hideTooltip() {
        hideTimeout = setTimeout(function () {
            if (current) {
                current.tooltip('hide');
                console.log("Out");
            }
        }, 2000)

    }

    /**
     * Stops showing the ui element for adding links
     */
    function disableShowClip() {
        $(parentMatch).on("mouseenter.cagov.clipboard", matchLinks, showTooltip);

    }

    function getHrefFromTooltip(el) {
        if (!el) {
            return "";
        }
        var toolTipID = el.attr("id");
        return normalizeURL($("[aria-describedby=" + toolTipID + "]").attr("href"));
    }



    function addToClipboard() {
        var url = getHrefFromTooltip($(this));

        if (checkClip(url)) {
            // TODO: Let user know they are trying to add a duplicate url
            console.log("Duplicate")
            return;
        }
        setClip(createClip(url));

        console.log("Added");
        updateUI();
        animateCount();
        current.tooltip('show');
    }


    function removeAllClips() {
        clipList.forEach(function (clip) {
            removeClip(clip);
        })

        updateUI();
        animateCount();
        current.tooltip('show');
    }

    /**
     * Utilizes implicit variables
     */
    function updateUI() {
        clipCount = getClipCount();
        clipList = getClipList();
        clipHoverMode = getClipHoverMode();

        console.log(clipHoverMode);
        $(".clipboard__clip-count").text(clipCount == 0 ? "" : clipCount);

        $(".clipboard-activeonhover").toggleClass("active", clipHoverMode);
        $(".clipboard-list").children().remove();
        clipList.forEach(function (clip) {
            var newClip = $clipItemTemplate.clone();
            console.log(newClip);
            newClip.find('.title a').text(clip.title).attr("href", clip.url);

            if (clip.imgDataURI) {
                var img = "<img class='clipboard-temp-icon' src='" + clip.imgDataURI + "' />";
                newClip.find('.clipboard-temp-icon').replaceWith(img);
            }
            newClip.find(".remove span").on('click', function () {
                newClip.fadeOut(300, function () {
                    removeClip(clip);
                    updateUI();
                });
            });
            $(".clipboard-list").append(newClip.show());
        });

    }

    function animateCount() {
        var el = $(".clipboard__clip-count");

        var animation = "bouncesmall"
        var classToAdd = animation + ' animated hovered';

        el.addClass(classToAdd).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            el.removeClass(classToAdd);
        });
    }



    function animateTooltip(el) {
        el.find('.tooltip-inner').append($("<div class='clipboard-details-msg'>Saved! </div>").hide().fadeIn(500))
    }

    function normalizeURL(url) {
        //http://stackoverflow.com/questions/8206269/
        return url = url.replace(/.*?:\/\//g, "");
    }



    /**
     * Functions for manipulating localstorage objectss
     */
    function createClip(url) {

        getThumbnail(url);

        return {
            url: url,
            title: url || document.title
        }
    }

    function getThumbnail(url) {
        var req = $.ajax({
            url: thumbnailEnpdoint,
            dataType: "json",
            data: {
                url: url
            },
            success: function (json) {
                console.log(json);
                var thumbData = json.imgDataURI;
                var clip = getClip(url);
                clip.imgDataURI = thumbData;

                setClip(clip);
                updateUI();
            }
        });


    }

    function setClip(clip) {
        var key = prefixStr + clip.url;
        // newly created
        window.localStorage.setItem(key, JSON.stringify(clip));
        return true;
    }

    function checkClip(url) {
        var clip = getClip(url);
        return clip !== null ? true : false;
    }


    function removeClip(clip) {
        console.log(clip);
        if (!checkClip(clip.url)) {
            return false;
        }

        var key = prefixStr + clip.url;
        window.localStorage.removeItem(key);
        return true;
    }

    /**
     * Given a string url gets the full clip item object if it exists
     */
    function getClip(url) {
        // dont want undefined being converted to string
        if (!url) {
            url = "";
        }
        var key = prefixStr + url;

        return JSON.parse(window.localStorage.getItem(key));
    }


    /**
     * Returns our set clip items by enumerating through all keys and only returning those with
     * our prefix set.
     */
    function getClipList() {
        var out = [];

        for (key in localStorage) {
            if (key.match(prefixStr)) {
                out.push(JSON.parse(window.localStorage.getItem(key)));
            }
        }
        return out;
    }




    /**
     * Returns the total count of of clips.
     * Currently just reloops through on each check
     * TODO: make this a simple var lookup
     */
    function getClipCount() {
        var count = 0;
        for (key in localStorage) {
            if (key.match(prefixStr)) {
                count++;
            }
        }
        return count;
    }

    function getClipHoverMode() {
        var key = "cagov-hovermode";
        var mode = JSON.parse(window.localStorage.getItem(key));
        // default is to be true
        return (mode == null) ? true : mode;
    }

    function setClipHoverMode(bool) {
        var key = "cagov-hovermode";
        localStorage.setItem(key, bool);
        return bool;
    }

    function toggleClipHoverMode() {
        return setClipHoverMode(!getClipHoverMode());
    }

});
