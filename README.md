# nodejs-offline-download-server

## install&run

```
npm run build
npm run start
```
It will use `/tmp/remotedownload/` as a temp dir.

## usage

### request downloading a file
```
GET : http://website/download/file?url=<file-link>
```


### checking status

```
GET : http://website/status ->> will show all
```
or
```
GET : http://website/status/:id
```

### downloading it

```
GET : http://website/static/<filename or id>
```

### remove files
```
GET : http://website/remove/id
```
or
```
GET : http://website/remove/all
```
