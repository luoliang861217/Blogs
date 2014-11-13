/**
 * 注册控制器
 * Created by Asura on 2014/10/30.
 */


var settings = require('../settings');
var userRepository = require('../Repository/userRepository');
var error = require('../common/err');

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
 * 注册逻辑
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
    var errReturn = function(){
        return res.redirect('/admin/register');
    };
    if(!param.username || param.username === ''){
        error.writelog('用户名不能为空！',error.type.normal,req,errReturn);
    }
    if(!param.password || param.password === ''){
        error.writelog('密码不能为空！',error.type.normal,req,errReturn);
    }
    if( param.password != req.body.password_repeat){
        error.writelog('密码不一致！',error.type.normal,req,errReturn);
    }
    if(!param.email || param.email === ''){
        error.writelog('邮箱不能为空！',error.type.normal,req,errReturn);
    }
    if(!param.email.isEmail()){
        error.writelog('邮箱不正确！',error.type.normal,req,errReturn);
    }
    param.password = param.password.encryption();
    repository.getByuserName(param.username,function(err,user){
        if(err){
            error.writelog(err,error.type.exception,req,errReturn);
        }
        if(user){
            error.writelog('用户已经存在!',error.type.normal,req,errReturn);
        }
        repository.add(param,function(err,user){
            if (err) {
                error.writelog(err,error.type.exception,req,errReturn);
            }
            req.flash('success', '注册成功!');
            res.redirect('/');
        });
    });
};



