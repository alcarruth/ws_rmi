#!/bin/env/ coffee
#
# ws_rmi_client.coffee
#

WebSocket = window?.WebSocket || require('ws')

log = (msg) ->
  console.log(msg)

class WS_RMI_Client

  constructor: (@url) ->
    @registry = {}
    @cnt = 0
    @cb_hash = {}
    @stubs = []

  connect: (url) =>
    @url = url if url
    @server = new WebSocket(@url)
    @server.onopen = @onOpen
    @server.onmessage = @onMessage
    @server.onclose = @onClose
    @server.onerror = @onError
    true

  onOpen: (evt) =>
    log("connected to rmi server at #{@url}")

  onMessage: (evt) =>
    @handle_response(evt.data)

  onClose: (evt) =>
    log("socket closed by server at #{@url}")

  onError: (evt) =>

  disconnect: =>
    log("disconnecting from server at #{@url}")
    @server.close()

  register: (stub) =>
    @stubs.push(stub)
    stub.register(this)

  send_request: (obj_id, name, args, cb) =>
    cb_id = @cnt++
    @cb_hash[cb_id] = cb? && cb || console.log
    rmi_args = { obj_id: obj_id, name: name, args: args, cb_id: cb_id }
    @server.send( JSON.stringify(rmi_args))

  handle_response: (msg) =>
    [cb_id, res] = JSON.parse(msg)
    @cb_hash[cb_id](res)
    delete @cb_hash[cb_id]


# RMI_Stub is a generic rmi client super class Using it involves
# extending it and calling the static (class) method 'remote_methods'
# with a list of the methods available on the remote object.  The
# resulting methods are just stubs which call the 'invoke' method
# (below) to contact the remote object server.
#
class WS_RMI_Stub

  @add_stub = (name) ->
    @::[name] = (args..., cb) ->
      @invoke(name, args, cb)

  constructor: (@id) ->

  log_cb: (err, res) ->
    console.log(res)

  register: (ws_rmi_client) =>
    @ws_rmi_client = ws_rmi_client

  invoke: (name, args, cb) =>
    cb = cb || ->
    @ws_rmi_client.send_request(@id, name, args, cb)

if window?
  window.ws_rmi =
    WS_RMI_Client: WS_RMI_Client
    WS_RMI_Stub: WS_RMI_Stub
else
  exports.WS_RMI_Client = WS_RMI_Client
  exports.WS_RMI_Stub = WS_RMI_Stub
#
# example_object.coffee


WS_RMI_Stub = WS_RMI_Stub || require('./ws_rmi_client.coffee').WS_RMI_Stub

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

  @add_stub('push')
  @add_stub('pop')

if window?
else
  exports.Stack = Stack
  exports.Stack_Stub = Stack_Stub


WS_RMI_Client = WS_RMI_Client || require('./ws_rmi_client.coffee').WS_RMI_Client
Stack_Stub = Stack_Stub || require('./example_object.coffee').Stack_Stub


class StackApp

  constructor: (@url = 'ws://localhost:8085') ->
    @client = new WS_RMI_Client(@url)
    @stack = new Stack_Stub('br549')
    @client.register(@stack)

  connect: =>
    @client.connect()

  disconnect: =>
    @client.disconnect()

  def_cb: (x) =>
    console.log([x])

  push: (x, cb = @def_cb) =>
    @stack.push(x, cb)

  pop: (cb = @def_cb) =>
    @stack.pop(cb)



if window?
  window.app = new StackApp('wss://armazilla.net/wss/rmi_example')
else
  exports.app = new StackApp('wss://armazilla.net/wss/rmi_example')