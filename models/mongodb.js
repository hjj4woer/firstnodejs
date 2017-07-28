var ACL = require('acl');
//数据库链接
var mongoose = require('mongoose');
var acl;


var dbconnection = mongoose.connect('mongodb://127.0.0.1:27017/first', function (err, db) {
    if(err)
    {
        console.log("数据库链接失败");
    }else {
        console.log("数据库链接成功");
    }
});