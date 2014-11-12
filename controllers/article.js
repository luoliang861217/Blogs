/**
 * Created by Asura on 2014/10/30.
 */

var settings = require('../settings');

var categorymodel = require('../model/category');
var Category = categorymodel.Category;
var articlemodel = require('../model/article');
var Article = articlemodel.Article;


var EventProxy = require('eventproxy');
var http = require('http');
var url = require('url');
var querystring = require('querystring');

//自定义变量
var title = ' - '+ settings.blogtitle;

//后台文章首页
exports.index = function(req,res){
    res.render('admin/article', {
        title: '文章管理' + title,
        layout:'admin/layout',
        success : req.flash("success").toString(),
        error: req.flash("error").toString(),
        data : null
    });
};

//后台显示文章添加页面
exports.showadd = function(req,res){

    res.render('admin/article_add', {
        title: '添加文章' + title,
        layout:'admin/layout',
        success : req.flash("success").toString(),
        error: req.flash("error").toString(),
        data : null
    });
};

//后台文章保存
exports.add = function(req,res){
    res.render('admin/article_add', {
    title: '添加文章' + title,
    layout:'admin/layout',
    success : req.flash("success").toString(),
    error: req.flash("error").toString(),
    data : null
});

};


//后台文章删除
exports.delete = function(req,res){

};

//后台显示文章更改页面
exports.showupdate = function(req,res){

};

//后台文章更新
exports.update = function(req,res){

};


//后台文章列表
exports.list = function(req,res){

};
