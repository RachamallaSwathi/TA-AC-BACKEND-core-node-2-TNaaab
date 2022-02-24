var http=require('http');
var fs=require('fs');
var qs=require('querystring');
var path=require('path');
var url=require('url');

let server=http.createServer(handleRequest);
function handleRequest(req,res){
    console.log(req.method,req.url);
    var parsedUrl=url.parse(req.url);
    var store='';
    
    req.on('data',(chunk)=>{

        store+=chunk;
    })
    req.on('end',()=>{
       if(req.method==='POST' && req.url==='/users'){
           let parsedData=qs.parse(store);
           console.log(parsedData);
           fs.open(`./users/${parsedData.username}.json`,'wx',(err,file)=>{
               if(err){
                   throw err;
                   
               }
               console.log('saved');
               fs.writeFile(`./users/${parsedData.username}.json`,JSON.stringify(parsedData),(err)=>{
                   if(err){
                       throw err;
                   }
                   console.log('written successfully');
                   fs.close(fs.openSync(`./users/${parsedData.username}.json`),(err)=>{
                       if(err){
                           throw err;
                       }
                       console.log(`${parsedData.username} created Successfully`);
                       res.end(`user created Successfully`);
                   })
               })
           })
          
       }else if(req.method==='GET' && parsedUrl.pathname==='/users'){
           let username=(parsedUrl.query).split('=').pop();
           console.log(username);
           fs.readFile(`./users/${username}.json`,(err,user)=>{
               res.end(user);
           })

       }else if(req.method==='DELETE' && parsedUrl.pathname==='/users'){
        let username=(parsedUrl.query).split('=').pop();
        console.log(username);
        fs.unlink(`./users/${username}.json`,(err,user)=>{
            res.end(`User Deleted Successfully`);
        })

    }else if(req.method==='PUT' && parsedUrl.pathname==='/users'){
        let parsedData=qs.parse(store);
        let username=(parsedUrl.query).split('=').pop();
        console.log(username);
        fs.open(`./users/${username}.json`,'r+',(err)=>{

            fs.ftruncate(fs.openSync(`./users/${username}.json`,'r+'),(err)=>{
                if(err){
                    throw err;
                }
                fs.writeFile(`./users/${username}.json`,JSON.stringify(parsedData),(err)=>{
                    if(err){
                        throw err;
                    }
                    fs.close(fs.openSync(`./users/${username}.json`),(err)=>{
                        if(err){
                            throw err;
                        }
                        res.end(`User updated Successfully`)
                    })
                })

            })
        })

    }else{
        res.end('Page not found');
    }
        
    })

}

server.listen(3000,()=>{
    console.log('Server is listening at port 3000');
})