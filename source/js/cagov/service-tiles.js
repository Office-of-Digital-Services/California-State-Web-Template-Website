$(document).ready(function () {
    // Create the needed js event listeners, set up classes, etc
    $('.service-group').each(initServiceGroup);
});

function initServiceGroup() {

    // Define variables
    var $service = $(this);
    var $items = $service.find('.service-tile');


    $service.find('.service-tile-empty').on('click',function(e){
      e.stopPropagation();
      var url =  $(this).attr("data-url");
      window.location = url
    })

    $(window).resize(function () {
        var newWidth = $(window).width();
        if (newWidth !== cachedWidth) {
            //DO RESIZE HERE
            if (__$currentRow) {
                shrinkAndRemove(__$currentRow);
            }
            initTiles($service, $items);

            cachedWidth = newWidth;
        }
    });

    // Mobile scrolling fires a resize event
    // http://stackoverflow.com/questions/9361968/
    // http://stackoverflow.com/questions/17328742
    var cachedWidth = $(window).width();

    // need to align all of our tiles from the get go
    $service.eqHeight(".service-tile");

    // When we ajax in more content, we have
    // to make sure our heights are still correct, and we have to
    $service.on('more.new', function () {
        $service.eqHeight(".service-tile");
        $(window).trigger('resize');
        $items = $service.find('.service-tile');
        // enable interactions
        initTiles($service, $items);
    })

    // make sure any icons are set to the proper size
    $items.find('.icon-fallback').each(setIconFallback);

    // enable interactions
    initTiles($service, $items);
    setUpEvents($service);

}

// Our global which holds the currently opened row
var __$currentRow = null;

function initTiles($service, $items) {
    //  start off with everything closed
    $items.each(function () {
        setCloseClasses($(this));
    });
    // make sure any icons are set to the proper size
    $items.find('.icon-fallback').each(setIconFallback);
    // renable the tabs and accordian plugins
    $items.find('.collapse').collapse();

    // remove any inline height set from accordian view
    $service.find('.service-tile-full .container').css({'height': ''})
}

function shrinkAndRemove($rowEl) {
    // Explicitly set our height so css transitions can work their magic
    // $rowEl.css('height', $rowEl.height() + 'px');
    // we wait for the next redraw so

    $rowEl.animate({
        'height': '0px'
    }, 300, 'linear', function () {
        $rowEl.empty().remove();
    })

}

function setUpEvents($service) {

    function closeTile(e) {
        var $item = $(this);
        e.preventDefault();

        // remove the row
        var $rowEl = findRow($item);
        shrinkAndRemove($rowEl);

        // close the tile
        setCloseClasses($item);

    }

    function openTile(e) {
        var $item = $(this);
        e.preventDefault();

        // remove teasers for all others but keep this one
        // update their event handlers
        $service.find('.service-tile').not($item).each(function () {
            var $el = $(this);
            setCloseClasses($el);
        });


        // set this elements state to open
        $item.attr('data-state', 'open');

        // secure the element for holding the content and then insert it
        var $rowEl = findRow($item);

        checkIfOldAndSet($rowEl);

        insertContent($rowEl, $item);

        setCloseButtonEvent($item,closeTile)

    }


    $service.on('click', '.service-tile', function (e) {
        e.preventDefault();
        if ($(this).hasClass("touched")) {
            $(this).removeClass('touched');
            return;
        }

        var state = $(this).attr('data-state');
        switch (state) {
            case 'closed':
            case 'info':
                openTile.call(this, e);
                break;
            case 'open':
                 closeTile.call(this, e);
                break;
            default:
        }
    });


}

// Sets the icons to be big and still fit within the service-tile
function setIconFallback() {
    var width = $(this).width();
    $(this).css({
        'font-size': width * 0.6
    });
}


// helper which does as it's name implies
function setCloseClasses($item) {
  $item.attr('data-state', 'closed').removeClass('show-info');
}

function setCloseButtonEvent($item, func){
  var id = $item.data('tile-id');
var $content = $item.parent().find('.service-tile-panel[data-tile-id="' + id + '"]').first();
  $content.find('.close.btn').on('click', function(e){
     func.call($item, e);
  })
}

/**
 * TODO: +Docs
 * TODO: Expand height using calculated content height
 */
function insertContent($rowEl, $item) {
    if (!$rowEl) {
        return
    }
    var id = $item.data('tile-id');

    var $content = $item.parent().find('.service-tile-panel[data-tile-id="' + id + '"]').first();

    $rowEl.css('height', $rowEl.height() + "px");
    $rowEl.empty();
    $content.clone().appendTo($rowEl);
    $rowEl.animate({
        'height': $content.height() + 'px'
    }, 300, 'linear', function () {
        $rowEl.css('height', '');
        scrollToEl($item);
    });

}

/**
 * TODO: +Docs
 * @param  {[type]} $item [description]
 * @return {[type]}       [description]
 */
function findRow($item) {

    // look at the following siblings and get the first element which is
    // not on the same row
    var $nextItem = $item.nextAll('.service-tile, .service-tile-full').filter(function () {
        return $(this).offset().top !== $item.offset().top;
    }).first();

    // We have already created and inserted the required expanded element
    if ($nextItem.is('.service-tile-full')) {
        // already created the row
        return $nextItem;
    }

    // We need to insert a expanded tile here
    if ($nextItem.is('.service-tile')) {
        // we insert the required element and then return after its inserted
        return createExpandedRow($nextItem, 'before');
    }
    if ($item.nextAll('.service-tile').length) {
        return createExpandedRow($item.nextAll('.service-tile').last(), 'after')
    }
    // at this point the only other possiblity is a new row after all siblings
    return createExpandedRow($item, 'after');

}

function checkIfOldAndSet($rowEl) {
    // remove old rows if needed
    if (__$currentRow && !__$currentRow.is($rowEl)) {
        shrinkAndRemove(__$currentRow);
    }
    // set and insert our content
    __$currentRow = $rowEl;

}

/**
 * TODO: +Docs
 * @param  {[type]} $item  [description]
 * @param  {[type]} method [description]
 * @return {[type]}        [description]
 */
function createExpandedRow($item, method) {
    var newEl = $('<div>').addClass('service-tile-full');
    ($item[method](newEl));
    // HACK: trigger on focus so transitions work
    newEl.focus();
    newEl.addClass('is-open');
    return newEl;
}

/* -----------------------------------------
   HELPERS
----------------------------------------- */

/**
 * TODO: +Docs
 * @param  {[type]} $el [description]
 * @return {[type]}     [description]
 */
function scrollToEl($el) {
    if (!$el || !$el.length) {
        return
    }
    var scrollVal = $el.offset().top;
    $('html, body').animate({
        scrollTop: scrollVal
    }, 450);
}
