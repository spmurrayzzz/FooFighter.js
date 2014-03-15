module.exports = {
    options: {
        sourcesContent: true
    },
    target: {
        files: {
            'dist/FooFighter.js': require('./srcFiles')
        }
    }
};
