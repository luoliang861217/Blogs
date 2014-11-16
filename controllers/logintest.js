/**
 * 登录控制器
 * Created by Asura on 2014/10/30.
 */

var util = require('util');
var basecontroller = require('./basecontroller');
var settings = require('../settings');
var userRepository = require('../Repository/userRepository');
var log = require('../common/log');

//自定义变量
var blogtitle = settings.blogtitle;
var blogdescription = settings.blogdescription;
var title = ' - '+ settings.blogtitle;

function logintest(){
    basecontroller.call(this);
    util.inherits(logintest,basecontroller);
    /**
     * 显示登陆页面
     * @param req
     * @param res
     */
//    this.showlogin = function(req,res){
//        req.session.user = null;
//        res.render('admin/login', {
//            title: '登录' + title,
//            layout:'admin/layout_login',
//            success : req.flash("success").toString(),
//            error: req.flash("error").toString()
//        });
//    }
    /**
     * 登录逻辑
     * @param req
     * @param res
     */
//    this.dologin = function(req,res){
//        var repository = new userRepository();
//        var param = {
//            username : req.body.username,
//            password : req.body.password
//        };
//        var errReturn = function(){
//            return res.redirect('/admin/login');
//        };
//        if( !param.username && param.username === ''){
//            this.log(true,'用户名不能为空！',log.type.normal,req,errReturn);
//        }
//        if( !param.password && param.password === ''){
//            this.log(true,'密码不能为空！',log.type.normal,req,errReturn);
//        }
//        repository.getByuserName(param.username,function(err,user){
//            if(err){
//                this.log(true,err,log.type.exception,req,errReturn);
//            }
//            if( !user ){
//                this.log(true,'用户不存在！' ,log.type.normal,req, errReturn);
//            }
//            else{
//                var password = param.password.encryption();
//                if(user.password ===  password){
//                    req.flash('success', '登陆成功!');
//
////  第一种：使用mongodb存储session
//                    req.session.user = user;
//
////  第二种：使用内存存储session
////                var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
////                res.cookie(settings.auth_cookie_name, auth_token,
////                    {path: '/', maxAge: 1000 * 60 * 60 * 24, signed: true, httpOnly: true}); //cookie 有效期1天
//
//                    return res.redirect('/admin/index');
//                }
//                else{
//                    this.log(true,'密码不准确！' ,log.type.normal,req, errReturn);
//                }
//            }
//        });
//    }
    /**
     * 注销
     * @param req
     * @param res
     */
//    this.logout = function(req,res){
//
////  第一种：使用mongodb存储session
//        req.session.user = null ;
//
////  第二种：使用内存存储session
////    req.session.user = null;
////    res.clearCookie(settings.auth_cookie_name, { path: '/' });
//
//        req.flash('success', '注销成功!');
//        res.redirect('/admin/login');
//
//    }
    /**
     * 激活账号逻辑
     * @param req
     * @param res
     */
//    this.doactive = function(req,res){
//
//    }

}


/**
 * 显示登陆页面
 * @param req
 * @param res
 */
logintest.prototype.showlogin = function(req,res){
    req.session.user = null;
    res.render('admin/login', {
        title: '登录' + title,
        layout:'admin/layout_login',
        success : req.flash("success").toString(),
        error: req.flash("error").toString()
    });
}
/**
 * 登录逻辑
 * @param req
 * @param res
 */
logintest.prototype.dologin = function(req,res){
    var repository = new userRepository();
    var param = {
        username : req.body.username,
        password : req.body.password
    };
    var errReturn = function(){
        return res.redirect('/admin/login');
    };
    if( !param.username && param.username === ''){
        this.log(true,'用户名不能为空！',log.type.normal,req,errReturn);
    }
    if( !param.password && param.password === ''){
        this.log(true,'密码不能为空！',log.type.normal,req,errReturn);
    }
    repository.getByuserName(param.username,function(err,user){
        if(err){
            this.log(true,err,log.type.exception,req,errReturn);
        }
        if( !user ){
            this.log(true,'用户不存在！' ,log.type.normal,req, errReturn);
        }
        else{
            var password = param.password.encryption();
            if(user.password ===  password){
                req.flash('success', '登陆成功!');

//  第一种：使用mongodb存储session
                req.session.user = user;

//  第二种：使用内存存储session
//                var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
//                res.cookie(settings.auth_cookie_name, auth_token,
//                    {path: '/', maxAge: 1000 * 60 * 60 * 24, signed: true, httpOnly: true}); //cookie 有效期1天

                return res.redirect('/admin/index');
            }
            else{
                this.log(true,'密码不准确！' ,log.type.normal,req, errReturn);
            }
        }
    });
}
/**
 * 注销
 * @param req
 * @param res
 */
logintest.prototype.logout = function(req,res){

//  第一种：使用mongodb存储session
    req.session.user = null ;

//  第二种：使用内存存储session
//    req.session.user = null;
//    res.clearCookie(settings.auth_cookie_name, { path: '/' });

    req.flash('success', '注销成功!');
    res.redirect('/admin/login');

}
/**
 * 激活账号逻辑
 * @param req
 * @param res
 */
logintest.prototype.doactive = function(req,res){

}

//var login = new logintest();
//exports.showlogin = login.showlogin;
//exports.dologin = login.dologin;
//exports.logout = login.logout;
//exports.doactive = login.doactive;

module.exports = logintest;
