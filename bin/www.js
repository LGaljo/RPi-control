let app = require('../app');
let debug = require('debug')('rpinadzor:server');
let http = require('http');
let fs = require('fs');
let https = require('https');

let privateKey;
let certificate;
let unsecurePort = process.env.UNSECURE_PORT;
let securePort = process.env.SECURE_PORT;

if (process.env.ON_RPI) {
    privateKey = fs.readFileSync('./sslcert/server.key', 'utf8');
    certificate = fs.readFileSync('./sslcert/server.crt', 'utf8');
} else {
    privateKey = fs.readFileSync('/home/pi/nodejs/sslcert/server.key', 'utf8');
    certificate = fs.readFileSync('/home/pi/nodejs/sslcert/server.crt', 'utf8');
}

let credentials = {
    key: privateKey,
    cert: certificate
};

//Create HTTP & HTTPS server.
let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(unsecurePort, function () {
    console.log("Server started at port " + unsecurePort);
});
httpServer.on('error', onError);
httpServer.on('listening', onListening);

httpsServer.listen(securePort, function () {
    console.log("Server started at port " + securePort);
});
httpsServer.on('error', onError);
httpsServer.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof unsecurePort === 'string'
        ? 'Port ' + unsecurePort
        : 'Port ' + unsecurePort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let addr = httpsServer.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
