(function($process) {

    "use strict";

    const express = require('express');
    const app     = express();
    const server  = require('http').createServer(app);
    const port    = ($process.env.PORT || 5000);
    const path    = require('path').normalize(__dirname + '/../templates/.current');

    app.use(express.static(path));
    server.listen(port);

})(process);