// - create file.js
// - create readme.txt
// - create a server in `file.js`
// - Use createReadStream method in file.js to read a file(readme.txt) and send data to response one chunk at a time.
var http=require('http');
var fs=require('fs');
var server=http.createServer(handleRequest);
function handleRequest(req,res){
    fs.createReadStream('./readme.txt', ).pipe(res);

}
server.listen(2000,()=>{
    console.log('Server is listening at 2000 port');
})