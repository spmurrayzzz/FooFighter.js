module.exports = {
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
        globals: {
            'FooFighter': false,
            'require': false
        }
    },
    gruntfile: {
        src: 'Gruntfile.js'
    },
    game: {
        src: require('./srcFiles')
    }
};
