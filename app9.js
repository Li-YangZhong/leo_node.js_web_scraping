const express = require('express');
const server = express();


server.listen(8213);

server.use('/getMsg', (req,res)=>{
    console.log(req.query);
    res.send({ok:1})
})

server.use(express.static('./'))