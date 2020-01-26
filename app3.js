
const fs = require('fs');
const url = require('url');

GetUrl('https://cn.bing.com/th?id=OHR.SouthernGate_EN-CN5746299507_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp', data=>{
    // fs.writeFile('23131.jpg', data, function(err, written, buffer) {});
})
function GetUrl(sUrl, success) {
    var urlObj = url.parse(sUrl);
    var http = '';
    if(urlObj.protocol == 'http:'){
        http = require('http');
    }
    else {
        http = require('https');
    }

    let req = http.request({
        'hostname': urlObj.hostname,
        'path': urlObj.path
    }, res=>{
        console.log(res)
        
        var arr = [];
        res.on('data', buffer=>{
            arr.push(buffer);
        });
        res.on('end', ()=>{
            let b = Buffer.concat(arr);
            success && success(b);

        })
        
    });

    req.end();
    req.on('error', ()=>{
        console.log('404了， 哥们');
    })
}

/*
let req = http.request({
    'hostname': 'cn.bing.com',  // the protocol http:// shouldn't be included in the host field.
    'path': '/th?id=OHR.SouthernGate_EN-CN5746299507_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
}, res => {
    var arr = [];
    var str = ''
    res.on('data', buffer => {
        arr.push(buffer)
        str += buffer
    });

    res.on('end', () => {
        let b = Buffer.concat(arr)


        fs.writeFile('asdakd.jpg',b, ()=>{
            console.log('成功了，抓取成功')
        } );
        // fs.writeFile('download.html',arr,'utf8',function(err, written, buffer) {} );
        });
    // console.log(arr, str)

});
    // console.log(res)
    // console.log(1)

req.end();
*/