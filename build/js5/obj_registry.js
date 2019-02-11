'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.3.2
(function () {
  var Arithmetic, Local_Registry, Remote_Registry, arith, arith_stub, registry;

  Remote_Registry = function () {
    function Remote_Registry() {
      _classCallCheck(this, Remote_Registry);

      this.register = this.register.bind(this);
      this.invoke = this.invoke.bind(this);
      this.stub = this.stub.bind(this);
      this.stub_method = this.stub_method.bind(this);
      this.registry = {};
    }

    _createClass(Remote_Registry, [{
      key: 'register',
      value: function register(obj) {
        return this.registry[obj.id] = obj;
      }
    }, {
      key: 'invoke',
      value: function invoke(obj_id, method, args) {
        console.log(obj_id);
        console.log(method);
        console.log(args);
        return this.registry[obj_id][method](args);
      }
    }, {
      key: 'stub',
      value: function stub(obj_id, method_names) {
        var i, len, method, stub_obj;
        stub_obj = {};
        for (i = 0, len = method_names.length; i < len; i++) {
          method = method_names[i];
          stub_obj[method] = this.stub_method(obj_id, method);
        }
        return stub_obj;
      }
    }, {
      key: 'stub_method',
      value: function stub_method(obj_id, method) {
        var _this = this;

        return function (args) {
          return _this.invoke(obj_id, method, args);
        };
      }
    }]);

    return Remote_Registry;
  }();

  Local_Registry = function () {
    function Local_Registry(remote) {
      _classCallCheck(this, Local_Registry);

      this.register = this.register.bind(this);
      this.invoke = this.invoke.bind(this);
      this.stub = this.stub.bind(this);
      this.stub_method = this.stub_method.bind(this);
      this.remote = remote;
      this.registry = {};
    }

    _createClass(Local_Registry, [{
      key: 'register',
      value: function register(obj) {
        return this.registry[obj.id] = obj;
      }
    }, {
      key: 'invoke',
      value: function invoke(obj_id, method, args) {
        console.log(obj_id);
        console.log(method);
        console.log(args);
        return this.registry[obj_id][method](args);
      }
    }, {
      key: 'stub',
      value: function stub(obj_id, method_names) {
        var i, len, method, stub_obj;
        stub_obj = {};
        for (i = 0, len = method_names.length; i < len; i++) {
          method = method_names[i];
          stub_obj[method] = this.stub_method(obj_id, method);
        }
        return stub_obj;
      }
    }, {
      key: 'stub_method',
      value: function stub_method(obj_id, method) {
        var _this2 = this;

        return function (args) {
          return _this2.invoke(obj_id, method, args);
        };
      }
    }]);

    return Local_Registry;
  }();

  Arithmetic = function () {
    function Arithmetic(id) {
      _classCallCheck(this, Arithmetic);

      this.add = this.add.bind(this);
      this.sub = this.sub.bind(this);
      this.mul = this.mul.bind(this);
      this.div = this.div.bind(this);
      this.mod = this.mod.bind(this);
      this.abs = this.abs.bind(this);
      this.id = id;
    }

    _createClass(Arithmetic, [{
      key: 'add',
      value: function add(a) {
        return a.x + a.y;
      }
    }, {
      key: 'sub',
      value: function sub(a) {
        return a.x - a.y;
      }
    }, {
      key: 'mul',
      value: function mul(a) {
        return a.x * a.y;
      }
    }, {
      key: 'div',
      value: function div(a) {
        return a.x / a.y;
      }
    }, {
      key: 'mod',
      value: function mod(a) {
        return a.x % a.y;
      }
    }, {
      key: 'abs',
      value: function abs(a) {
        return a.x > 0 && a.x || -a.x;
      }
    }]);

    return Arithmetic;
  }();

  arith = new Arithmetic('asdf');

  registry = new Obj_Registry();

  registry.register(arith);

  arith_stub = registry.stub('asdf', ['add', 'sub', 'mul', 'div', 'mod', 'abs']);

  exports.arith = arith;

  exports.registry = registry;

  exports.arith_stub = arith_stub;
}).call(undefined);

//# sourceURL=/home/carruth/git/ws_rmi/build/coffee/obj_registry.coffee