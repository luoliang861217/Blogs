/**
 * Created by Asura on 2014/10/30.
 */


var settings = require('../settings');

//自定义变量
var blogtitle = settings.blogtitle;
var blogdescription = settings.blogdescription;
var title = ' - '+ settings.blogtitle;

exports.index = function(req,res){
    res.render('admin/index', {
        title: '后台中心' + title,
        layout:'admin/layout',
        success : req.flash("success").toString(),
        error : req.flash("error").toString()
    });
};

exports.profile = function(req,res){

};



