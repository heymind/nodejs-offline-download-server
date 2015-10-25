'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _qiniu = require("qiniu");

var _qiniu2 = _interopRequireDefault(_qiniu);

_qiniu2['default'].conf.ACCESS_KEY = '5r9GJPtblhzv5vEJY1gmuYcTnqZG3e73SAJc5WXF';
_qiniu2['default'].conf.SECRET_KEY = 'O5r1w0VUCMhtFk7_PApjrPTeHPsrzFIXVhtAtv8U';
var putPolicy = new _qiniu2['default'].rs.PutPolicy('test');
var uptoken = putPolicy.token();
var extra = new _qiniu2['default'].io.PutExtra();
var key = null;
var localFile = "/tmp/QKM7VRPZJ";
_qiniu2['default'].io.putFile(uptoken, key, localFile, extra, function (err, ret) {
  if (!err) {
    // 上传成功， 处理返回值
    console.log(ret.key, ret.hash);
    // ret.key & ret.hash
  } else {
      // 上传失败， 处理返回代码
      console.log(err);
      // http://developer.qiniu.com/docs/v6/api/reference/codes.html
    }
});