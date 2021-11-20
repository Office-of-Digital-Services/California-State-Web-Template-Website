// Gulpfile

var gulp = require('gulp'), // Gulp
    sass = require('gulp-sass'), // SASS,
    autoprefixer = require('gulp-autoprefixer'), // Add the desired vendor prefixes and remove unnecessary in SASS-files
    uglify = require('gulp-uglify-es').default,
    gutil = require('gulp-util');
csso = require('gulp-csso');
concat = require('gulp-concat');
injectVersion = require('gulp-inject-version');
header = require('gulp-header');


var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.description %> -  @version v<%= pkg.version %> -  <%= new Date().getMonth() + 1 %>/<%= new Date().getDate() %>/<%= new Date().getFullYear()  %> ',
    '  STYLES COMPILED FROM SOURCE (SCSS) DO NOT MODIFY */',
    ''].join('\n');
var bannerjs = ['/**',
    ' * <%= pkg.description %> -  @version v<%= pkg.version %> -  <%= new Date().getMonth() + 1 %>/<%= new Date().getDate() %>/<%= new Date().getFullYear()  %> ',
    '  STYLES COMPILED FROM SOURCE (source/js) DO NOT MODIFY */',
    ''].join('\n');




var jssrc = [
    // MODERNIZR
    'source/js/libs/modernizr.js',

    // BOOTSTRAP 
    'source/js/bootstrap/bootstrap.min.js',


    // CAGOV CORE
    'source/js/cagov/fixed-header.js',
    'source/js/cagov/accordion.js',
    'source/js/cagov/accordion-list.js',
    'source/js/cagov/navigation.js',
    'source/js/cagov/search.js',
    'source/js/cagov/sourcecode.js',
    'source/js/cagov/tabs.js',
    'source/js/cagov/number-counter.js',
    'source/js/cagov/parallax.js',
];

var jssrcmap = ['source/js/bootstrap/bootstrap.min.js.map',];
// creating assets folder and copiing index file in there.
//gulp.task('copy', function() {
// gulp.src('index.html')  //src where we put the name of the file we want to work with and use as an input
// .pipe(gulp.dest('assets')) // pipe will take output of the previous command as pipe it as an input for the next
// dest writes the output of previous commands to the folder we specify
//});


// log plugin
gulp.task('log', function () {
    gutil.log('== My Log Task ==')
});



/*-----------------------*/
//CORE
/*-----------------------*/
// sass CORE 


