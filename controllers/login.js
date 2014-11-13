/**
 * 登录控制器
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
    var repository = new userRepository();
    var param = {
        username : req.body.username,
        password : req.body.password
    };
    var errReturn = function(){
        return res.redirect('/admin/login');
    };
    if( !param.username && param.username === ''){
        error.writelog('用户名不能为空！',error.type.normal,req,errReturn);
    }
    if( !param.password && param.password === ''){
        error.writelog('密码不能为空！',error.type.normal,req,errReturn);
    }
    repository.getByuserName(param.username,function(err,user){
        if(err){
            error.writelog(err ,error.type.normal ,req, errReturn);
        }
        if( !user ){
            error.writelog('用户不存在！' ,error.type.normal,req, errReturn);
        }
        else{
            var password = param.password.encryption();
            if(user.password ===  password){
                req.session.user = user;
                req.flash('success', '登陆成功!');
                res.redirect('/admin/index');
            }
            else{
                error.writelog('密码不准确！' ,error.type.normal ,req, errReturn);
            }

        }
    });
};


exports.logout = function(req,res){
    req.session.user = null;
    req.flash('success', '注销成功!');
    res.redirect('/');

};

/**
 * 激活账号逻辑
 * @param req
 * @param res
 * @param next
 */
exports.doactive = function(req,res){

};
