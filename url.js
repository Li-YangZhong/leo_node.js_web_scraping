const url = require('url');
var str = 'http://static.nodejs.cn/_static/img/logo.svg';

var urlObj = url.parse(str);
console.log(urlObj)