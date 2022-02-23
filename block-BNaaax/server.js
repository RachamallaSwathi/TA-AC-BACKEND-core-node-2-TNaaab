// 1. console.log(\_\_dirname);
// 2. console.log(\_\_filename);
// 3. use path module to join `__dirname` and `server.js`
console.log(__dirname);
console.log(__filename);
var path=require('path');
let modulePath=path.join(__dirname,'server.js');
console.log(modulePath);