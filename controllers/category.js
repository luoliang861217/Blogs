/**
 * 分类控制器
 * Created by Asura on 2014/10/30.
 */

var util = require('util');
var base = require('./base');
var settings = require('../settings');
var categoryRepository = require('../Repository/categoryRepository');
var Category = require('../model/category');
var log = require('../common/log');

var EventProxy = require('eventproxy');

var title = ' - '+ settings.blogtitle;


function category(){

    base.call(this);
    util.inherits(category,base);

    /**
     * 后台分类首页
     * @param req
     * @param res
     */
    this.index = function(req,res){
        var repository = new categoryRepository();
        var errReturn = function(){
            return res.redirect('/admin/category');
        };
        try{
            req.query.pageIndex = req.query.pageIndex === undefined ? 1 : parseInt(req.query.pageIndex) > 0 ? parseInt(req.query.pageIndex) : 1;
            req.query.pageSize = req.query.pageSize === undefined ? 10 : parseInt(req.query.pageSize) >0 ? parseInt(req.query.pageSize) : 10;
            req.query.pageSort = req.query.pageSort === undefined ? 1 : parseInt(req.query.pageSort);
            req.query.Total = 0;
        }catch(e) {
            this.log(true,'参数不合法：' + e.message,log.type.exception ,req, errReturn);
        }
        var errReturn = function(){
            return res.redirect('/admin/category');
        };
        var success = function(categoies){
            res.render('admin/category', {
                title: '分类管理' + title,
                layout:'admin/layout',
                success : req.flash("success").toString(),
                error: req.flash("error").toString(),
                data : categoies,
                page : this.page(req.query.pageIndex,req.query.pageSize,req.query.Total,'','typecho-pager')
            });
        };
        var error = function(err){
            this.log(true,err,log.type.exception ,req, errReturn);
        };
        this.promise(repository.list,req.query).done(success.bind(this),error.bind(this));
    };

    /**
     * 后台显示分类添加页面
     * @param req
     * @param res
     */
    this.showadd = function(req,res){
        var repository = new categoryRepository();
        var errReturn = function(){
            return res.redirect('/admin/category');
        };
        var success = function(categoies){
            res.render('admin/category_add', {
                title: '添加分类' + title,
                layout:'admin/layout',
                success : req.flash("success").toString(),
                error: req.flash("error").toString(),
                list : categoies,
                data : new Category({name : '', slug:'',description:'' })
            });
        };
        this.promise(repository.list,req.query).done(success.bind(this),function(err){
            if(err){
                this.log(true,err,log.type.exception ,req, errReturn);
            }
        }.bind(this));
    };

    /**
     * 后台分类添加逻辑
     * @param req
     * @param res
     * @returns {*}
     */
    this.add = function(req,res){
        var repository = new categoryRepository();
        var errReturn = function(){
            return res.redirect('/admin/category_add');
        };
        var param = {
            name : req.body.name,
            slug : req.body.slug,
            description : req.body.description
        };
        if( !param.name && param.name === ''){
            this.log(true,'分类名称不能为空！',log.type.add ,req, errReturn);
        }
        if(!param.slug && param.slug === ''){
            this.log(true,'分类缩略名不能为空！',log.type.add ,req, errReturn);
        }
        if(req.body.parent && req.body.parent != ''){
            param.parent = req.body.parent;
        }
        var success = function(category){
            this.log(false,category.toString(),log.type.add ,req, function(){
                req.flash('success', '添加成功!');
                res.redirect('/admin/category');
            });
        };
        this.promise(repository.add,param).done(success.bind(this),function(err){
            this.log(true,err,log.type.exception ,req, errReturn);
        }.bind(this));
    };

    /**
     * 后台分类删除逻辑
     * @param req
     * @param res
     */
    this.delete = function(req,res){
        var errReturn = function(){
            return res.redirect('/admin/category');
        };
        var repository = new categoryRepository();
        if(req.query.id){
            var success = function(cate){
                this.log(false,'删除id:' + req.query.id,log.type.delete ,req, function(){
                    req.flash('success','删除成功!');
                    res.redirect('/admin/category');
                });
            };
            this.promise(repository.findByIdAndRemove,req.query.id).done(success.bind(this),function(err){
                this.log(true,err.message,log.type.exception ,req, errReturn);
            }.bind(this));
        }
        else{
            this.log(true,'参数错误！',log.type.delete ,req, errReturn);
        }
    };

    /**
     * 后台显示分类更改页面
     * @param req
     * @param res
     */
    this.showupdate = function(req,res){
        var errReturn = function(){
            return res.redirect('/admin/category');
        };
        var data = {};
        var repository = new categoryRepository();
        var id = req.query.id;
        req.query.id = null;
        req.query.pageIndex = 1;
        req.query.pageSize = 10000;
        var success = function(categoies){

            for(var i=0;i<categoies.length;i++){
                if(categoies[i].id === id){
                    data = categoies[i];
                    break;
                }
            }
            res.render('admin/category_update', {
                title: '更新分类' + title,
                layout:'admin/layout',
                success : req.flash("success").toString(),
                error: req.flash("error").toString(),
                list : categoies,
                data : data
            });
        };
        this.promise(repository.list,req.query).done(success.bind(this),function(err){
            this.log(true,err,log.type.exception ,req, errReturn);
        }.bind(this));
    };

    /**
     * 后台分类更新逻辑
     * @param req
     * @param res
     * @returns {*}
     */
    this.update = function(req,res){
        var errReturn = function(){
            return res.redirect('/admin/category_add');
        };
        var repository = new categoryRepository();
        var param = {
            id : req.body.id,
            name : req.body.name,
            slug : req.body.slug,
            description : req.body.description
        };
        if( (!param.id && param.id === '') || (!param.name && param.name === '')){
            this.log(true,'数据出错！',log.type.normal ,req, errReturn);
        }
        if(req.body.parent && req.body.parent != ''){
            param.parent = req.body.parent;
        }
        this.promise(repository.update,param).done(function(category){
            this.log(false,category.toString(),log.type.update ,req, function(){
                req.flash('success', '保存成功!');
                res.redirect('/admin/category');
            });
        }.bind(this),function(err){
            this.log(true,err.message,log.type.exception ,req, errReturn);
        }.bind(this));
    };

    /**
     * 后台分类列表
     * @param req
     * @param res
     */
    this.list = function(req,res){
        var errReturn = function(){
            return res.redirect('/admin/category');
        };
        var repository = new categoryRepository();
        try{
            req.query.pageIndex = req.query.pageIndex === undefined ? 1 : parseInt(req.query.pageIndex) > 0 ? parseInt(req.query.pageIndex) : 1;
            req.query.pageSize = req.query.pageSize === undefined ? 10 : parseInt(req.query.pageSize) >0 ? parseInt(req.query.pageSize) : 10;
            req.query.pageSort = req.query.pageSort === undefined ? 1 : parseInt(req.query.pageSort);
            req.query.Total = 0;
        }catch(e) {
            this.log(true,'参数不合法：' + e.message,log.type.exception ,req, errReturn);
        }
        this.promise(repository.list,req.query).done(function(categoies){
            res.render('admin/category', {
                title: '分类管理' + title,
                layout:'admin/layout',
                success : req.flash("success").toString(),
                error: req.flash("error").toString(),
                data : categoies,
                page : this.page(req.query.pageIndex,req.query.pageSize,req.query.Total,'','typecho-pager')
            });
        }.bind(this),function(err){
            this.log(true,err,log.type.exception ,req, errReturn);
        }.bind(this));
    };
}


var cateGory = new category();
exports.index = cateGory.index.bind(cateGory);
exports.showadd = cateGory.showadd.bind(cateGory);
exports.add = cateGory.add.bind(cateGory);
exports.delete = cateGory.delete.bind(cateGory);
exports.showupdate = cateGory.showupdate.bind(cateGory);
exports.update = cateGory.update.bind(cateGory);
exports.list = cateGory.list.bind(cateGory);