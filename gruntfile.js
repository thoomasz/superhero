//'use strict';
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        imagemin: { // Task
            dynamic: { // Another target 
                options: { // Target options 
                    optimizationLevel: 7
                },
                files: [{
                    expand: true, // Enable dynamic expansion 
                    cwd: 'src/img/', // Src matches are relative to this path 
                    src: ['**/*.{png,jpg,gif}'], // Actual patterns to match 
                    dest: 'build/img/' // Destination path prefix 
                }]
            }
        },

        uglify: {
            options: {
                banner: '/*! Create Pál Tamás - <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/**/*.js',
                dest: 'build/js/all.js'
            }
        },
        clean: ["build/**"],
        watch: {
            scripts: {
                files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            main: {
                files: [
              // includes files within path 
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.html', 'img/*'],
                        dest: 'build/',
                        filter: 'isFile'
                    }]
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                undef: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            },
            all: ['gruntfile.js', 'src/js/*.js']
        }


    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('tomorit', ['uglify']);
    grunt.registerTask('dev', ['jshint', 'clean', 'copy', 'uglify', 'imagemin']);
};