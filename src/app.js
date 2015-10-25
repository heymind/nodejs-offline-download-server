import koa from "koa"
import DownloadManager from "./download-manager"
import route from "koa-route"
import fs from "fs"
import staticfile from "koa-static"
import mount from "koa-mount"
let app = koa()
// app.experimental = true
let dest_path="/tmp/remotedownload/"
try{
  fs.mkdirSync(dest_path)
}catch(e){console.log(e)}
let downloadManager =new DownloadManager({"dest":dest_path})

// app.use(function *(){
//   this.body = 'Hello World';
// });

app.use(route.get('/download/file',function* (){
  if (this.query.url){
    const id = downloadManager.add(this.query.url,this.query)
    this.body = id
  } else {
    this.error('must have url')
  }
}))
app.use(route.get('/remove/:id',function* (id){
  if(id=='all'){
    this.body=downloadManager.remove()
  }else{
    this.body=downloadManager.remove(id)
  }
}))
app.use(route.get('/status/:id',function* (id){
    this.body = downloadManager.status(id)
}))
app.use(route.get('/status',function* (id){
    this.body = downloadManager.status()
}))

app.use(mount("/static",staticfile(dest_path)))



app.listen(process.env.PORT || '3000');
