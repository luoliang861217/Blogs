/**
 * Created by Asura on 2014/10/30.
 */


var settings = require('../settings');
var usermodel = require('../models/user');
var User = usermodel.User;

//自定义变量
var blogtitle = settings.blogtitle;
var blogdescription = settings.blogdescription;
var title = ' - '+ settings.blogtitle;

/**
 * 显示登陆页面
 * @param req
 * @param res
 * @param next
 */
exports.showlogin = function(req,res){
    req.session.user = null;
    res.render('admin/login', {
        title: '登录' + title,
        layout:'admin/layout_login',
        success : req.flash("success").toString(),
        error: req.flash("error").toString()
    });
};

/**
 * 登录逻辑
 * @param req
 * @param res
 * @param next
 */
exports.dologin = function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    if( !username && username === ''){
        req.flash('error','用户名不能为空！');
        return res.redirect('/admin/login');
    }
    if( !password && password === ''){
        req.flash('error','密码不能为空！');
        return res.redirect('/admin/login');
    }
    User.findOne({username:username},function(err,user){
        if(err){
            req.flash('error',err);
            return res.redirect('/admin/login');
        }
        if( !user ){
            req.flash('error','用户不存在！');
            return res.redirect('/admin/login');
        }
        req.session.user = user;
        req.flash('success', '登陆成功!');
        res.redirect('/admin/index');
    });

};

/**
 * 激活账号逻辑
 * @param req
 * @param res
 * @param next
 */
exports.doactive = function(req,res){

};
