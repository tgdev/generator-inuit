// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: '.',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        //fire up livereload and open site in browser
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change localhost to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            dev: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%%= yeoman.dist %>',
                    livereload: false
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        },

        // watch files for changes
        watch: {
            sass: {
                files: '<%%=yeoman.app %>/css/**/*.scss',
                tasks: ['sass']
            },
            scripts: {
                files: ['<%%=yeoman.app %>/js/**/*.js'],
                tasks: ['jshint:main', 'concat', 'uglify'],
                options: {
                    spawn: false
                },
            },
            livereload: {
                options: { livereload: true },
                files: ['*.html', '<%%=yeoman.app %>/js/**/*.js', '<%%=yeoman.app %>/css/**/*.scss']
            },
        },

        // Sass options
        sass: {
            dev: {
                options: {
                    debugInfo: true,
                    lineNumbers: true
                },
                files: {
                    // 'destination': 'source'
                    '<%%= yeoman.app %>/css/style.debug.css': '<%%= yeoman.app %>/css/style.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    debugInfo: false,
                    lineNumbers: false
                },
                files: {
                    // 'destination': 'source'
                    '<%%= yeoman.app %>/css/style.min.css': '<%%= yeoman.app %>/css/style.scss'
                }
            }
        },

        // optimise images
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/img/',
                    src: ['**/*.png'],
                    dest: '<%%= yeoman.dist %>/img/',
                    ext: '.png'
                }]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/img/',
                    src: ['**/*.jpg'],
                    dest: '<%%= yeoman.dist %>/img/',
                    ext: '.jpg'
                }]
            }
        },

        // Lint JS files for errors
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            main: [
                '<%%= yeoman.app %>/js/**/*.js',
                '!<%%= yeoman.app %>/js/vendor/*',
                '!Gruntfile.js'
            ]
        },

        // concat js files to save http requests
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    '<%%=yeoman.app %>/js/**/*.js'
                ],
                dest: '<%%=yeoman.dist %>/js/main.debug.js'
            }
        },

        // minify js
        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> */\n'
                },
                files: {
                    '<%%= yeoman.dist %>/js/main.min.js': ['<%%= yeoman.dist %>/js/main.debug.js']
                }
            }
        },

        // cleanup build assets
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%%= yeoman.dist %>/*'
                    ]
                }]
            }
        },

        // Run multiple grunt tasks at once
        concurrent: {
            dist: [
                'sass:dist',
                'imagemin',
                'jshint'
            ]
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '{,*/}*.html',
                        'css/fonts/{,*/}*.*'//,
                        // '*.{ico,png,txt}',
                        // '.htaccess',
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/css',
                dest: '<%%= yeoman.dist %>/css/',
                src: '{,*/}*.css'
            }
        }

    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'sass',
            'connect:dev',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'concat',
        'uglify',
        'copy:dist'
    ]);

    grunt.registerTask('default', ['build']);
};