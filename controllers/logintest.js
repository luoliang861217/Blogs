/**
 * 登录控制器
 * Created by Asura on 2014/10/30.
 */

var util = require('util');
var base = require('./base');
function logintest(){
    base.call(this);
    util.inherits(logintest,base);
    this.showlogin = function(req,res){
        req.session.user = null;
        res.render('admin/login', {
            title: '登录' + title,
            layout:'admin/layout_login',
            success : req.flash("success").toString(),
            error: req.flash("error").toString()
        });
    }

    this.test = function(req,res){
        console.log("调用父类方法");
        this.talk('我开始说话了');
        res.render('admin/login', {
            title: '登录' ,
            layout:'admin/layout_login',
            success : req.flash("success").toString(),
            error: req.flash("error").toString()
        });
    }
}
module.exports = logintest;

