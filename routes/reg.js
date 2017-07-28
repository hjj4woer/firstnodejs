var express = require('express'); // 调用express模块
var router = express.Router();  // 调用模块的Router方法
var User = require('../models/user');   // 调用刚才封装好的user类
var crypto = require("crypto");

router.get('/', function (req, res, next) {
    res.render('reg', {title: "注册"});
});

router.post('/', function (req, res ,next) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password, 'utf-8').digest('base64');
    var us = User.find({'name': req.body.name});
    console.log(req.body.name);
    us.exec(function (err, user) {
        if (user.length != 0){
            console.log(user)
            return res.render('reg', {title: "username exists."});
        }else {
            new User({
                name: req.body.name,
                password: password}).save(function (err,small,numAffected) { //small为保存后的文档，numAffected为影响的行数
                if (err) {
                    console.log(err);
                }else {
                    req.session.success = "注册成功！";  //添加session的注册成功信息
                    return res.render('reg', {  //发送一个对象，属性为success，值为/
                        title: "chenggong."
                    });
                }
            });
        }
    });

});
        /*
        .save(function (err, row) {
        if (err) {
            console.log(err);
        } })*//*
    us.exec(function (err, user) {
        if (user.length != 0) {
            return res.send({
                err: "username already exists."
            });
        }else {

        }})
        if (err) {
            console.log(err);
            return res.send({error: err});
        }
});*/
module.exports = router;