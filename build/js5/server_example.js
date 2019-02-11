'use strict';

// Generated by CoffeeScript 2.3.2
(function () {
  //!/bin/env coffee

  // server_example.coffee

  var Stack, WS_RMI_Server, server, stack;

  WS_RMI_Server = require('./ws_rmi_server.coffee').WS_RMI_Server;

  Stack = require('./example_object.coffee').Stack;

  server = new WS_RMI_Server('localhost', 8085, '.');

  stack = new Stack('br549');

  server.register(stack);

  if (module.parent) {
    exports.server = server;
    exports.stack = stack;
  } else {
    server.start();
  }
}).call(undefined);

//# sourceURL=/home/carruth/git/ws_rmi/build/coffee/server_example.coffee