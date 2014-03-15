module.exports = function( grunt ){
    grunt.registerTask('buildIndex', function(){
        var done = this.async(),
            fs = require('fs'),
            fileStr;

        fs.readFile('./build/templates/index.html', function( err, data ) {
            var content = new String(data),
                newContent;

            if ( fs.existsSync('./.production') ) {
                newContent = content.replace('{{ srcFile }}', 'FooFighter.min.js');
            } else {
                newContent = content.replace('{{ srcFile }}', 'FooFighter.js');
            }

            fs.writeFileSync('./index.html', newContent);
        });

    });
};
