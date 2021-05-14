// Begin gatag.js

//	This javascript tags file downloads and external links in Google Analytics.
//	All outbound links and links to non-html files should now be automatically tracked.

// Original script: http://www.goodwebpractices.com/roi/track-downloads-in-google-analytics-automatically.html
// 5/16/11 Updated for asynchronous GA code.
// 7/14/14 Added Office 2010 file extensions. Changed "click" to "mousedown". Added support for 2 dashboards.

function addGAToDownloadLinks() {
    if (document.getElementsByTagName) {
        // Initialize external link handlers
        var hrefs = document.getElementsByTagName("a");
        for (var l = 0; l < hrefs.length; l++) {
            // try {} catch{} block added by erikvold VKI
            try {
                //protocol, host, hostname, port, pathname, search, hash
                if (hrefs[l].protocol === "mailto:") {
                    startListening(hrefs[l], "mousedown", trackMailto);
                } else if (hrefs[l].protocol === "tel:") {
                    startListening(hrefs[l], "mousedown", trackTelto);
                } else if (hrefs[l].hostname === location.host) {
                    var path = hrefs[l].pathname + hrefs[l].search;
                    var isDoc = path.match(/\.(?:doc|docx|eps|jpg|png|svg|xls|xlsx|ppt|pptx|pdf|zip|txt|vsd|vxd|js|css|rar|exe|wma|mov|avi|wmv|mp3)($|\&|\?)/);
                    if (isDoc) {
                        startListening(hrefs[l], "mousedown", trackExternalLinks);
                    }
                } else if (!hrefs[l].href.match(/^javascript:/)) {
                    startListening(hrefs[l], "mousedown", trackExternalLinks);
                }
            }
            catch (e) {
                continue;
            }
        }
    }
}

function startListening(obj, evnt, func) {
    if (obj.addEventListener) {
        obj.addEventListener(evnt, func, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evnt, func);
    }
}

function trackMailto(evnt) {
    var href = evnt.srcElement ? evnt.srcElement.href : this.href;
    var mailto = "/mailto/" + href.substring(7);
    _gaq.push(['_trackPageview', mailto]);
    _gaq.push(['b._trackPageview', mailto]);
}

function trackTelto(evnt) {
    var href = evnt.srcElement ? evnt.srcElement.href : this.href;
    var telto = "/telto/" + href.substring(4);
    _gaq.push(['_trackPageview', telto]);
    _gaq.push(['b._trackPageview', telto]);
}

function trackExternalLinks(evnt) {
    var e = evnt.srcElement ? evnt.srcElement : this;
    while (e.tagName !== "A") {
        e = e.parentNode;
    }
    var lnk = e.pathname.charAt(0) === "/" ? e.pathname : "/" + e.pathname;
    if (e.search && e.pathname.indexOf(e.search) === -1) lnk += e.search;
    if (e.hostname !== location.host) lnk = "/external/" + e.hostname + lnk;
    _gaq.push(['_trackPageview', lnk]);
    _gaq.push(['b._trackPageview', lnk]);
}

// End gatag.js