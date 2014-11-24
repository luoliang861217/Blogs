
/*
 * 后台路由器
 */

//登陆模块
var login = require('../controllers/login');

//注册模块
var register = require('../controllers/register');
//UEditor模块
var ueditor = require('../controllers/ueditor');
//simditor模块
var simditor = require('../controllers/Simditor');
//文章模块
var article = require('../controllers/article');
//分类模块
var category = require('../controllers/category');
//后台模块
var backstage = require('../controllers/backstage');
//执行验证模块
var auth = require('../middlewares/auth');
//日志中间件
var log = require('../middlewares/log');



module.exports = function(app){
//登陆注销
    app.get('/admin',auth.userRequire, backstage.index);

    app.get('/admin/index',auth.userRequire, backstage.index);

    app.get('/admin/login',login.showlogin);

    app.get('/admin/logintest',login.dologin);

    app.post('/admin/dologin', login.dologin);

    app.get('/admin/register',register.showregister);

    app.post('/admin/doregister', register.doregister);

    app.get('/admin/logout', login.logout);

//分类
    app.get('/admin/category',auth.userRequire,category.index);

    app.get('/admin/category_add',auth.adminRequire,category.showadd);

    app.post('/admin/category_doadd',auth.adminRequire,category.add);

    app.get('/admin/category_delete',auth.adminRequire,category.delete);

    app.get('/admin/category_update',auth.adminRequire,category.showupdate);

    app.post('/admin/category/doupdate',auth.adminRequire,category.update);

    app.get('/admin/category/list',auth.userRequire,category.list);

//UEditor

    app.get('/ueditor/config',auth.userRequire,ueditor.config);
    app.post('/ueditor/config',auth.userRequire,ueditor.config);


//Simditor

    app.post('/Simditor/uploadimage',auth.userRequire,simditor.uploadimage);
    app.post('/Simditor/uploadfile',auth.userRequire,simditor.uploadfile);

//文章
    app.get('/admin/article',auth.userRequire,article.index);

    app.get('/admin/article_add',auth.userRequire,article.showadd);

    app.post('/admin/article_doadd',auth.userRequire,article.add);

    app.get('/admin/article_delete',auth.adminRequire,article.delete);

    app.get('/admin/article_update',auth.userRequire,article.showupdate);

    app.post('/admin/article_doupdate',auth.userRequire,article.update);

    app.post('/admin/article/list',auth.userRequire,article.list);

//评论
    app.post('/comment/post',auth.userRequire,article.post);

    app.get('/comment/delete',auth.userRequire,article.deletecomment);

    app.get('/comment/list',article.commentlist);

}