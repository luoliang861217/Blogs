/**
 * Created by Asura on 2014/10/30.
 */

var settings = require('../settings');

//自定义变量
var blogtitle = settings.blogtitle;
var blogdescription = settings.blogdescription;
var title = ' - '+ settings.blogtitle;


exports.index = function(req,res,next){
    res.render("index",{
            title:'首页' + title,
            blogtitle: blogtitle,
            blogdescription:blogdescription,
            user: req.session.user,
            layout: 'layout'}
    );
};

exports.details = function(req,res,next){
    res.render("details",{
            title:'详情页' + title,
            blogtitle: blogtitle,
            blogdescription:blogdescription,
            user: req.session.user,
            layout: 'layout'}
    );
};

exports.guestbook = function(req,res,next){
    res.render("guestbook",{
            title:'留言' + title,
            blogtitle: blogtitle,
            blogdescription:blogdescription,
            user: req.session.user,
            layout: 'layout'}
    );
};
exports.about = function(req,res,next){
    res.render("about",{
            title:'关于' + title,
            blogtitle: blogtitle,
            blogdescription:blogdescription,
            user: req.session.user,
            layout: 'layout'}
    );
};

