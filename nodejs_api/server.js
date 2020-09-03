const http=require('http')
const app=require('./app')
const port=process.env.PORT || 8000
const server=http.createServer(app)


server.listen(port,function(data,err){
    console.log("server.listen in port"+data)
})