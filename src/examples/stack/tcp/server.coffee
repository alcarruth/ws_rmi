#!/usr/bin/env coffee
#
#  file: src/examples/stack/tcp/server.coffee
#

{ Stack_RMI_Server } = require('../stack_rmi_server')
options = require('./settings').local_options

server = new Stack_RMI_Server(options)

module.exports = server
