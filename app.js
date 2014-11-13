
/**
 * Module dependencies.
 */

var express = require('express');
var ejs = require('ejs');
var partials = require('express-partials');
var user = require('./routes/back');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var crypto = require('crypto');
var validator = require('validator');
var EventProxy = require('eventproxy');
var staticExtension = require('./common/staticExtension');
var webRoutes = require('./routes/web');//前台路由
var backRoutes = require('./routes/back');//后台路由
var log = require('./middlewares/log');//日志中间件

var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

//记录日志
app.use(log.accessLog);
app.use(partials());
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('asura'));
app.use(express.session({cookie: { maxAge: 1000 * 60 * 60 }}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



//调用前台路由器
webRoutes(app);
//调用后台路由器
backRoutes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
