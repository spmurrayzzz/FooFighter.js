/*global module:false*/
module.exports = function( grunt ) {

    grunt.initConfig(
        require('./build/grunt-config')(grunt)
    );

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
