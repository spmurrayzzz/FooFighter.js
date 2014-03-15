/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    concat_sourcemap: {
      options: {
        sourcesContent: true
      },
      target: {
        files: {
          'dist/FooFighter.js': [
              'src/namespace.js',
              'src/modules/Util.js',
              'bower_components/shout/shout.js',
              'src/modules/GameState.js',
              'src/modules/GameEngine.js',
              'src/modules/StartScreen.js',
              'src/entities/Score.js',
              'src/entities/Timer.js',
              'src/entities/StarField.js',
              'src/entities/Player.js',
              'src/entities/EnemyShip.js',
              'src/entities/Asteroid.js',
              'src/app.js'
          ]
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: 'dist/FooFighter.min.map',
        sourceMappingURL: 'dist/FooFighter.min.map',
        sourceMapPrefix: 1
      },
      dist: {
        src: 'dist/FooFighter.js',
        dest: 'dist/FooFighter.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    watch: {
      gruntfile: {
        files: ['src/**/*.js','src/*.js'],
        tasks: ['jshint:gruntfile', 'default']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: './',
          keepalive: true
        }
      }
  }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-concat-sourcemap');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat_sourcemap', 'uglify']);

};
