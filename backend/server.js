const http = require('http');
const eetase = require('eetase');
const socketClusterServer = require('socketcluster-server');
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const morgan = require('morgan');
const uuid = require('uuid');
const sccBrokerClient = require('scc-broker-client');

let httpServer = eetase(http.createServer());
let agServer = socketClusterServer.attach(httpServer);

let expressApp = express();
expressApp.use(morgan('dev'));

(async () => {
  // Handle new inbound sockets.
  for await (let {socket} of agServer.listener('connection')) {

    (async () => {
      // Set up a loop to handle and respond to RPCs for a procedure.
      for await (let req of socket.procedure('customProc')) {
        if (req.data.bad) {
          let error = new Error('Server failed to execute the procedure');
          error.name = 'BadCustomError';
          req.error(error);
        } else {
          req.end('Success');
        }
      }
    })();
// HTTP request handling loop.
    (async () => {
        for await (let requestData of httpServer.listener('request')) {
          expressApp.apply(null, requestData);
        }
      })();

    (async () => {
      // Set up a loop to handle remote transmitted events.
      for await (let data of socket.receiver('customRemoteEvent')) {
        // ...
        console.log(data)
      }
    })();

  }
})();

httpServer.listen(8000);