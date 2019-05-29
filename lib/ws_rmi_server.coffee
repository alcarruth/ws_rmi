#!/bin/env/ coffee
#
# ws_rmi_server_common
#

WebSocket = require('ws')
http = require('http')
https = require('https')

log = (msg) ->
  console.log(msg)

# WS_RMI_Server_Common contains code common to both
# WS_RMI_Server and WSS_RMI_Server defined below
#
class WS_RMI_Server_Common

  constructor: (@server, @host, @port, @path) ->
    @registry = {}
    @clients = []
    @wss = new WebSocket.Server(server: @server)
    @wss.on('connection', (client) =>
      client.on('message', (msg) =>
        @handle_request(msg, client))
      client.on('close', =>
        log("client disconnected: #{client._socket.server._connectionKey}"))
      @clients.push(client)
      log("client added: #{client._socket.server._connectionKey}"))

  # start the server
  #
  start: =>
    try
      @server.listen(@port, @host)
      log("server listening at url: #{@protocol}://#{@host}:#{@port}")
    catch error
     console.log error

  # register an object for remote method invocation by the
  # handle_request method (below)
  #
  register: (obj) =>
    @registry[obj.id] = obj
    log("registering #{obj.id}")
    log(@registry)

  # parse the request, use the obj_id to look up the
  # corresponding object and invoke the method on the
  # supplied arguments
  #
  handle_request: (msg, client) =>
    msg_obj = JSON.parse(msg)
    #console.log msg_obj
    { obj_id, name, args, cb_id } = msg_obj

    # args is a list - a splat from the original
    # client side invocation, so we need to "de-splat"
    # here.

    args.push( (res) =>
      client.send(JSON.stringify( [cb_id, res])))

    @registry[obj_id][name].apply(null, args)



# WS_RMI_Server is the insecure version and can be run without root
# access since it does not require access to the SSL credentials
#
class WS_RMI_Server extends WS_RMI_Server_Common
  constructor: (host, port, path) ->
    webserver = http.createServer(null)
    super(webserver, host, port, path)
    @protocol = 'ws'




# WSS_RMI_Server is the secure version and requires
# access to SSL credentials for the site.
#
class WSS_RMI_Server extends WS_RMI_Server_Common
  constructor: (host, port, path, credentials) ->
    webserver = https.createServer(null, credentials)
    super(webserver, host, port, path)
    @protocol = 'wss'



exports.WS_RMI_Server = WS_RMI_Server
exports.WSS_RMI_Server = WSS_RMI_Server