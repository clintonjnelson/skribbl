'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs'          );
  grunt.loadNpmTasks('grunt-mocha-test'    );

  // Configure Tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jscs: {
      src: [ 'Gruntfile.js',
             '*.js',
             '/lib/**/*.js',
             'models/**/*.js',
             'routes/**/*.js',
             'test/**/*.js'
           ],
      options: {
        verbose: true
      }
    },
    jshint: {
      dev: {
        src: [ 'Gruntfile.js',
               '*.js',
               '/lib/**/*.js',
               'models/**/*.js',
               'routes/**/*.js',
               'test/**/*.js'
             ]
      },
      options: {
        jshintrc: true
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: false,
          quiet: false,
          clearRequireCache: false
        },
        src: ['test/**/*_test.js']  // all _test files
      }
    }
  });

  // Custom Task Chains
  grunt.registerTask('test', ['jshint:dev', 'jscs', 'mochaTest']);
  grunt.registerTask('default' ,['test']);
};















