var index = 0;
const fs = require('fs');
const url = require('url');
const gbk = require('gbk');

GetUrl('https://detail.tmall.com/item.htm?spm=a230r.1.14.37.1e5f4241bjk5Xf&id=609353516840&ns=1&abbucket=3&sku_properties=10004:1162302684;5919063:6536025', (data) => {

    var html = gbk.toString('utf-8', data);
    console.log(html)
    // console.log('终于走出来了');
    // fs.writeFile('iphone.html', data, function (err, written, buffer) { });
    // console.log(str)
})
function GetUrl(sUrl, success) {
    index++;
    var urlObj = url.parse(sUrl);
    var http = '';
    if (urlObj.protocol == 'http:') {
        http = require('http');
    }
    else {
        http = require('https');
    }

    let req = http.request({
        'hostname': urlObj.hostname,
        'path': urlObj.path
    }, res => {
        if (res.statusCode == 200) {
            var arr = [];
            var str = '';
            res.on('data', buffer => {
                arr.push(buffer);
                // str += buffer;
            });
            res.on('end', () => {
                let b = Buffer.concat(arr);
                success && success(b);

            })
        }

        else if (res.statusCode == 302|| res.statusCode == 301) {
            console.log(`我是第${index}此重定向`, res.headers.location);
            GetUrl(res.headers.location, success);
        }

        // console.log(res.statusCode, res.headers.location)



    });

    req.end();
    req.on('error', () => {
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