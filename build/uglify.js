module.exports = {
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
}
