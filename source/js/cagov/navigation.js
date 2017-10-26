/* -----------------------------------------
   NAVIGATION MENU - /source/js/cagov/navigation.js
----------------------------------------- */

$(document).ready(function(){
  // detect partial flexbox support in IE>9
  if($('.top-level-nav').css('display') == 'table') { $('body').addClass('no-flex') }

  // menu variables
  var $navigation = $('#navigation.main-navigation'),
    $navItems = $navigation.find('.nav-item'), // first level link containers'
    $navItemsWithSubs = $navItems.has('.sub-nav'),
    $subNavs = $navigation.find('.sub-nav'),
    megamenu = $navigation.hasClass('megadropdown'),
    dropdown = $navigation.hasClass('dropdown'),
    singleLevel = $navigation.hasClass('singleLevel'),
    offCanvas =  $navigation.hasClass('off-canvas'),
    mobileWidth = 767,
    setActiveLinkByFolder = $navigation.hasClass('auto-highlight'); // Use new folder matching method to highlight the current navigation tab

  var mouseOverDelay=300, setTimeoutConst;

  // touch detection
  var isTouch = Modernizr.touch,
    msTouch	= (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

  var touchMode = false;
  $(window).on('mousemove',function(){
    if(touchMode) touchmode = false;
  });

  // HIGHLIGHT APPROPRIATE NAV ITEM
  var reMainNav = "",
    arrCurrentURL=location.href.split("/");
  if (typeof defaultActiveLink != "undefined") {
    reMainNav = new RegExp("^" + defaultActiveLink + "$", "i"); // Regex for finding the index of the default main list item
  }
  $navItems.each(function(){ // loop through top level links
    var $this = $(this),
      $a = $this.find('.first-level-link');

    if (reMainNav) {
      if($a.text().match(reMainNav)) {
        $this.addClass('active');
      }
    } else if(setActiveLinkByFolder && $a.attr('href')) {
      var arrNavLink = $a[0].href.split("/");
      if ((arrNavLink.length > 4) && (arrCurrentURL[3] == arrNavLink[3])) { // folder of current URL matches this nav link
        $this.addClass('active');
      }
    }
  });

  $navItemsWithSubs.each(function(){
    var itemCount = $(this).find('.second-level-nav > li').length;
    if(itemCount <= 2) {
      $(this).find('.sub-nav').addClass('with-few-items');
    }
  });

  // setup megamenu
  if(megamenu || dropdown) {
    // add indicator arrows to sub navs
    var navArrow = $('<div class="nav-arrow-container"><div class="nav-arrow-down"></div></div>');
    $subNavs.append(navArrow);
  }

  if((megamenu || dropdown) && (isTouch || !msTouch)) {		// setup standard megamenu or dropdown menu and touch supporting 'ontouchstart'
    // show and hide sub nav with fade effect
    $navItemsWithSubs.on("mouseenter.ca.navshow", function(){
      if(mobileView()) return; // hover effects disabled on mobile view;
      if(touchMode) return;
        var $this = $(this);
          setTimeoutConst = setTimeout(function(){

              var $sub = $this.find('.sub-nav').css('display','none');
              $sub.css({ display: 'block', opacity: 0 }).stop(true, true)
              .delay(300).animate({
                opacity: 1
              },300)


            positionNavArrow($this);
         }, mouseOverDelay);


    });
  $navItemsWithSubs.on("mouseleave.ca.navclose",function(){
      if(mobileView()) return; // hover effects disabled on mobile view;
      if(touchMode) return;
       clearTimeout(setTimeoutConst );
      var $sub = $(this).find('.sub-nav');
      $sub.animate({
        opacity: 0
      },300,function(){
        $(this).removeAttr('style'); // remove inline styles for mobile view
      });
    });

    if(isTouch) {
      // hide submenus when touch occurs outside of menu
      $(document).on('touchstart.ca.catchNav', function(e) {
        touchMode = false;
        hideSubNavs();
      }, false);

      $navItemsWithSubs.each(function(){
        var $this = $(this),
          $a = $this.find('.first-level-link'),
          node = $a[0],
          $sub = $this.find('.sub-nav'),
          $subLinks = $sub.find('a');
        $a.data('link',$a.attr('href')).removeAttr; // store url

        $this.on('touchstart.ca.propagation', function(e) {
          // keeps tabpanel from closing when clicking inside of it
          e.stopPropagation();
        });

        $this.on('touchstart.ca.navclose', function(e) {
          touchMode = true;
          if($sub.is(':visible') || mobileView()) {
            // if sub is visible, or in mobile view keep default behavior
          } else {
            // keeps tabpanel from closing when clicking inside of it
            e.preventDefault();
            e.stopPropagation();

            // position arrow, hide other sub-nav panels, fade in current panel
            positionNavArrow($this);
            hideSubNavs();
            $sub.fadeIn(300);
          }
        },false);
      });
    }

  } else if((megamenu || dropdown) && msTouch) { 		// setup standard megamenu or dropdown menu and touch supporting 'pointerevents'
    // hide submenus when touch/click occurs outside of menu
    $(document).on('click.ca.catchNav',function(e){
      if (!$navigation.is(e.target) && $navigation.has(e.target).length === 0) {
        hideSubNavs();
      }
    });

    $navItemsWithSubs.each(function(){
      var $this = $(this),
        $a = $this.find('.first-level-link'),
        node = $a[0],
        $sub = $this.find('.sub-nav'),
        $subLinks = $sub.find('a');
      $a.data('link',$a.attr('href')); // store url

        $this.on('click.ca.propagation', function(e) {
        // keeps tabpanel from closing when clicking inside of it
        e.stopPropagation();
      });

      $a.on('click.ca.navclose', function(e) {
        if($sub.is(':visible') || mobileView()) {
          // if sub is visible, or in mobile view keep default behavior
        } else {
          // keeps tabpanel from closing when clicking inside of it
          e.preventDefault();
          e.stopPropagation();

          // position arrow, hide other sub-nav panels, fade in current panel
          positionNavArrow($this);
          hideSubNavs();
          $sub.fadeIn(300);
        }
      });
    });
  }

  // MENU FUNCTIONS
  function hideSubNavs(){
    $subNavs.fadeOut(300);
  };

  function mobileView() {
    return ($('.global-header .mobile-controls').css('display') !== "none"); // mobile view uses arrow to show subnav instead of first touch
  }

  // position nav-arrow-down below the corresponding link (parent position - parent width/2)
  function positionNavArrow(o) {
    if(megamenu) {
      var positionLeft = o.offset().left - $navigation.offset().left + o.width()/2;
      o.find('.nav-arrow-down').css({left: positionLeft});
    }
  }

  // SETUP MOBILE MENU
  // add sub nav toggles to mobile menu $navItemsWithSubs
  if(!singleLevel) {
    $navItemsWithSubs.each(function(){

      $(this).find('.first-level-link').addClass('has-sub');

      // create toggle object
      var $toggleSubNav = $('<span class="mobile-control toggle-sub-nav closed"><span class="ca-gov-icon-menu-toggle-closed" aria-hidden="true"></span><span class="ca-gov-icon-menu-toggle-open" aria-hidden="true"></span><span class="sr-only">Sub Menu Toggle</span></span>');
      // add toggle object to DOM
      $(this).find('.sub-nav').before($toggleSubNav);

      // setup mobile toggle
      $toggleSubNav.click(function(){
        var secondaryLinks = $(this).parent().find('.sub-nav');
        if(secondaryLinks.is(':visible')) {
          //close panel
          $(this).removeClass('open').addClass('closed');
          secondaryLinks.slideUp('fast',function(){
            // remove style attribute after animation and switch to class for styling
            $(this).removeAttr('style').removeClass('secondary-open');
          });
        } else {
          // open panel
          $(this).removeClass('closed').addClass('open');
          secondaryLinks.slideDown('fast',function(){
            // remove style attribute after animation and switch to class for styling
            $(this).removeAttr('style').addClass('secondary-open');
          });
        }
      });
    });
  }

  // SETUP OFF CANVAS MOBILE MENU
  if(offCanvas) {

    // add enabled class for off-canvas element styles
    $('body').addClass('off-canvas-enabled');

    // wrap menu and content in elements to allow off canvas positioning
    if(!$('body > .oc-outer')[0]){
      $('body').wrapInner('<div class="oc-outer"><div class="oc-inner"></div></div>');
    }

    // off canvas menu variables
    var scrollMenuOnly = true, // stop scrolling on main content and only allow scrolling on menu when off-canvas menu is open
      $offCanvasWrapper = $('.oc-outer'),
      $offCanvasElement = $('.global-header .navigation-search').addClass('oc-menu'),	// off canvas menu element
      $mobileControls = $('.mobile-controls'), // cache .mobile-contols div
      $offCanvasToggle = $('.toggle-menu'), // off canvas toggle button
      $offCanvasShield = $('.header-decoration'); //blocks main content

    function matchMenuToHeight($el) {
      if(mobileView()) {
        // get window or body height minus .mobile-controls height and apply to menu
        var menuHeight = $el.height() - $mobileControls.height();

        $offCanvasElement.height(menuHeight);
        $offCanvasShield.height($(window).height());
      } else {
        $offCanvasElement.removeAttr('style');
        $offCanvasShield.removeAttr('style');
      }
    }

    // prevent scrolling when off-canvas menu is open
    if(scrollMenuOnly) {
      $offCanvasWrapper.addClass('scroll-menu-only');
    }

    // size menu based on scroll option
    var $el = (scrollMenuOnly) ? $(window) :  $('body');
    $(window).resize(function(){
      matchMenuToHeight($el);
    });
    matchMenuToHeight($el);



    $('nav a').last().blur(function(){
      setTimeout(function(){
        if(!$(document.activeElement).closest('nav.main-navigation').length) closeOffCanvas();
      },1);
    })

    // Initiate menu button event handlers
    $offCanvasToggle.click(function(){
      toggleOffCanvasMenu();
    }).attr('tabindex',0).focus(function(){
      openOffCanvas();
    });

    $offCanvasShield.click(function(){
       closeOffCanvas();
    });

    function toggleOffCanvasMenu() {
      if($offCanvasElement.hasClass('oc-menu-open')){
        closeOffCanvas();
      } else {
        openOffCanvas();
      }
    }

    function openOffCanvas() {
      $offCanvasWrapper.addClass('oc-menu-open');
    };

    function closeOffCanvas() {
      $offCanvasWrapper.removeClass('oc-menu-open');
      $('.toggle-sub-nav').removeClass('open').addClass('closed');
      $('.sub-nav').removeClass('secondary-open');
    };
  } else {
    // Setup non-off-canvas menu
    $('#navigation').addClass('mobile-closed');

    $('.toggle-menu').click(function(){
      $('#navigation').toggleClass('mobile-closed');
      $('.search-container').removeClass('active');
    });

    $('.toggle-search').on('click',function(){
      $('.search-container').toggleClass('active');
      if(!$('#navigation').hasClass('active')) {
        $('#navigation').addClass('mobile-closed');
      }
    });
  }


  // allow dropdown on focus
  var menuHoverClass = 'focus',
    clickedFocus = 'clickedFocus';

  $('.top-level-nav > li > a').hover(function(){
    $(this).closest('ul').find('.'+menuHoverClass).removeClass(menuHoverClass);
  }, function(){
    $('.'+clickedFocus).removeClass(clickedFocus)
  });
  $('.top-level-nav > li > a').focus(function(e){
    $(this).closest('ul').find('.'+menuHoverClass).removeClass(menuHoverClass);
    if(!$(this).parent().find('.toggle-sub-nav').hasClass('open')) {
      $(this).parent().addClass(menuHoverClass);
    }
  }).on('mousedown',function(){
    // prevent subnav from showing when link is clicked
    if(!$(this).parent().find('.toggle-sub-nav').hasClass('open')) {
      $(this).parent().addClass(clickedFocus);
    }
  });

  // Hide menu if click occurs outside of navigation
  // Hide menu if click or focus occurs outside of navigation
  $('.top-level-nav a').last().keydown(function(e){
    if(e.keyCode == 9) {
      // If the user tabs out of the navigation hide all menus
      $('.top-level-nav .'+menuHoverClass).removeClass(menuHoverClass);
    }
  });
  $(document).click(function(){ $('.top-level-nav .'+menuHoverClass).removeClass(menuHoverClass); });

  $('.top-level-nav').click(function(e){
    e.stopPropagation();
  });
  //*/


});
