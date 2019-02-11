// Generated by CoffeeScript 2.3.2
(function() {
  //!/bin/env/ coffee

  // ws_rmi_client.coffee

  var WS_RMI_Client, WS_RMI_Stub, WebSocket, log,
    splice = [].splice;

  WebSocket = (typeof window !== "undefined" && window !== null ? window.WebSocket : void 0) || require('ws');

  log = function(msg) {
    return console.log(msg);
  };

  WS_RMI_Client = class WS_RMI_Client {
    constructor(url1) {
      this.connect = this.connect.bind(this);
      this.onOpen = this.onOpen.bind(this);
      this.onMessage = this.onMessage.bind(this);
      this.onClose = this.onClose.bind(this);
      this.onError = this.onError.bind(this);
      this.disconnect = this.disconnect.bind(this);
      this.register = this.register.bind(this);
      this.send_request = this.send_request.bind(this);
      this.handle_response = this.handle_response.bind(this);
      this.url = url1;
      this.registry = {};
      this.cnt = 0;
      this.cb_hash = {};
      this.stubs = [];
    }

    connect(url) {
      if (url) {
        this.url = url;
      }
      this.server = new WebSocket(this.url);
      this.server.onopen = this.onOpen;
      this.server.onmessage = this.onMessage;
      this.server.onclose = this.onClose;
      this.server.onerror = this.onError;
      return true;
    }

    onOpen(evt) {
      return log(`connected to rmi server at ${this.url}`);
    }

    onMessage(evt) {
      return this.handle_response(evt.data);
    }

    onClose(evt) {
      return log(`socket closed by server at ${this.url}`);
    }

    onError(evt) {}

    disconnect() {
      log(`disconnecting from server at ${this.url}`);
      return this.server.close();
    }

    register(stub) {
      this.stubs.push(stub);
      return stub.register(this);
    }

    send_request(obj_id, name, args, cb) {
      var cb_id, rmi_args;
      cb_id = this.cnt++;
      this.cb_hash[cb_id] = (cb != null) && cb || console.log;
      rmi_args = {
        obj_id: obj_id,
        name: name,
        args: args,
        cb_id: cb_id
      };
      return this.server.send(JSON.stringify(rmi_args));
    }

    handle_response(msg) {
      var cb_id, res;
      [cb_id, res] = JSON.parse(msg);
      this.cb_hash[cb_id](res);
      return delete this.cb_hash[cb_id];
    }

  };

  // RMI_Stub is a generic rmi client super class Using it involves
  // extending it and calling the static (class) method 'remote_methods'
  // with a list of the methods available on the remote object.  The
  // resulting methods are just stubs which call the 'invoke' method
  // (below) to contact the remote object server.

  WS_RMI_Stub = class WS_RMI_Stub {
    static add_stub(name) {
      return this.prototype[name] = function(...args) {
        var cb, ref;
        ref = args, [...args] = ref, [cb] = splice.call(args, -1);
        return this.invoke(name, args, cb);
      };
    }

    constructor(id) {
      this.register = this.register.bind(this);
      this.invoke = this.invoke.bind(this);
      this.id = id;
    }

    log_cb(err, res) {
      return console.log(res);
    }

    register(ws_rmi_client) {
      return this.ws_rmi_client = ws_rmi_client;
    }

    invoke(name, args, cb) {
      cb = cb || function() {};
      return this.ws_rmi_client.send_request(this.id, name, args, cb);
    }

  };

  if (typeof window !== "undefined" && window !== null) {
    window.ws_rmi = {
      WS_RMI_Client: WS_RMI_Client,
      WS_RMI_Stub: WS_RMI_Stub
    };
  } else {
    exports.WS_RMI_Client = WS_RMI_Client;
    exports.WS_RMI_Stub = WS_RMI_Stub;
  }

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3Nfcm1pX2NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLiIsInNvdXJjZXMiOlsiYnVpbGQvY29mZmVlL3dzX3JtaV9jbGllbnQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtFQUFBOzs7O0FBQUEsTUFBQSxhQUFBLEVBQUEsV0FBQSxFQUFBLFNBQUEsRUFBQSxHQUFBO0lBQUE7O0VBS0EsU0FBQSx1REFBWSxNQUFNLENBQUUsbUJBQVIsSUFBcUIsT0FBQSxDQUFRLElBQVI7O0VBRWpDLEdBQUEsR0FBTSxRQUFBLENBQUMsR0FBRCxDQUFBO1dBQ0osT0FBTyxDQUFDLEdBQVIsQ0FBWSxHQUFaO0VBREk7O0VBR0EsZ0JBQU4sTUFBQSxjQUFBO0lBRUUsV0FBYSxLQUFBLENBQUE7VUFNYixDQUFBLGNBQUEsQ0FBQTtVQVNBLENBQUEsYUFBQSxDQUFBO1VBR0EsQ0FBQSxnQkFBQSxDQUFBO1VBR0EsQ0FBQSxjQUFBLENBQUE7VUFHQSxDQUFBLGNBQUEsQ0FBQTtVQUVBLENBQUEsaUJBQUEsQ0FBQTtVQUlBLENBQUEsZUFBQSxDQUFBO1VBSUEsQ0FBQSxtQkFBQSxDQUFBO1VBTUEsQ0FBQSxzQkFBQSxDQUFBO01BeENjLElBQUMsQ0FBQTtNQUNiLElBQUMsQ0FBQSxRQUFELEdBQVksQ0FBQTtNQUNaLElBQUMsQ0FBQSxHQUFELEdBQU87TUFDUCxJQUFDLENBQUEsT0FBRCxHQUFXLENBQUE7TUFDWCxJQUFDLENBQUEsS0FBRCxHQUFTO0lBSkU7O0lBTWIsT0FBUyxDQUFDLEdBQUQsQ0FBQTtNQUNQLElBQWMsR0FBZDtRQUFBLElBQUMsQ0FBQSxHQUFELEdBQU8sSUFBUDs7TUFDQSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksU0FBSixDQUFjLElBQUMsQ0FBQSxHQUFmO01BQ1YsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLEdBQWlCLElBQUMsQ0FBQTtNQUNsQixJQUFDLENBQUEsTUFBTSxDQUFDLFNBQVIsR0FBb0IsSUFBQyxDQUFBO01B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RyxnREFBSDtJQUNFLE1BQU0sQ0FBQyxNQUFQLEdBQ0U7TUFBQSxhQUFBLEVBQWUsYUFBZjtNQUNBLFdBQUEsRUFBYTtJQURiLEVBRko7R0FBQSxNQUFBO0lBS0UsT0FBTyxDQUFDLGFBQVIsR0FBd0I7SUFDeEIsT0FBTyxDQUFDLFdBQVIsR0FBc0IsWUFOeEI7O0FBbEZBIiwic291cmNlc0NvbnRlbnQiOlsiIyEvYmluL2Vudi8gY29mZmVlXG4jXG4jIHdzX3JtaV9jbGllbnQuY29mZmVlXG4jXG5cbldlYlNvY2tldCA9IHdpbmRvdz8uV2ViU29ja2V0IHx8IHJlcXVpcmUoJ3dzJylcblxubG9nID0gKG1zZykgLT5cbiAgY29uc29sZS5sb2cobXNnKVxuXG5jbGFzcyBXU19STUlfQ2xpZW50XG5cbiAgY29uc3RydWN0b3I6IChAdXJsKSAtPlxuICAgIEByZWdpc3RyeSA9IHt9XG4gICAgQGNudCA9IDBcbiAgICBAY2JfaGFzaCA9IHt9XG4gICAgQHN0dWJzID0gW11cblxuICBjb25uZWN0OiAodXJsKSA9PlxuICAgIEB1cmwgPSB1cmwgaWYgdXJsXG4gICAgQHNlcnZlciA9IG5ldyBXZWJTb2NrZXQoQHVybClcbiAgICBAc2VydmVyLm9ub3BlbiA9IEBvbk9wZW5cbiAgICBAc2VydmVyLm9ubWVzc2FnZSA9IEBvbk1lc3NhZ2VcbiAgICBAc2VydmVyLm9uY2xvc2UgPSBAb25DbG9zZVxuICAgIEBzZXJ2ZXIub25lcnJvciA9IEBvbkVycm9yXG4gICAgdHJ1ZVxuXG4gIG9uT3BlbjogKGV2dCkgPT5cbiAgICBsb2coXCJjb25uZWN0ZWQgdG8gcm1pIHNlcnZlciBhdCAje0B1cmx9XCIpXG5cbiAgb25NZXNzYWdlOiAoZXZ0KSA9PlxuICAgIEBoYW5kbGVfcmVzcG9uc2UoZXZ0LmRhdGEpXG5cbiAgb25DbG9zZTogKGV2dCkgPT5cbiAgICBsb2coXCJzb2NrZXQgY2xvc2VkIGJ5IHNlcnZlciBhdCAje0B1cmx9XCIpXG5cbiAgb25FcnJvcjogKGV2dCkgPT5cblxuICBkaXNjb25uZWN0OiA9PlxuICAgIGxvZyhcImRpc2Nvbm5lY3RpbmcgZnJvbSBzZXJ2ZXIgYXQgI3tAdXJsfVwiKVxuICAgIEBzZXJ2ZXIuY2xvc2UoKVxuXG4gIHJlZ2lzdGVyOiAoc3R1YikgPT5cbiAgICBAc3R1YnMucHVzaChzdHViKVxuICAgIHN0dWIucmVnaXN0ZXIodGhpcylcblxuICBzZW5kX3JlcXVlc3Q6IChvYmpfaWQsIG5hbWUsIGFyZ3MsIGNiKSA9PlxuICAgIGNiX2lkID0gQGNudCsrXG4gICAgQGNiX2hhc2hbY2JfaWRdID0gY2I/ICYmIGNiIHx8IGNvbnNvbGUubG9nXG4gICAgcm1pX2FyZ3MgPSB7IG9ial9pZDogb2JqX2lkLCBuYW1lOiBuYW1lLCBhcmdzOiBhcmdzLCBjYl9pZDogY2JfaWQgfVxuICAgIEBzZXJ2ZXIuc2VuZCggSlNPTi5zdHJpbmdpZnkocm1pX2FyZ3MpKVxuXG4gIGhhbmRsZV9yZXNwb25zZTogKG1zZykgPT5cbiAgICBbY2JfaWQsIHJlc10gPSBKU09OLnBhcnNlKG1zZylcbiAgICBAY2JfaGFzaFtjYl9pZF0ocmVzKVxuICAgIGRlbGV0ZSBAY2JfaGFzaFtjYl9pZF1cblxuXG4jIFJNSV9TdHViIGlzIGEgZ2VuZXJpYyBybWkgY2xpZW50IHN1cGVyIGNsYXNzIFVzaW5nIGl0IGludm9sdmVzXG4jIGV4dGVuZGluZyBpdCBhbmQgY2FsbGluZyB0aGUgc3RhdGljIChjbGFzcykgbWV0aG9kICdyZW1vdGVfbWV0aG9kcydcbiMgd2l0aCBhIGxpc3Qgb2YgdGhlIG1ldGhvZHMgYXZhaWxhYmxlIG9uIHRoZSByZW1vdGUgb2JqZWN0LiAgVGhlXG4jIHJlc3VsdGluZyBtZXRob2RzIGFyZSBqdXN0IHN0dWJzIHdoaWNoIGNhbGwgdGhlICdpbnZva2UnIG1ldGhvZFxuIyAoYmVsb3cpIHRvIGNvbnRhY3QgdGhlIHJlbW90ZSBvYmplY3Qgc2VydmVyLlxuI1xuY2xhc3MgV1NfUk1JX1N0dWJcblxuICBAYWRkX3N0dWIgPSAobmFtZSkgLT5cbiAgICBAOjpbbmFtZV0gPSAoYXJncy4uLiwgY2IpIC0+XG4gICAgICBAaW52b2tlKG5hbWUsIGFyZ3MsIGNiKVxuXG4gIGNvbnN0cnVjdG9yOiAoQGlkKSAtPlxuXG4gIGxvZ19jYjogKGVyciwgcmVzKSAtPlxuICAgIGNvbnNvbGUubG9nKHJlcylcblxuICByZWdpc3RlcjogKHdzX3JtaV9jbGllbnQpID0+XG4gICAgQHdzX3JtaV9jbGllbnQgPSB3c19ybWlfY2xpZW50XG5cbiAgaW52b2tlOiAobmFtZSwgYXJncywgY2IpID0+XG4gICAgY2IgPSBjYiB8fCAtPlxuICAgIEB3c19ybWlfY2xpZW50LnNlbmRfcmVxdWVzdChAaWQsIG5hbWUsIGFyZ3MsIGNiKVxuXG5pZiB3aW5kb3c/XG4gIHdpbmRvdy53c19ybWkgPVxuICAgIFdTX1JNSV9DbGllbnQ6IFdTX1JNSV9DbGllbnRcbiAgICBXU19STUlfU3R1YjogV1NfUk1JX1N0dWJcbmVsc2VcbiAgZXhwb3J0cy5XU19STUlfQ2xpZW50ID0gV1NfUk1JX0NsaWVudFxuICBleHBvcnRzLldTX1JNSV9TdHViID0gV1NfUk1JX1N0dWJcbiJdfQ==
//# sourceURL=/home/carruth/git/ws_rmi/build/coffee/ws_rmi_client.coffee