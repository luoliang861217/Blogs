/**
 * Created by Asura on 2014/10/30.
 */

var util = require('util');
var base = require('./base');
var validator = require('validator');
var settings = require('../settings');
var articleRepository = require('../Repository/articleRepository');
var categoryRepository = require('../Repository/categoryRepository');
var Article = require('../model/article');
var log = require('../common/log');
var moment = require('moment');

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
        repository.list({},1,10,function(err,articles){
            if(err){
                this.log(true,err,log.type.exception ,req, errReturn);
            }
            articles.forEach(function(e){
                e.create = moment(e.createTime).format('YYYY-MM-DD HH:mm:ss');
            })
            lay.user = req.session.user;
            res.render('index', {
                title: '首页' + title,
                layout:'layout',
                success : req.flash("success").toString(),
                error: req.flash("error").toString(),
                lay : lay,
                list : articles
            });
        }.bind(this));
    };

    this.details = function(req,res,next){
        console.log(req.params.id);
        var repository = new articleRepository();
        repository.getById(req.params.id,function(err,article){
            if(err){
                this.log(true,err.message,log.type.exception ,req, errReturn);
            }
            if(!article){
                this.log(true,'文章id:' + param.id + '不存在',log.type.exception ,req, errReturn);
            }
            else{
                article.create = moment(article.createTime).format('YYYY-MM-DD HH:mm:ss');
                lay.user = req.session.user;
                res.render('details', {
                    title:  article.title + title,
                    layout:'layout',
                    success : req.flash("success").toString(),
                    error: req.flash("error").toString(),
                    lay : lay,
                    data :article
                });
            }
        }.bind(this));
    };

    this.guestbook = function(req,res,next){
        res.render("guestbook",{
                title:'留言' + title,
                blogtitle: blogtitle,
                blogdescription:blogdescription,
                user: req.session.user,
                layout: 'layout'}
        );
    };

    this.about = function(req,res,next){
        res.render("about",{
                title:'关于' + title,
                blogtitle: blogtitle,
                blogdescription:blogdescription,
                user: req.session.user,
                layout: 'layout'}
        );
    };

}
var Site = new site();
exports.index = Site.index.bind(Site);
exports.details = Site.details.bind(Site);
exports.guestbook = Site.guestbook.bind(Site);
exports.about = Site.about.bind(Site);


