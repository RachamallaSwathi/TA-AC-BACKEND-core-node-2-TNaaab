// 1. Create a basic server `data.js`

// - add a listener on port 7000
// - send different types of data from postman and check `req.headers` for `content-type` after creating below server
// - send json data from postman using `POST` request on `/json` and parse it into the server.
// - send form data from postman using `POST` request on `/form` and parse it into the server.
// - send in response the entire data received by server.

var http=require('http');
var qs=require('querystring');
let server=http.createServer(handleRequest);
function handleRequest(req,res){
    var store='';
    var dataFormat=req.headers['content-type'];
    req.on('data',(chunk)=>{
        store+=chunk;
    })
    req.on('end',()=>{
        if(dataFormat==='application/json'){
            let parsedData=JSON.parse(store);
            res.end(store);
        }else if(dataFormat==='application/x-www-form-urlencoded'){
            let parsedData=qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })

}
server.listen(7000,()=>{
    console.log('Server is listening at port 7000');
})