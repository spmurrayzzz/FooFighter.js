module.exports = function( grunt ){
    grunt.registerTask('buildIndex', function(){
        var done = this.async(),
            fs = require('fs');

        fs.readFile('./build/templates/index.html', function( err, data ) {
            var content = new String(data),
                newContent,
                msg;

            if ( fs.existsSync('./.production') ) {
                newContent = content.replace('{{ srcFile }}', 'FooFighter.min.js');
                msg = 'Built production version of index.html';
            } else {
                newContent = content.replace('{{ srcFile }}', 'FooFighter.js');
                msg = 'Built development version of index.html';
            }

            fs.writeFileSync('./index.html', newContent);
            grunt.log.write(msg + '\n').ok();
            done(true);
        });

    });
};
