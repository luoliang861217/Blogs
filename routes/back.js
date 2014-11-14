
/*
 * 后台路由器
 */

//登陆模块
var login = require('../controllers/login');
//注册模块
var register = require('../controllers/register');
//UEditor模块
var ueditor = require('../controllers/ueditor');
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
    app.get('/ueditor/uploadimage',auth.userRequire,ueditor.uploadimage);
    app.get('/ueditor/uploadscrawl',auth.userRequire,ueditor.uploadscrawl);
    app.get('/ueditor/uploadvideo',auth.userRequire,ueditor.uploadvideo);
    app.get('/ueditor/uploadfile',auth.userRequire,ueditor.uploadfile);
    app.get('/ueditor/listimage',auth.userRequire,ueditor.listimage);
    app.get('/ueditor/listfile',auth.userRequire,ueditor.listfile);
    app.get('/ueditor/catchimage',auth.userRequire,ueditor.catchimage);




//文章
    app.get('/admin/article',auth.userRequire,article.index);

    app.get('/admin/article_add',auth.userRequire,article.showadd);

    app.post('/admin/article_doadd',auth.userRequire,article.add);

    app.get('/admin/article/update',auth.userRequire,article.showupdate);

    app.post('/admin/article/update',auth.userRequire,article.update);

    app.post('/admin/article/list',auth.userRequire,article.list);




}