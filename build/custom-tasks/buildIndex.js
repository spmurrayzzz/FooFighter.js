module.exports = function( grunt ){
    grunt.registerTask('buildIndex', function(){
        var done = this.async(),
            fs = require('fs');

        fs.readFile('./build/templates/index.html.tmpl', function( err, data ) {
            var content = new String(data),
                currTime = new Date().getTime(),
                newContent,
                msg;

            if ( err ) {
                throw err;
            }

            if ( fs.existsSync('./.production') ) {
                newContent = content.replace(
                    /{{ build }}/g, '.min.js'
                ).replace('{{ time }}', currTime);
                msg = 'Built production version of index.html';
            } else {
                newContent = content.replace(
                    /{{ build }}/g, '.js'
                ).replace('{{ time }}', currTime);
                msg = 'Built development version of index.html';
            }

            fs.writeFile('./index.html', newContent, function( err ) {
                if ( err ) {
                    throw err;
                }
                grunt.log.write(msg + '\n').ok();
                done(true);
            });
        });

    });
};
