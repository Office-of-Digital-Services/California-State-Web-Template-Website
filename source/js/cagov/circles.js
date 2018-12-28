/* -----------------------------------------
   CIRCLES
   requires circles.min.js
   /source/js/cagov/circles.js
----------------------------------------- */

 // Animating the circles only when visible
 $.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

circlesCreated = false;

$(window).on('scroll', function () {
  if (!circlesCreated && $("#show-on-scroll").isInViewport()) {
      circlesCreated = true;
      createCircles();
}
});

function createCircles() {
  //isolate this circles code out of fuction if you want circles animation to start right away
  var myCircle1 = Circles.create({
      id: 'circle1', radius: 80,
      radius: 80,
      value: 87,
      maxValue: 100,
      width: 8,
      text: function (value) { return value + '%'; },
      colors: ['#363636', '#72c02c'],
      duration: 2000,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
  });

  var myCircle2 = Circles.create({
      id: 'circle2', radius: 80,
      radius: 80,
      value: 74,
      maxValue: 100,
      width: 8,
      text: function (value) { return value + '%'; },
      colors: ['#363636', '#e81c62'],
      duration: 2000,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
  });

  var myCircle3 = Circles.create({
      id: 'circle3', radius: 80,
      radius: 80,
      value: 65,
      maxValue: 100,
      width: 8,
      text: function (value) { return value + '%'; },
      colors: ['#363636', '#00bed6'],
      duration: 2000,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
  });
  // End circles
}

  // End Animating the circles only when visible