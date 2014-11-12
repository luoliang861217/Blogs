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
 * 显示注册页面
 * @param req
 * @param res
 * @param next
 */
exports.showregister = function(req,res){
    res.render('admin/register', {
        title: '注册' + title,
        layout:'admin/layout_login',
        success : req.flash("success").toString(),
        error: req.flash("error").toString()
    });
};

/**
 * 注册action
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.doregister = function(req,res){
//    console.log('username:' + req.body.username +
//        'password:' +  req.body.password +
//        'password_repeat' + req.body.password_repeat +
//        'email' + req.body.email);

    var username = req.body.username;
    var password = req.body.password;
    var password_repeat = req.body.password_repeat;
    var email = req.body.email;

    if(!username || username === ''){
        req.flash('error','用户名不能为空！');
        return res.redirect('/admin/register');
    }
    if(!password || password === ''){
        req.flash('error','密码不能为空！');
        return res.redirect('/admin/register');
    }
    if(password != password_repeat){
        req.flash('error','密码不一致！');
        return res.redirect('/admin/register');
    }
    if(!email || email === ''){
        req.flash('error','邮箱不能为空！');
        return res.redirect('/admin/register');
    }
    if(!email.isEmail()){
        req.flash('error','邮箱不正确！');
        return res.redirect('/admin/register');
    }

    password = password.encryption();
    User.findOne({username:username},function(err,user){
        if(err){
            req.flash('error',err);
            return res.redirect('/admin/register');
        }
        if(user){
            req.flash('error','用户已经存在！');
            return res.redirect('/admin/register');
        }
        var newUser = new User({
            username : username,
            password : password,
            email : email,
            avatar : 'img/avatar.jpg'
        });
        newUser.save(function(err,user){
            if (err) {
                req.flash('error', err);
                return res.redirect('/admin/register');
            }
            req.flash('success', '注册成功!');
            res.redirect('/');
        });
    });
};



