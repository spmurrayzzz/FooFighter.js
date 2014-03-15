/*global module:false*/
module.exports = function( grunt ) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed MIT */\n',
        concat_sourcemap: require('./build/concat_sourcemap'),
        uglify: require('./build/uglify'),
        jshint: require('./build/jshint'),
        watch: require('./build/watch'),
        connect: require('./build/connect')
    });

    // npm tasks
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // custom local tasks
    require('./build/custom-tasks/buildIndex')(grunt);

    grunt.registerTask('default', ['jshint:game', 'concat_sourcemap', 'uglify', 'buildIndex']);

};
