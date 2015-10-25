import FastDownload from "fast-download"
import moment from "moment"
import shortid from "shortid32"
import path from "path"
import fs from "fs"
export default class DownloadManager{
  constructor(config){
    this.config = config
    this.tasks=[]
  }
  add(url,opt=null){ //return a id
    let id=shortid.generate()
    let filename = path.join(this.config.dest,opt.filename ? opt.filename : id)
    let info={id:id,url:url,filename:filename}
    let task = {id:id,info:info,opt:opt}
    let dl = new FastDownload(url,opt)
    task.dl = dl
    dl.on('start',(dl)=>{info.startTime=moment().unix();info.status="running"})
    dl.on('error',(e)=>{info.status='error';console.log(e)})
    dl.on('end',()=>{info.status='end'})
    dl.pipe(fs.createWriteStream(filename))
    this.tasks.push(task)
    // console.log(task.info)
    return id
  }
  refresh(task){
    let dl = task.dl
    task.info.percent = (dl.downloaded / dl.size * 100).toFixed() +'%'
    let time = moment().unix() - task.info.startTime
    task.info.average_speed =((dl.downloaded / time ) / 1024).toFixed() +'KB/s'
  }
  status(id){
    if (!id){
      return this.tasks.map((v)=>{return this.status(v.id)})
    }
    const task = this.filter(id)
    this.refresh(task)
    return task.info
  }
  filter(id){
    let tasks = this.tasks
    for(let i in tasks){
      let task = tasks[i]
      if (task.id == id){
        return task
      }
    }
  }
  getFile(id){
    const task = this.filter(id)
    return task.info.filename
  }
  remove(id){
    if(!id){
       return this.tasks.map((v)=>{return this.remove(v.id)})
    }
    const task = this.filter(id)
    task.dl.abort()
    fs.unlink(task.info.filename,()=>{
      task.info.status='removed'
    })
    return task.info

  }
}
