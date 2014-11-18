/**
 * 文章控制器
 * Created by Asura on 2014/10/30.
 */

var util = require('util');
var base = require('./base');
var settings = require('../settings');
var articleRepository = require('../Repository/articleRepository');
var categoryRepository = require('../Repository/categoryRepository');
var Article = require('../model/article');
var log = require('../common/log');


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
        var repository = new articleRepository();
        var CategoryRepository = new categoryRepository();
        var errReturn = function(){
            return res.redirect('/admin/article');
        };
        repository.list({},1,10,function(err,articles){
            if(err){
                this.log(true,err,log.type.exception ,req, errReturn);
            }
            res.render('admin/article', {
                title: '文章管理' + title,
                layout:'admin/layout',
                success : req.flash("success").toString(),
                error: req.flash("error").toString(),
                list : articles
            });
        }.bind(this));
    };

//后台显示文章添加页面
    this.showadd = function(req,res){
        var repository = new articleRepository();
        var CategoryRepository = new categoryRepository();
        var errReturn = function(){
            return res.redirect('/admin/article');
        };
        repository.list({},1,10,function(err,articles){
            if(err){
                this.log(true,err,log.type.exception ,req, errReturn);
            }
            CategoryRepository.list({},1,10000,function(err,categoies){
                if(err){
                    this.log(true,err,log.type.exception ,req, errReturn);
                }
                res.render('admin/article_add', {
                    title: '添加文章' + title,
                    layout:'admin/layout',
                    success : req.flash("success").toString(),
                    error: req.flash("error").toString(),
                    data :categoies,
                    list : articles
                });
            }.bind(this));
        }.bind(this));
    };

//后台文章保存
    this.add = function(req,res){
        var repository = new articleRepository();
        var errReturn = function(){
            return res.redirect('/admin/article');
        };
        var param = {
            title : req.body.title,
            content : req.body.content,
            tags : req.body.tags,
            category : req.body.category,
            user : req.session.user._id,
            PublicTime : req.body.PublicTime
        };
        if( !param.title && param.title === ''){
            this.log(true,'文章标题不能为空！',log.type.add ,req, errReturn);
        }
        if( !param.content && param.content === ''){
            this.log(true,'文章内容不能为空！',log.type.add ,req, errReturn);
        }
        if( !param.category && param.category === ''){
            this.log(true,'文章分类不能为空！',log.type.add ,req, errReturn);
        }

        /**
         * 这里可以进行字符分隔多个数组，不过要页面配合，现在这架设页面只输入一个进行转化数组再赋值
         * @type {Array}
         */
        if( param.tags){
            var tags = [];
            tags.push(param.tags);
            param.tags = tags;
        }

        if( !param.PublicTime && param.PublicTime === ''){
            this.log(true,'文章发布时间不能为空！',log.type.add ,req, errReturn);
        }
        else{
            param.PublicTime = new Date(param.PublicTime);
        }
        repository.add(param,function(err,article){
            if(err){
                this.log(true,err.message,log.type.exception ,req, errReturn);
            }
            req.flash('success', '添加成功!');
            res.redirect('/admin/article');
        }.bind(this));
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