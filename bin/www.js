#!/usr/bin/env node

/**
 * Module dependencies.
 */
var app = require('../app');
var debug = require('debug')('rpinadzor:server');
var http = require('http');
var fs = require('fs');
var https = require('https');

var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

/**
 * Create HTTP & HTTPS server.
 */

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

/**
 * Listen on provided port, on all network interfaces.
 */

httpServer.listen(8080, function() {
    console.log("Server started at port " + 8080);
});
httpServer.on('error', onError);
httpServer.on('listening', onListening);

httpsServer.listen(8443, function() {
    console.log("Server started at port " + 8443);
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

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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
  var addr = httpsServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
