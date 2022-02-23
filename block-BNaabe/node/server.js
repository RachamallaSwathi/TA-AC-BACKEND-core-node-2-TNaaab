// Write code to 
// - capture absolute path of `server.js`(itself)
// - get absolute path of `app.js`
// - get realtive path of `index.html`
// - get absolute path of `index.html` using `path module` 
var path=require('path');
console.log(__filename);
console.log(path.join(__dirname,'app.js'));
console.log('./index.html');
console.log(path.join(__dirname,'index.html'));

// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>



// Q. Follow above question with form data containing fields i.e name and email. 
// - Parse form-data using `querystring` module
// - respond with HTML page containing only email from data in H2 tag.
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
            res.writeHeader(201,{'content-type':'text/html'});
            console.log(JSON.parse(store))
            let obj=JSON.parse(store);

            res.end(`<h1>${obj.name}</h1><h2>${obj.email}</h2>`);
        }else if(req.method==='POST' && req.url==='/' && dataFormat==='application/x-www-form-urlencoded'){
          let parsedData=fs.parse(store);
          console.log(parsedData);
        
          res.writeHeader(201,{'content-type':'text/html'});
          res.end(`<h2>${parsedData.email}</h2>`);

        }
    })

}
server.listen(1000,()=>{
    console.log('server listening at port 1000');
})