(function($minimist) {

    "use strict";

    const argv     = $minimist(process.argv.slice(2));
    const filename = argv._[0];
    const devInk   = require('./../devink').devInk;
    const fs       = require('fs');

    devInk.renderTemplate().then(function(html) {
        fs.writeFileSync(filename, html);
    });

})(require('minimist'));
