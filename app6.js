var index = 0;
const fs = require('fs');
const url = require('url');
const gbk = require('gbk');
const JSDOM = require('jsdom').JSDOM;

GetUrl('https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.9.6aa1766aUGAl6q&id=603378475878&skuId=4291680540368&standard=1&user_id=263726286&cat_id=2&is_b=1&rn=f52c586f09904e2fe4808a9125b69333', (data) => {

    var html = gbk.toString('utf-8', data);
    // console.log(html)

    let DOM = new JSDOM(html);
    let document = DOM.window.document;
    console.log(document.querySelector('.tm-count').innerHTML);
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