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
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        watch: {
            scripts: {
                files: ['/js/**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                },
            },
            compass: {
                files: ['/css/**/*.{scss,sass}'],
                tasks: ['compass:server']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '/*.html',
                    '{.tmp,}/css/{,*/}*.css',
                    '{.tmp,}/js/{,*/}*.js',
                    '/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
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
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '/js/**/*.js',
                '!/js/vendor/*'
            ]
        },
        compass: {
            options: {
                sassDir: '/css',
                cssDir: '.tmp/css',
                generatedImagesDir: '.tmp/img/generated',
                imagesDir: '/img',
                javascriptsDir: '/scripts',
                fontsDir: '/css/fonts',
                importPath: '/bower_components',
                httpImagesPath: '/img',
                httpGeneratedImagesPath: '/img/generated',
                httpFontsPath: '/css/fonts',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // Minify assets - Images, Css & Js
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '/img/',
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
                    cwd: '/img/',
                    src: ['**/*.jpg'],
                    dest: '<%%= yeoman.dist %>/img/',
                    ext: '.jpg'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '/img',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/img'
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: '/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%%= yeoman.dist %>/css/',
                ext: '.min.css'
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'img/{,*/}*.{webp,gif}',
                        'css/fonts/*'
                    ]
                },
                {
                    expand: true,
                    cwd: '.tmp/img',
                    dest: '<%%= yeoman.dist %>/img',
                    src: [
                        'generated/*'
                    ]
                }]
            }
        },
        // Run multiple grunt tasks at once
        concurrent: {
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        },
        // concatenate all commonly used scripts into single js file
        concat: {
            options: {
                separator: '\n\r'
            },
            files: {
                src: [
                    // List files here
                    //'/js/example.js'
                ],
                dest: '.tmp/js/main.js',
                nonull: true
            }
        },
        // minify js
        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> */\n'
                },
                files: {
                    '<%%= yeoman.dist %>/js/main.min.js': ['.tmp/js/main.js']
                }
            }
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'compass:server',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'concat',
        'uglify',
        'copy'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);
};