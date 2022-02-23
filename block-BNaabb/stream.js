// - add a listener on port 3456
// - send text data from postman using `POST` request on `/` route.
// - add `data` and `end` event on request to capture data
// - capture the data sent from postman on server side
// - send captured data in response using `res.write`

var http=require('http');
let server=http.createServer(handleRequest);

function handleRequest(req,res){
    var store='';
    req.on('data',(chunk)=>{
        store=store+chunk;

    })
    req.on('end',()=>{
        console.log(`in end ${store}`);
        if(req.method==='POST' && req.url==='/'){
            res.writeHead(200,{'Content-Type':'text/plain'})
            console.log(`In Store:${store}`);
            res.write(store);
            res.end();
        }

    })


  

}
server.listen(3456,()=>{
    console.log('Server is listening at port 3456');
})