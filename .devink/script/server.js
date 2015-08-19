(function($process) {

    "use strict";

    const exec = require('child_process').exec;
    exec('npm run watch');

    const express     = require('express');
    const devInk      = require('./../devink').devInk;
    const app         = express();
    const server      = require('http').createServer(app);
    const port        = ($process.env.PORT || 5000);

    app.get('/', function(req, res) {
        res.send(devInk.getRenderedTemplate());
    });

    app.use(express.static(devInk.getCurrent()));
    server.listen(port);

})(process);