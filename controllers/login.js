/**
 * 登录控制器
 * Created by Asura on 2014/10/30.
 */


var settings = require('../settings');
var userRepository = require('../Repository/userRepository');
var log = require('../common/log');

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
        log.writelog('用户名不能为空！',log.type.normal,req,errReturn);
    }
    if( !param.password && param.password === ''){
        log.writelog('密码不能为空！',log.type.normal,req,errReturn);
    }
    repository.getByuserName(param.username,function(err,user){
        if(err){
            log.writelog(err ,log.type.exception ,req, errReturn);
        }
        if( !user ){
            log.writelog('用户不存在！' ,log.type.normal,req, errReturn);
        }
        else{
            var password = param.password.encryption();
            if(user.password ===  password){
                req.flash('success', '登陆成功!');
                var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
                res.cookie(settings.auth_cookie_name, auth_token,
                    {path: '/', maxAge: 1000 * 60 * 60 * 24, signed: true, httpOnly: true}); //cookie 有效期1天
                res.redirect('/admin/index');
            }
            else{
                log.writelog('密码不准确！' ,log.type.normal ,req, errReturn);
            }
        }
    });
};


exports.logout = function(req,res){
    req.session.user = null;
    res.clearCookie(settings.auth_cookie_name, { path: '/' });
    req.flash('success', '注销成功!');
    res.redirect('/admin/login');

};

/**
 * 激活账号逻辑
 * @param req
 * @param res
 * @param next
 */
exports.doactive = function(req,res){

};