gulp.task('core', function () {
    return gulp.src('source/scss/cagov.core.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('cagov.core.css')) // compiled file
        .on('error', gutil.log) // keeping log
        .pipe(gulp.dest('css/'))
});


// sass core min
gulp.task('coremin', function () {
    return gulp.src('source/scss/cagov.core.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('cagov.core.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log
        .pipe(gulp.dest('css/'))
});





/*-----------------------*/
//COLOR SCHEMES
/*-----------------------*/
// DELTA
gulp.task('delta', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-delta-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-delta.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});
// delta min
gulp.task('deltamin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-delta-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-delta.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});


// EUREKA
gulp.task('eureka', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-eureka-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-eureka.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});
// eureka min
gulp.task('eurekamin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-eureka-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-eureka.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});



// MONO
gulp.task('mono', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-mono-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-mono.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});
// mono min
gulp.task('monomin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-mono-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-mono.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});



// OCEANSIDE
gulp.task('oceanside', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-oceanside-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-oceanside.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});
// oceanside min
gulp.task('oceansidemin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-oceanside-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-oceanside.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});



// ORANGE COUNTY
gulp.task('orangecounty', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-orangecounty-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-orangecounty.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});
// orangecounty min
gulp.task('orangecountymin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-orangecounty-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-orangecounty.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});




// PASO ROBLES
gulp.task('pasorobles', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-pasorobles-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-pasorobles.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

})
// pasorobles min
gulp.task('pasoroblesmin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-pasorobles-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-pasorobles.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});




// SACRAMENTO
gulp.task('sacramento', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-sacramento-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-sacramento.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});
// sacramento min
gulp.task('sacramentomin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-sacramento-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-sacramento.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});






// SANTA BARBARA
gulp.task('santabarbara', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-santabarbara-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-santabarbara.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});
// santabarbara min
gulp.task('santabarbaramin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-santabarbara-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-santabarbara.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});



// SANTA CRUZ
gulp.task('santacruz', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-santacruz-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-santacruz.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});
// santacruz min
gulp.task('santacruzmin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-santacruz-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-santacruz.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});


// SHASTA
gulp.task('shasta', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-shasta-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-shasta.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});
// shasta min
gulp.task('shastamin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-shasta-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-shasta.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});



// SIERRA
gulp.task('sierra', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-sierra-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-sierra.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});
// sierra min
gulp.task('sierramin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-sierra-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-sierra.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});






// sass colorscheme TRINITY
gulp.task('trinity', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-trinity-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-trinity.css')) // compiled file
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});
// sass colorscheme trinity min
gulp.task('trinitymin', function () {
    return gulp.src('source/scss/colorscheme/colorscheme-trinity-import.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        // .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('colorscheme-trinity.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log

        .pipe(gulp.dest('css/'))

});



// sass font 
gulp.task('font', function () {
    return gulp.src('source/scss/cagov.font-only.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(header(banner, { pkg: pkg }))
        //.pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('cagov.font-only.css')) // compiled file
        .on('error', gutil.log) // keeping log
        .pipe(gulp.dest('css/'))
});



// sass font min
gulp.task('fontmin', function () {
    return gulp.src('source/scss/cagov.font-only.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        //.pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
        .pipe(concat('cagov.font-only.min.css')) // compiled file
        .pipe(csso()) // minify
        .pipe(header(banner, { pkg: pkg }))
        .on('error', gutil.log) // keeping log
        .pipe(gulp.dest('css/'))
});



/*-----------------------*/
//JS CORE
/*-----------------------*/

// Combining JS 
gulp.task('js', done => {
    gulp.src(jssrc)
        .pipe(concat('cagov.core.js'))
        .pipe(header(bannerjs, { pkg: pkg }))
        .pipe(gulp.dest('js'));
    done();
});

// JS Core Min 
gulp.task('jsmin', function () {
    return gulp.src(jssrc)
        .pipe(concat('cagov.core.min.js'))
        .pipe(uglify())
        .pipe(header(bannerjs, { pkg: pkg }))
        .pipe(gulp.dest('js'));
    done();
});





/*-----------------------*/
//COMPILE
/*-----------------------*/

// watching for the file
gulp.task('watch', function () {
    gulp.watch('source/js/**/*.js', ['js']);
    gulp.watch('source/scss/cagov/*.scss', ['core']);
    gulp.watch('source/scss/colorscheme/*.scss', ['delta']);
    gulp.watch('source/scss/colorscheme/*.scss', ['eureka']);
    gulp.watch('source/scss/colorscheme/*.scss', ['mono']);
    gulp.watch('source/scss/colorscheme/*.scss', ['oceanside']);
    gulp.watch('source/scss/colorscheme/*.scss', ['orangecounty']);
    gulp.watch('source/scss/colorscheme/*.scss', ['pasorobles']);
    gulp.watch('source/scss/colorscheme/*.scss', ['sacramento']);
    gulp.watch('source/scss/colorscheme/*.scss', ['santabarbara']);
    gulp.watch('source/scss/colorscheme/*.scss', ['santacruz']);
    gulp.watch('source/scss/colorscheme/*.scss', ['shasta']);
    gulp.watch('source/scss/colorscheme/*.scss', ['sierra']);
    gulp.watch('source/scss/colorscheme/*.scss', ['trinity']);
    gulp.watch('source/scss/cagov/cagov.font-only.scss', ['font']);
});



//
// DEV (Development Output)
//

gulp.task('dev', gulp.series('core', 'delta', 'eureka', 'mono', 'oceanside', 'orangecounty', 'pasorobles', 'sacramento', 'santabarbara', 'santacruz', 'shasta', 'sierra', 'trinity', 'font', 'js'));

// PROD (Minified Output)
gulp.task('prod', gulp.series('coremin', 'deltamin', 'eurekamin', 'monomin', 'oceansidemin', 'orangecountymin', 'pasoroblesmin', 'sacramentomin', 'santabarbaramin', 'santacruzmin', 'shastamin', 'sierramin', 'trinitymin', 'fontmin', 'jsmin'));