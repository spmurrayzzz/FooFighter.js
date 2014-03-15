module.exports = {
    gruntfile: {
        files: require('./srcFiles'),
        tasks: ['jshint:gruntfile', 'default']
    }
};
