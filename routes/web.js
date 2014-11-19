
/*
 * 前台路由器
 */


var site = require("../controllers/site");


module.exports = function(app){

//首页请求
    app.get('/', site.index);

//详情页
//    app.get('/details',site.details);

//留言
    app.get('/guestbook',site.guestbook);

//关于
    app.get('/about',site.about);


    app.get('/article/:id',site.details);




}

