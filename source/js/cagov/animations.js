/**
 *
 */

$(document).ready(function () {
    $("[class*='animate-']").each(initAnimations);
});


function initAnimations() {
  var $this = $(this);
    var waypoint = new Waypoint({
        element: $this.get(0),
        // start when it appears at the bottom
        offset: '95%',
        handler: function () {
            // get the class and animation name out of it
            var animation = $this.attr("class").match(/animate-(\w+)\b/i)[1];
            var toRemove = 'animate-' + animation;
            var toAdd = 'animated ' + animation;

            // update classes
            $this.removeClass('animate-' + animation);
            $this.addClass('animated ' + animation);

            // stop firing again
            this.disable();
        }
    });
}
