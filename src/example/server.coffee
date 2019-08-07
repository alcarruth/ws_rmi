#!/usr/bin/env coffee
#
# server_example
#

#WS_RMI_Server = require('ws_rmi').WS_RMI_Server
WS_RMI_Server = require('../lib').WS_RMI_Server
Stack = require('./stack').Stack
settings = require('./settings')

class App

  constructor: (@app_id, @options) ->
    @stack = new Stack(@app_id)
    @server = new WS_RMI_Server(@options)
    @server.register(@stack)

app_id = settings.app_id
options = settings.local
app = new App(app_id, options)

if module?.parent
  # imported into parent module
  exports.server = server

else
  # invoked from command line start REPL
  app.server.start()
  # repl = require('repl')
  # repl.start('stack> ').context.app = app

# example/stack.coffee
#

WS_RMI_Stub = WS_RMI_Stub || require('../lib').WS_RMI_Stub

class Stack

  # note that the object must have an id in order to
  # register and operate with the rmi server
  #
  constructor: (@id) ->
    @stack = []

  push: (x, cb) =>
    @stack.push(x)
    console.log @stack
    cb(true)

  pop: (cb) =>
    cb( @stack.pop())
    console.log @stack


class Stack_Stub extends WS_RMI_Stub
  #@remote_methods('push','pop')
  @add_stub('push')
  @add_stub('pop')


if exports?
  exports.Stack = Stack
  exports.Stack_Stub = Stack_Stub