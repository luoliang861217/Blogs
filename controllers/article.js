/**
 * 文章控制器
 * Created by Asura on 2014/10/30.
 */

var util = require('util');
var base = require('./base');
var settings = require('../settings');
var log = require('../common/log');

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

function article(){
    base.call(this);
    util.inherits(article,base);

    //后台文章首页
    this.index = function(req,res){
        res.render('admin/article', {
            title: '文章管理' + title,
            layout:'admin/layout',
            success : req.flash("success").toString(),
            error: req.flash("error").toString(),
            data : null
        });
    };

//后台显示文章添加页面
    this.showadd = function(req,res){

        res.render('admin/article_add', {
            title: '添加文章' + title,
            layout:'admin/layout',
            success : req.flash("success").toString(),
            error: req.flash("error").toString(),
            data : null
        });
    };

//后台文章保存
    this.add = function(req,res){
        res.render('admin/article_add', {
            title: '添加文章' + title,
            layout:'admin/layout',
            success : req.flash("success").toString(),
            error: req.flash("error").toString(),
            data : null
        });

    };


//后台文章删除
    this.delete = function(req,res){

    };

//后台显示文章更改页面
    this.showupdate = function(req,res){

    };

//后台文章更新
    this.update = function(req,res){

    };


//后台文章列表
    this.list = function(req,res){

    };

}


var art = new article();
exports.index = art.index;
exports.showadd = art.showadd;
exports.add = art.add;
exports.delete = art.delete;
exports.showupdate = art.showupdate;
exports.update = art.update;
exports.list = art.list;