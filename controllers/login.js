/**
 * Created by Asura on 2014/10/30.
 */


var settings = require('../settings');
var userRepository = require('../Repository/userRepository');

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
    if( !param.username && param.username === ''){
        req.flash('error','用户名不能为空！');
        return res.redirect('/admin/login');
    }
    if( !param.password && param.password === ''){
        req.flash('error','密码不能为空！');
        return res.redirect('/admin/login');
    }
    repository.getByuserName(param.username,function(err,user){
        if(err){
            req.flash('error',err);
            return res.redirect('/admin/login');
        }
        if( !user ){
            req.flash('error','用户不存在！');
            return res.redirect('/admin/login');
        }
        else{
            var password = param.password.encryption();;
            if(user.password ===  password){
                req.session.user = user;
                req.flash('success', '登陆成功!');
                res.redirect('/admin/index');
            }
            else{
                req.flash('error','密码不准确！');
                return res.redirect('/admin/login');
            }

        }
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
