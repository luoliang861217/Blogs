/**
 * Created by Asura on 2014/10/30.
 */
/**
 * Created by Asura on 2014/10/30.
 */


var settings = require('../settings');
var error = require('../common/log');
var User = require('../model/user');

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
var funReturn = function(res,url,title,layout,success,error){
    return res.status(403).render(url, {
        title: title,
        layout:layout,
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
            req,funReturn(res,'admin/login','登录' + title,'admin/layout_login',false,'您还没有登录。')
        );
    }
    else if( user.type != User.userType.admin ){
        error.writelog(
            '您没有权限访问此资源！',
            error.type.illegal,
            req,
            funReturn(res,'admin/error','权限提示' + title,'admin/layout_login',false,'您没有权限访问此资源。')
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
            funReturn(res,'admin/login','登录' + title,'admin/layout_login',false,'您还没有登录。')
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
            funReturn(res,'admin/login','登录' + title,'admin/layout_login',false,'您还没有登录。')
        );
    }
    else if( user.is_block ){
        error.writelog(
            '您没有权限访问此资源！',
            error.type.illegal,
            req,
            funReturn(res,'admin/error','权限提示' + title,'admin/layout_login',false,'您已被管理员屏蔽了。')
        );
    }
    else{
        next();
    }
};

