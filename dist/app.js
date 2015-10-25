"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _downloadManager = require("./download-manager");

var _downloadManager2 = _interopRequireDefault(_downloadManager);

var _koaRoute = require("koa-route");

var _koaRoute2 = _interopRequireDefault(_koaRoute);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaMount = require("koa-mount");

var _koaMount2 = _interopRequireDefault(_koaMount);

var app = (0, _koa2["default"])();
// app.experimental = true
var dest_path = "/tmp/remotedownload/";
try {
  _fs2["default"].mkdirSync(dest_path);
} catch (e) {
  console.log(e);
}
var downloadManager = new _downloadManager2["default"]({ "dest": dest_path });

// app.use(function *(){
//   this.body = 'Hello World';
// });

app.use(_koaRoute2["default"].get('/download/file', _regeneratorRuntime.mark(function callee$0$0() {
  var id;
  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (this.query.url) {
          id = downloadManager.add(this.query.url, this.query);

          this.body = id;
        } else {
          this.error('must have url');
        }

      case 1:
      case "end":
        return context$1$0.stop();
    }
  }, callee$0$0, this);
})));
app.use(_koaRoute2["default"].get('/remove/:id', _regeneratorRuntime.mark(function callee$0$0(id) {
  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (id == 'all') {
          this.body = downloadManager.remove();
        } else {
          this.body = downloadManager.remove(id);
        }

      case 1:
      case "end":
        return context$1$0.stop();
    }
  }, callee$0$0, this);
})));
app.use(_koaRoute2["default"].get('/status/:id', _regeneratorRuntime.mark(function callee$0$0(id) {
  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.body = downloadManager.status(id);

      case 1:
      case "end":
        return context$1$0.stop();
    }
  }, callee$0$0, this);
})));
app.use(_koaRoute2["default"].get('/status', _regeneratorRuntime.mark(function callee$0$0(id) {
  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.body = downloadManager.status();

      case 1:
      case "end":
        return context$1$0.stop();
    }
  }, callee$0$0, this);
})));

app.use((0, _koaMount2["default"])("/static", (0, _koaStatic2["default"])(dest_path)));

app.listen(3000);