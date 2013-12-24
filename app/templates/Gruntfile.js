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
        temp: '.tmp',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        //fire up livereload and open site in browser
        connect: {
            options: {
                port: 9000,
                // change localhost to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, yeoman.temp),
                            mountFolder(connect, yeoman.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeoman.dist)
                        ];
                    }
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
                files: ['*.html', '<%%=yeoman.dist %>/**/*']
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
                    '<%%= yeoman.dist %>/css/style.debug.css': '<%%= yeoman.app %>/css/style.scss'
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
                    '<%%= yeoman.dist %>/css/style.min.css': '<%%= yeoman.app %>/css/style.scss'
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
        }

    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('default', ['build']);
};