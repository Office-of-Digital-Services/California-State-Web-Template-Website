// JS Partials - Used in concat & uglify tasks
var jssrc = [
  // BOOTSTRAP
  'source/js/bootstrap/alert.js',
  'source/js/bootstrap/button.js',
  'source/js/bootstrap/collapse.js',
  'source/js/bootstrap/dropdown.js',
  'source/js/bootstrap/modal.js',
  'source/js/bootstrap/tab.js',
  'source/js/bootstrap/transition.js',
  'source/js/bootstrap/tooltip.js',

  // TBOOTSTRAP ACCESSIBILITY PLUGIN
  'source/js/bootstrap-accessibility-plugin/functions.js',
  'source/js/bootstrap-accessibility-plugin/dropdown.js',
  'source/js/bootstrap-accessibility-plugin/tab.js',

  // THIRD PARTY LIBS
  'source/js/libs/responsive-tabs.js',
  'source/js/libs/owl.carousel.js',
  'source/js/libs/jquery.fancybox.js',
  'source/js/libs/jquery.eqheight.js',
  'source/js/libs/countUp.js',
  'source/js/libs/jquery.waypoints.js',
  'source/js/libs/Vague.js',
  'source/js/libs/require.js',

  // CAGOV CORE
  'source/js/cagov/helpers.js',
  'source/js/cagov/gatag.js',
  'source/js/cagov/navigation.js',
  'source/js/cagov/accordion.js',
  'source/js/cagov/panel.js',
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
  'source/js/cagov/header.js',
  'source/js/cagov/fixed-header.js',
  'source/js/cagov/charts.js',
  'source/js/cagov/parallax.js',
  'source/js/cagov/animations.js',
  'source/js/cagov/more.js',
  'source/js/cagov/high-contrast.js',
  'source/js/cagov/geo.js',
  'source/js/cagov/ask-group.js'
];

var csssrc = {
    "css/cagov.core.css": "source/less/cagov.core.less",
    "css/cagov.font-only.css": "source/less/cagov.font-only.less",
    "css/colorscheme-oceanside.css": "source/less/colorscheme/colorscheme-master.less"
}

module.exports = function (grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        /* Load the package.json so we can use pkg variables */
        pkg: grunt.file
          .readJSON('package.json'), concat: {
              options: {
                  banner: '<%= banner %><%= jqueryCheck %>',
                  stripBanners: false
              },
              javascripts: {
                  src: jssrc,
                  dest: 'js/cagov.core.js'
              }
          },

        uglify: {
            my_target: {
                files: {
                    'js/cagov.core.js': jssrc
                }
            },
            options: {
                // the banner is inserted at the top of the output
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> */\n/* JS COMPILED FROM SOURCE DO NOT MODIFY */\n'
            }
        },

        less: {
            development: {
                options: {
                    paths: ["css"],
                    compress: false,
                    ieCompat: true,
                    banner: '/* <%= pkg.name %> - v<%= pkg.version %> */\n/* STYLES COMPILED FROM SOURCE (LESS) DO NOT MODIFY */\n\n'
                },
                files: csssrc
            },
            production: {
                options: {
                    paths: ["css"],
                    compress: true,
                    ieCompat: true,
                    banner: '/* <%= pkg.name %> - v<%= pkg.version %> */\n/* STYLES COMPILED FROM SOURCE (LESS) DO NOT MODIFY */\n\n'
                },
                files: csssrc
            }
        },

        htmllint: {
            // Run on small directories at a time when possible
            all: ["*.html"]
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                      'css/*.css', 'js/*.js', '**/*.html',
                    ]
                },
                options: {
                    proxy: "cagov5.dev",
                    watchTask: true
                }
            }
        },

        autoprefixer: {
            development: {
                browsers: [
                  'Android 2.3', 'Android >= 4', 'Chrome >= 20', 'Firefox >= 24', // Firefox 24 is the latest ESR
                  'Explorer >= 8', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6'
                ],
                expand: true,
                flatten: true,
                src: ['css/cagov.core.css', 'css/colorscheme-oceanside'],
                dest: 'css'
            }
        },

        watch: {
            /* watch for less changes */
            less: {
                files: ['source/**/*.less'],
                tasks: [
                  'autoprefixer', 'less:development'
                ]
            },

            /* watch and see if our javascript files change, or new packages are installed */
            js: {
                files: ['source/**/*.js'],
                tasks: ['concat']
            },

            /* watch our files for change, reload */
            livereload: {
                files: [
                  'ssi/*.html', 'sample/**/*', './*.html', 'css/*.css', 'images/*'
                ],
                options: {
                    livereload: true
                }
            },

            /* Reload gruntfile if it changes */
            grunt: {
                files: ['Gruntfile.js']
            }

            /* Add new module here. Mind the comma's :) */
        }
    });

    // LOAD TASKS

    // Use grunt to execute compass
    grunt.loadNpmTasks('grunt-contrib-less');

    // Use grunt to watch file changes.
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Use uglify for js minification
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Concatenate js files
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Automatic vendor prefixing
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Open Source browser testing server
    grunt.loadNpmTasks('grunt-browser-sync');

    // HTML Linting
    grunt.loadNpmTasks('grunt-html');


    // REGISTER TASKS

    // Default task to watch and output uncompresses
    grunt.registerTask('default', [
      'concat', 'less:development', 'autoprefixer', 'watch'
    ]);

    // Build task to minify css and js
    grunt.registerTask('build', [
      'uglify', 'less:production', 'autoprefixer'
    ]);

    // Development task to concat and unminify
    grunt.registerTask('dev', [
      'concat', 'less:development', 'autoprefixer'
    ]);

    // HTML linting
    grunt.registerTask('lint', [
      'concat', 'less:development', 'htmllint'
    ]);

    // Device testing
    grunt.registerTask('test', [
      'concat', 'less:development', 'autoprefixer', 'browserSync', 'watch'
    ]);

};
