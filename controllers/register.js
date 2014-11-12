/**
 * 注册控制器
 * Created by Asura on 2014/10/30.
 */


var settings = require('../settings');
var userRepository = require('../Repository/userRepository');

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
    var repository = new userRepository();
    var param = {
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    };
    if(!param.username || param.username === ''){
        req.flash('error','用户名不能为空！');
        return res.redirect('/admin/register');
    }
    if(!param.password || param.password === ''){
        req.flash('error','密码不能为空！');
        return res.redirect('/admin/register');
    }
    if( param.password != req.body.password_repeat){
        req.flash('error','密码不一致！');
        return res.redirect('/admin/register');
    }
    if(!param.email || param.email === ''){
        req.flash('error','邮箱不能为空！');
        return res.redirect('/admin/register');
    }
    if(!param.email.isEmail()){
        req.flash('error','邮箱不正确！');
        return res.redirect('/admin/register');
    }
    param.password = param.password.encryption();
    repository.getByuserName(param.username,function(err,user){
        if(err){
            req.flash('error',err);
            return res.redirect('/admin/register');
        }
        if(user){
            req.flash('error','用户已经存在！');
            return res.redirect('/admin/register');
        }
        repository.add(param,function(err,user){
            if (err) {
                req.flash('error', err);
                return res.redirect('/admin/register');
            }
            req.flash('success', '注册成功!');
            res.redirect('/');
        });
    });
};



