(function($minimist) {

    const argv    = $minimist(process.argv.slice(2));
    const name    = argv._[0];
    const path    = require('path').normalize(__dirname + '/../../templates/' + name);
    const current = require('path').normalize(__dirname + '/../../templates/.current');
    const project = require('path').normalize(__dirname + '/../project');
    const fs      = require('fs');
    const ncp     = require('ncp').ncp;

    ncp.limit = 5;

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    if (fs.lstatSync(current).isSymbolicLink() || fs.existsSync(current)) {
        fs.unlinkSync(current);
    }

    fs.symlinkSync(path, current, 'dir');
    ncp(project, current);

})(require('minimist'));
