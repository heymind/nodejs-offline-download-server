"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fastDownload = require("fast-download");

var _fastDownload2 = _interopRequireDefault(_fastDownload);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _shortid32 = require("shortid32");

var _shortid322 = _interopRequireDefault(_shortid32);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var DownloadManager = (function () {
  function DownloadManager(config) {
    _classCallCheck(this, DownloadManager);

    this.config = config;
    this.tasks = [];
  }

  _createClass(DownloadManager, [{
    key: "add",
    value: function add(url) {
      var opt = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      //return a id
      var id = _shortid322["default"].generate();
      var filename = _path2["default"].join(this.config.dest, opt.filename ? opt.filename : id);
      var info = { id: id, url: url, filename: filename };
      var task = { id: id, info: info, opt: opt };
      var dl = new _fastDownload2["default"](url, opt);
      task.dl = dl;
      dl.on('start', function (dl) {
        info.startTime = (0, _moment2["default"])().unix();info.status = "running";
      });
      dl.on('error', function (e) {
        info.status = 'error';console.log(e);
      });
      dl.on('end', function () {
        info.status = 'end';
      });
      dl.pipe(_fs2["default"].createWriteStream(filename));
      this.tasks.push(task);
      // console.log(task.info)
      return id;
    }
  }, {
    key: "refresh",
    value: function refresh(task) {
      var dl = task.dl;
      task.info.percent = (dl.downloaded / dl.size * 100).toFixed() + '%';
      var time = (0, _moment2["default"])().unix() - task.info.startTime;
      task.info.average_speed = (dl.downloaded / time / 1024).toFixed() + 'KB/s';
    }
  }, {
    key: "status",
    value: function status(id) {
      var _this = this;

      if (!id) {
        return this.tasks.map(function (v) {
          return _this.status(v.id);
        });
      }
      var task = this.filter(id);
      this.refresh(task);
      return task.info;
    }
  }, {
    key: "filter",
    value: function filter(id) {
      var tasks = this.tasks;
      for (var i in tasks) {
        var task = tasks[i];
        if (task.id == id) {
          return task;
        }
      }
    }
  }, {
    key: "getFile",
    value: function getFile(id) {
      var task = this.filter(id);
      return task.info.filename;
    }
  }, {
    key: "remove",
    value: function remove(id) {
      var _this2 = this;

      if (!id) {
        return this.tasks.map(function (v) {
          return _this2.remove(v.id);
        });
      }
      var task = this.filter(id);
      task.dl.abort();
      _fs2["default"].unlink(task.info.filename, function () {
        task.info.status = 'removed';
      });
      return task.info;
    }
  }]);

  return DownloadManager;
})();

exports["default"] = DownloadManager;
module.exports = exports["default"];