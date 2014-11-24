/**
 * 评论控制器
 * Created by Asura on 2014/10/30.
 */

var util = require('util');
var base = require('./base');
var validator = require('validator');
var settings = require('../settings');
var commentRepository = require('../Repository/commentRepository');
var Comment = require('../model/comment');
var log = require('../common/log');
var moment = require('moment');


var EventProxy = require('eventproxy');
var http = require('http');
var url = require('url');
var querystring = require('querystring');

//自定义变量
var title = ' - '+ settings.blogtitle;

function Comment(){
    base.call(this);
    util.inherits(Comment,base);


    /**
     * 新增评论
     * @param req
     * @param res
     */
    this.post = function(req,res){
        var err = '';
        var repository = new commentRepository();
        var errReturn = function(){
            var json = {success : false,mes : err};
            res.send(JSON.stringify(json));
        };
        var param = {
            content : req.body.content,
            article : req.body.article,
            user : req.session.user._id
        };
        if( this.isnullOrundefined(param.content)){
            err = '回复内容不能为空！';
            this.log(true,err,log.type.add ,req, errReturn);
        }
        else{
            repository.add(param,function(err,comment){
                if(err){
                    err = err.message;
                    this.log(true,err,log.type.exception ,req, errReturn);
                }
                this.log(false,comment.toString(),log.type.add ,req, function(){
                    var json = {success : true,mes : '回复成功！'};
                    res.send(JSON.stringify(json));
                });
            }.bind(this));
        }

    };


    /**
     * 删除评论
     * @param req
     * @param res
     */
    this.delete = function(req,res){
        var err = '';
        var errReturn = function(){
            var json = {success : false,mes : err};
            res.send(JSON.stringify(json));
        };
        var paramStr = url.parse(req.url).query;
        var param = querystring.parse(paramStr);
        var repository = new commentRepository();
        if(param.id){
            repository.findByIdAndRemove(param.id,function(err,cate){
                if(err){
                    var err = err.message;
                    this.log(true,err,log.type.exception ,req, errReturn);
                }
                this.log(false,'删除id:' + param.id,log.type.delete ,req, function(){
                    var json = {success : true,mes : '删除成功！'};
                    res.send(JSON.stringify(json));
                });
            }.bind(this));
        }
        else{
            err = '参数错误！';
            this.log(true,err,log.type.delete ,req, errReturn);
        }
    };



//后台文章列表
    this.list = function(req,res){
        var err = '';
        var errReturn = function(){
            var json = {success : false,mes : err};
            res.send(JSON.stringify(json));
        };
        var repository = new commentRepository();
        var paramStr = url.parse(req.url).query;
        var param = querystring.parse(paramStr);
        var pageindex = 1;
        if(param.pageindex){
            pageindex = param.pageindex;
        }
        var pagesize = 10;
        if(param.pagesize){
            pagesize = param.pagesize;
        }
        var articleid = param.articleid;
        if(articleid){
            var par = { article : articleid };
            repository.list(par,pageindex,pagesize,function(err,comments){
                if(err){
                    var err = err.message;
                    this.log(true,err,log.type.list ,req, errReturn);
                }
                var json = {success : true,mes : '' , data:comments};
                res.send(JSON.stringify(json));
            });
        }else{
            var err = '参数错误！';
            this.log(true,err,log.type.list ,req, errReturn);
        }

    };

}


var comment = new Comment();
exports.post = comment.post.bind(comment);
exports.delete = comment.delete.bind(comment);
exports.list = comment.list.bind(comment);