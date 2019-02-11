'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Generated by CoffeeScript 2.3.2
(function () {
  //!/bin/env/ coffee

  // ws_rmi_server.coffee

  // WS_RMI_Server_Common contains code common to both
  // WS_RMI_Server and WSS_RMI_Server defined below

  var WSS_RMI_Server, WS_RMI_Server_Common, https;

  WS_RMI_Server_Common = require('./ws_rmi_server_common.coffee').WS_RMI_Server_Common;

  https = require('https');

  // WSS_RMI_Server is the secure version and requires
  // access to SSL credentials for the site.

  WSS_RMI_Server = function (_WS_RMI_Server_Common) {
    _inherits(WSS_RMI_Server, _WS_RMI_Server_Common);

    function WSS_RMI_Server(host, port, path, credentials) {
      _classCallCheck(this, WSS_RMI_Server);

      var webserver;
      webserver = https.createServer(null, credentials);

      var _this = _possibleConstructorReturn(this, (WSS_RMI_Server.__proto__ || Object.getPrototypeOf(WSS_RMI_Server)).call(this, webserver, host, port, path));

      _this.protocol = 'wss';
      return _this;
    }

    return WSS_RMI_Server;
  }(WS_RMI_Server_Common);

  exports.WSS_RMI_Server = WSS_RMI_Server;
}).call(undefined);

//# sourceURL=/home/carruth/git/ws_rmi/build/coffee/wss_rmi_server.coffee