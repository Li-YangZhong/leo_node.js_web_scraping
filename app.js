const http = require('http');
http.createServer((request,response)=>{
    response.write('asdfe');
    response.end();
}).listen(9000)