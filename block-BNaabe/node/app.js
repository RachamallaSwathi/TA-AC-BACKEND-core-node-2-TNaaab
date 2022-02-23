// Q. Create a server using http
// - handle post method on '/' route
// - send json data on it from postman

// ```js
// // data format is
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// ```
// - capture data from request on server side using data and end event on request object
// - when end event fires, send entire captured data in response with status code 201.

// var http=require('http');
// let server=http.createServer(handleRequest);
// function handleRequest(req,res){
//     var store='';
//     var dataFormat=req.headers['content-type'];
//     req.on('data',(chunk)=>{
//         store+=chunk;
//     })
//     req.on('end',()=>{
//         if(req.method==='POST' && req.url==='/' && dataFormat==='application/json'){
//             res.writeHeader(201,{'content-type':'application/json'});
//             res.end(store);
//         }else if(req.method==='POST' && req.url==='/' && dataFormat==='application/x-www-form-urlencoded'){
//             res.end(JSON.stringify(store));
//         }
//     })

// }
// server.listen(1000,()=>{
//     console.log('server listening at port 1000');
// })

// Q. Create server which can handle both json/form data without specifying which format of data is being received.
// - add listener on port 9000
// - use `data/end` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form 
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin
var http=require('http');
var fs=require('querystring');
let server=http.createServer(handleRequest);
function handleRequest(req,res){
    var store='';
    var dataFormat=req.headers['content-type'];
    req.on('data',(chunk)=>{
        store+=chunk;
    })
    req.on('end',()=>{
        if(req.method==='POST' && req.url==='/' && dataFormat==='application/json'){
            res.writeHeader(201,{'content-type':'application/json'});
            res.end(store);
        }else if(req.method==='POST' && req.url==='/' && dataFormat==='application/x-www-form-urlencoded'){
            var parsedData=fs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })

}
server.listen(9000,()=>{
    console.log('server listening at port 9000');
})