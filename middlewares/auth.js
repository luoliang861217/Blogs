/**
 * Created by Asura on 2014/10/30.
 */
/**
 * Created by Asura on 2014/10/30.
 */


var settings = require('../settings');
//自定义变量
var blogtitle = settings.blogtitle;
var title = ' - '+ settings.blogtitle;

/**
 * 需要管理员权限
 * @param req
 * @param res
 * @param next
 */
exports.adminRequire = function(req,res,next){
    var user = req.session.user;
    if( !user ){
        return res.render('admin/login', {
            title: '登录' + title,
            layout:'admin/layout_login',
            success : false,
            error: '您还没有登录。'
        });
    }
    else if( user.type === 0 ){
        return res.render('admin/login', {
            title: '登录' + title,
            layout:'admin/layout_login',
            success : false,
            error: '您没有权限。'
        });
    }
    next();
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
        return res.render('admin/login', {
            title: '登录' + title,
            layout:'admin/layout_login',
            success : false,
            error: '您还没有登录。'
        });
    }
    next();
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
        return res.render('admin/login', {error: '您还没有登录。'});
    }
    else if( user.is_block ){
        return res.render('admin/login', {error: '您已被管理员屏蔽了！'});
    }
    next();
};

