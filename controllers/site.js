/**
 * Created by Asura on 2014/10/30.
 */

var util = require('util');
var base = require('./base');
var validator = require('validator');
var settings = require('../settings');
var articleRepository = require('../Repository/articletestRepository');
var categoryRepository = require('../Repository/categoryRepository');
var Article = require('../model/articletest');
var log = require('../common/log');
var moment = require('moment');

var http = require('http');
var url = require('url');
var querystring = require('querystring');

//自定义变量
var blogtitle = settings.blogtitle;
var blogdescription = settings.blogdescription;
var title = ' - '+ settings.blogtitle;
var lay = { blogtitle : blogtitle,blogdescription : blogdescription };

function site(){

    base.call(this);
    util.inherits(site,base);

    this.index = function(req,res,next){
        var repository = new articleRepository();
        var errReturn = function(){
            return res.redirect('index');
        };
        try{
            req.query.pageIndex = req.query.pageIndex === undefined ? 1 : parseInt(req.query.pageIndex) > 0 ? parseInt(req.query.pageIndex) : 1;
            req.query.pageSize = req.query.pageSize === undefined ? 10 : parseInt(req.query.pageSize) >0 ? parseInt(req.query.pageSize) : 10;
            req.query.pageSort = req.query.pageSort === undefined ? 1 : parseInt(req.query.pageSort);
            req.query.Total = 0;
        }catch(e) {
            this.log(true,'参数不合法：' + e.message,log.type.exception ,req, errReturn);
        }
        repository.list(req.query,function(err,articles){
            if(err){
                this.log(true,err,log.type.exception ,req, errReturn);
            }
            articles.forEach(function(e){
                e.create = moment.unix(e.createTime).format('YYYY-MM-DD HH:mm:ss');
            })
            lay.user = req.session.user;
            res.render('index', {
                title: '首页' + title,
                layout:'layout',
                success : req.flash("success").toString(),
                error: req.flash("error").toString(),
                lay : lay,
                list : articles,
                page : this.page(req.query.pageIndex,req.query.pageSize,req.query.Total,'','page-navigator')
            });
        }.bind(this));
    };

    /**
     * 前台文章页面 路由：/article/:id
     * @param req
     * @param res
     * @param next
     */
    this.details = function(req,res,next){
        var repository = new articleRepository();
        var errReturn = function(){
            return res.redirect('index');
        };
        try{
            req.query.id = req.params.id;
            req.query.pageIndex = req.query.pageIndex === undefined ? 1 : parseInt(req.query.pageIndex) > 0 ? parseInt(req.query.pageIndex) : 1;
            req.query.pageSize = req.query.pageSize === undefined ? 10 : parseInt(req.query.pageSize) >0 ? parseInt(req.query.pageSize) : 10;
            req.query.pageSort = req.query.pageSort === undefined ? 1 : parseInt(req.query.pageSort);
            req.query.Total = 0;
        }catch(e) {
            this.log(true,'参数不合法：' + e.message,log.type.exception ,req, errReturn);
        }
        repository.getArticleCommentById(req.query,function(err,article){
            if(err){
                this.log(true,err.message,log.type.exception ,req, errReturn);
            }
            if(!article){
                this.log(true,'文章id:' + params.id + '不存在',log.type.exception ,req, errReturn);
            }
            else{
                article.create = moment.unix(article.createTime).format('YYYY-MM-DD HH:mm:ss');
                article.comments.total = article.comments.length;
                article.comments.forEach(function(item){
                    item.create = moment.unix(item.createTime).format('YYYY-MM-DD HH:mm:ss');
                });
                lay.username = this.isnullOrundefined(req.session.user) ? '访问者' : req.session.user.username;
                res.render('details', {
                    title:  article.title + title,
                    layout:'layout',
                    success : req.flash("success").toString(),
                    error: req.flash("error").toString(),
                    lay : lay,
                    data :article,
                    page : this.page(req.query.pageIndex,req.query.pageSize,req.query.Total,'','page-navigator')
                });
            }
        }.bind(this));
    };

    /**
     * 留言
     * @param req
     * @param res
     * @param next
     */
    this.guestbook = function(req,res,next){
        lay.username = this.isnullOrundefined(req.session.user) ? '访问者' : req.session.user.username;
        res.render("guestbook",{
                title:'留言' + title,
                blogtitle: blogtitle,
                blogdescription:blogdescription,
                user: req.session.user,
                layout: 'layout',
                lay : lay
        });
    };

    /**
     * 关于
     * @param req
     * @param res
     * @param next
     */
    this.about = function(req,res,next){
        lay.username = this.isnullOrundefined(req.session.user) ? '访问者' : req.session.user.username;
        res.render("about",{
                title:'关于' + title,
                blogtitle: blogtitle,
                blogdescription:blogdescription,
                user: req.session.user,
                layout: 'layout',
                lay : lay
        });
    };


}
var Site = new site();
exports.index = Site.index.bind(Site);
exports.details = Site.details.bind(Site);
exports.guestbook = Site.guestbook.bind(Site);
exports.about = Site.about.bind(Site);


