module.exports = function( grunt ) {
    return {
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed MIT */\n',
        concat_sourcemap: require('./concat_sourcemap'),
        uglify: require('./uglify'),
        jshint: require('./jshint'),
        watch: require('./watch'),
        connect: require('./connect')
    }
};
