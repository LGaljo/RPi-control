const app = require('../app');
const debug = require('debug')('rpinadzor:server');
const http = require('http');
const fs = require('fs');
const https = require('https');
const chalk = require('chalk');

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
    console.log(chalk.blue("Server started at port " + unsecurePort));
});
httpServer.on('error', onError);
httpServer.on('listening', onListening);

httpsServer.listen(securePort, function () {
    console.log(chalk.blue("Server started at port " + securePort));
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
            console.error(chalk.red(bind + ' requires elevated privileges'));
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(chalk.red(bind + ' is already in use'));
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
