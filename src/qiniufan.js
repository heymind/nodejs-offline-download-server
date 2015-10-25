import qiniu from "qiniu"

qiniu.conf.ACCESS_KEY = '5r9GJPtblhzv5vEJY1gmuYcTnqZG3e73SAJc5WXF'
qiniu.conf.SECRET_KEY = 'O5r1w0VUCMhtFk7_PApjrPTeHPsrzFIXVhtAtv8U'
const putPolicy = new qiniu.rs.PutPolicy('test')
const uptoken = putPolicy.token()
const extra = new qiniu.io.PutExtra()
const key=null
const localFile="/tmp/QKM7VRPZJ"
qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
    if(!err) {
      // 上传成功， 处理返回值
      console.log(ret.key, ret.hash);
      // ret.key & ret.hash
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
      // http://developer.qiniu.com/docs/v6/api/reference/codes.html
    }
  });
