// Gulpfile

var gulp           	= require('gulp'), // Gulp
    sass           	= require('gulp-sass'), // SASS,
    autoprefixer   	= require('gulp-autoprefixer'), // Add the desired vendor prefixes and remove unnecessary in SASS-files
	uglify 			= require('gulp-uglify'), 
	gutil 			= require('gulp-util');
	concat 			= require('gulp-concat'); 


var jssrc = [
	// NO CONFLICT
	'source/js/cagov/noconflict.js',
	
	// BOOTSTRAP 4
	'source/js/bootstrap/master.js',
	'source/js/bootstrap/util.js',
	'source/js/bootstrap/alert.js',
	'source/js/bootstrap/button.js',
	'source/js/bootstrap/carousel.js',
	'source/js/bootstrap/collapse.js',
	'source/js/bootstrap/popper.js',
    'source/js/bootstrap/dropdown.js',
    'source/js/bootstrap/modal.js',
	'source/js/bootstrap/tooltip.js',
    'source/js/bootstrap/popover.js',
	'source/js/bootstrap/scrollspy.js',
	'source/js/bootstrap/tab.js',
	'source/js/bootstrap/index.js',


  // BOOTSTRAP ACCESSIBILITY PLUGIN
   'source/js/bootstrap-accessibility-plugin/functions.js',
   'source/js/bootstrap-accessibility-plugin/collapse.js',
   'source/js/bootstrap-accessibility-plugin/dropdown.js',
   'source/js/bootstrap-accessibility-plugin/tab.js',

  // THIRD PARTY LIBS
 'source/js/libs/responsive-tabs.js',
 'source/js/libs/owl.carousel.js',
 'source/js/libs/jquery.fancybox.js',
 'source/js/libs/jquery.eqheight.js',
 'source/js/libs/countUp.js', // updated
 'source/js/libs/jquery.waypoints.js',
 'source/js/libs/Vague.js',
 'source/js/libs/circles.min.js',
// 'source/js/libs/require.js',

  // CAGOV CORE

    'source/js/cagov/header.js',
    'source/js/cagov/fixed-header.js',
    'source/js/cagov/helpers.js',
    'source/js/cagov/gatag.js',
  	'source/js/cagov/navigation.js',
    'source/js/cagov/accordion.js',
    'source/js/cagov/panel.js',
    'source/js/cagov/card.js',
    'source/js/cagov/search.js',
    'source/js/cagov/plugins.js',
    'source/js/cagov/gallery.js',
    'source/js/cagov/profile-banners.js',
    'source/js/cagov/carousel.js',
    'source/js/cagov/jobs.js',
    'source/js/cagov/locations.js',
    'source/js/cagov/socialsharer.js',
    'source/js/cagov/breadcrumb.js',
    'source/js/cagov/service-tiles.js',
    'source/js/cagov/number-counter.js',
    'source/js/cagov/charts.js',
    'source/js/cagov/parallax.js',
    'source/js/cagov/animations.js',
    'source/js/cagov/more.js',
    'source/js/cagov/high-contrast.js',
    'source/js/cagov/geo.js',
    'source/js/cagov/ask-group.js',
    'source/js/cagov/panes.js',
    'source/js/cagov/circles.js',
    'source/js/cagov/sourcecode.js',
];


// creating assets folder and copiing index file in there.
//gulp.task('copy', function() {
 // gulp.src('index.html')  //src where we put the name of the file we want to work with and use as an input
 // .pipe(gulp.dest('assets')) // pipe will take output of the previous command as pipe it as an input for the next
  // dest writes the output of previous commands to the folder we specify
//});


// log plugin
gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});


// sass core 
gulp.task('sass', function() {
  return gulp.src('source/scss/cagov.core.scss')
    .pipe(sass({outputStyle:'expanded'}))
   // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
	.pipe(concat('cagov.core.css')) // compiled file
	.on('error', gutil.log) // keeping log
    .pipe(gulp.dest('css/'))
});

// sass colorscheme
gulp.task('sasscolor', function() {
  return gulp.src('source/scss/colorscheme/colorscheme-master.scss')
    .pipe(sass({outputStyle:'expanded'}))
   // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
	.pipe(concat('colorscheme-oceanside.css')) // compiled file
	.on('error', gutil.log) // keeping log
    .pipe(gulp.dest('css/'))
});


// sass font 
gulp.task('sassfont', function() {
  return gulp.src('source/scss/cagov.font-only.scss')
    .pipe(sass({outputStyle:'expanded'}))
    //.pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
	.pipe(concat('cagov.font-only.css')) // compiled file
	.on('error', gutil.log) // keeping log
    .pipe(gulp.dest('css/'))
});

// Combining JS 
gulp.task('js', function() {
  gulp.src(jssrc)
  //.pipe(uglify())
  .pipe(concat('cagov.core.js'))
  .pipe(gulp.dest('js'))
});


// watching for the file
gulp.task('watch', function() {
  gulp.watch('source/js/**/*.js', ['js']);
  gulp.watch('source/scss/cagov/*.scss', ['sass']);
  gulp.watch('source/scss/colorscheme/*.scss', ['sasscolor']);
  gulp.watch('source/scss/cagov/cagov.font-only.scss', ['sassfont']);
});

//
// Default
//

gulp.task('default', ['sass', 'sasscolor', 'sassfont', 'js']);