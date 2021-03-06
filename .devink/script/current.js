(function($minimist) {

    const argv    = $minimist(process.argv.slice(2));
    const name    = argv._[0];
    const path    = require('path').normalize(__dirname + '/../../templates/' + name);
    const current = require('path').normalize(__dirname + '/../../templates/.current');
    const fs      = require('fs');

    if (fs.lstatSync(current).isSymbolicLink() || fs.existsSync(current)) {
        fs.unlinkSync(current);
    }

    fs.symlinkSync(path, current, 'dir');

})(require('minimist'));
