/**
 * Created by Asura on 2014/10/30.
 */
/**
 * Created by Asura on 2014/10/30.
 */


var settings = require('../settings');
var error = require('../common/log');
var User = require('../model/user');
var userRepository = require('../Repository/userRepository');

//自定义变量
var blogtitle = settings.blogtitle;
var title = ' - '+ settings.blogtitle;

/**
 * 回调函数模型，调用此函数不是没权限访问就是未登陆访问
 * @param url       url
 * @param title     标题
 * @param layout    布局文件
 * @param success   是否成功
 * @param error     错误提示
 * @returns {*}
 */
var funReturn = function(req,res,url,title,layout,success,error){
    return res.status(403).render(url, {
        title: title,
        layout:layout,
        data : req.headers['referer'] ? req.headers['referer'].toString() : '',
        success : success,
        error: error
    });
};
/**
 * 需要管理员权限
 * @param req
 * @param res
 * @param next
 */
exports.adminRequire = function(req,res,next){
    var user = req.session.user;
    if( !user ){
        error.writelog(
            '您未登录，请先登录！',
            error.type.illegal,
            req,funReturn(req,res,'admin/login','登录' + title,'admin/layout_login',false,'您还没有登录。')
        );
    }
    else if( user.type != User.userType.admin ){
        error.writelog(
            '您没有权限访问此资源！',
            error.type.illegal,
            req,
            funReturn(req,res,'admin/error','权限提示' + title,'admin/layout_login',false,'您没有权限访问此资源。')
        );
    }
    else{
        next();
    }
};
/**
 * 普通用户权限，相当于需要登录
 * @param req
 * @param res
 * @param next
 */
exports.userRequire = function(req,res,next){
    var user = req.session.user;
    if( !user ){
        error.writelog(
            '您未登录没有权限访问此资源！',
            error.type.illegal,
            req,
            funReturn(req,res,'admin/login','登录' + title,'admin/layout_login',false,'您还没有登录。')
        );
    }
    else{
        next();
    }
};
/**
 * 用户锁定
 * @param req
 * @param res
 * @param next
 */
exports.blockUser = function(req,res,next){
    var user = req.session.user;
    if( !user ){
        error.writelog(
            '您未登录没有权限访问此资源！',
            error.type.illegal,
            req,
            funReturn(req,res,'admin/login','登录' + title,'admin/layout_login',false,'您还没有登录。')
        );
    }
    else if( user.is_block ){
        error.writelog(
            '您没有权限访问此资源！',
            error.type.illegal,
            req,
            funReturn(req,res,'admin/error','权限提示' + title,'admin/layout_login',false,'您已被管理员屏蔽了。')
        );
    }
    else{
        next();
    }
};

/**
 * 验证用户是否登录
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.authUser = function (req, res, next) {
    var auth_token = req.signedCookies['connect.sess'];
    if(auth_token){
        var auth = auth_token.split('$$$$');
        var user_id = auth[0];
        if(user_id){
            var repository = new userRepository();
            repository.getById(user_id,function(err,user){
                if(err){
                    error.writelog(
                        err,
                        error.type.illegal,
                        req,
                        funReturn(req,res,'admin/error','错误提示' + title,'admin/layout_login',false,err)
                    );
                }
                if(!user){
                    error.writelog(
                        '用户数据出现异常',
                        error.type.illegal,
                        req,
                        funReturn(req,res,'admin/error','错误提示' + title,'admin/layout_login',false,'用户数据出现异常')
                    );
                }
                else{
                    req.session.user = user;
                    return next();
                }
            });
        }
        else{
            return next();
        }
    }
    else{
        return next();
    }

};

