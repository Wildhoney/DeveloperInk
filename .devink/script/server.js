(function($process) {

    "use strict";

    const exec = require('child_process').exec;
    exec('npm run watch');

    const express     = require('express');
    const app         = express();
    const server      = require('http').createServer(app);
    const port        = ($process.env.PORT || 5000);
    const Handlebars  = require('Handlebars');
    const path        = require('path');
    const current     = path.normalize(__dirname + '/../../templates/.current');
    const fs          = require('fs');

    const boilerplateIndex = fs.readFileSync(path.normalize(__dirname + '/../ink/1.0.5/boilerplate.html'), 'UTF-8');
    const boilerplateCss   = fs.readFileSync(path.normalize(__dirname + '/../ink/1.0.5/ink.css'), 'UTF-8');

    app.get('/', function(req, res) {

        const templateIndex = fs.readFileSync(current + '/index.html', 'UTF-8');
        const templateCss   = fs.readFileSync(__dirname + '/../build/default.css', 'UTF-8');

        const template      = Handlebars.compile(boilerplateIndex);
        res.send(template({ css: [boilerplateCss, templateCss].join('\n'), template: templateIndex }));

    });

    app.use(express.static(current));

    server.listen(port);

})(process);