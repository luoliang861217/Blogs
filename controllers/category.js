/**
 * Created by Asura on 2014/10/30.
 */

var settings = require('../settings');
var categoryRepository = require('../Repository/categoryRepository');
var Category = require('../model/category');

var EventProxy = require('eventproxy');
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var title = ' - '+ settings.blogtitle;


//后台分类首页
exports.index = function(req,res){

//
//    Category.find(null,function(err,categoies){
//        if(err){
//            req.flash('error',err.message);
//            return res.redirect('/admin/index');
//        }
//        var ep = new EventProxy();
//        var index = 0;
//        for(i in categoies){
//            if(categoies[i].parent){ index++; }
//        }
//        ep.after('category_getbyid',index,function(list){
//            for(i in list){
//                if(list[i] && true){
//                    for(j in categoies){
//                        if(categoies[j].parent === list[i].id){
//                            categoies[j].parent = list[i].name;
//                        }
//                    }
//                }
//            }
//            if(categoies){
//                res.render('admin/category', {
//                    title: '分类管理' + title,
//                    layout:'admin/layout',
//                    success : req.flash("success").toString(),
//                    error: req.flash("error").toString(),
//                    data : categoies
//                });
//            }
//        });
//        for(i in categoies){
//            if(categoies[i].parent){
//                Category.findOne({_id : categoies[i].parent },function(err,cate){
//                    if(err){
//                        req.flash('error',err.message);
//                        return res.redirect('/admin/index');
//                    }
//                    ep.emit('category_getbyid',cate);
//                });
//            }else{
//                categoies[i].parent = '无';
//            }
//        }
//    });


    var repository = new categoryRepository();
    var param = {};
    repository.list(param,1,10,function(err,categoies){
        if(err){
            req.flash('error',err);
            return res.redirect('/admin/category');
        }
        res.render('admin/category', {
            title: '分类管理' + title,
            layout:'admin/layout',
            success : req.flash("success").toString(),
            error: req.flash("error").toString(),
            data : categoies
        });
    });

};

//后台显示分类添加页面
exports.showadd = function(req,res){

//    Category.find(null,function(err,categoies) {
//        if(err){
//            req.flash('error',err);
//            return res.redirect('/admin/category');
//        }
//        var id = '123';
//        res.render('admin/category_add', {
//            title: '添加分类' + title,
//            layout:'admin/layout',
//            success : req.flash("success").toString(),
//            error: req.flash("error").toString(),
//            list : categoies,
//            data : new Category({name : '', slug:'',description:'' })
//        });
//    });

    var repository = new categoryRepository();
    var param = {};
    repository.list(param,1,10,function(err,categoies){
        if(err){
            req.flash('error',err);
            return res.redirect('/admin/category');
        }
        res.render('admin/category_add', {
            title: '添加分类' + title,
            layout:'admin/layout',
            success : req.flash("success").toString(),
            error: req.flash("error").toString(),
            list : categoies,
            data : new Category({name : '', slug:'',description:'' })
        });
    });
};

//后台分类添加
exports.add = function(req,res){
    var name = req.body.name;
    var slug = req.body.slug;
    var description = req.body.description;
    var parent = req.body.parent;

    if( !name && name === ''){
        req.flash('error','分类名称不能为空！');
        return res.redirect('/admin/category_add');
    }
    if(!slug && slug === ''){
        req.flash('error','分类缩略名不能为空！');
        return res.redirect('/admin/category_add');
    }
    var category = new Category({
        name : name,
        slug : slug,
        description : description
    });
    category.save(function(err,category){
        if(err){
            req.flash('error',err.message);
            return res.redirect('/admin/category_add');
        }
        req.flash('success', '添加成功!');
        res.redirect('/admin/category');
    });

};

//后台分类删除
exports.delete = function(req,res){
    var paramStr = url.parse(req.url).query;
    var param = querystring.parse(paramStr);
    var repository = new categoryRepository();
    var u = new categorymodel();

    repository.findByIdAndRemove(param.id,function(err,cate){
        if(err){
            req.flash('error',err.message);
            return res.redirect('/admin/category');
        }
        req.flash('success','删除成功!');
        res.redirect('/admin/category');
    });

};

//后台显示分类更改页面
exports.showupdate = function(req,res){

    var paramStr = url.parse(req.url).query;
    var param = querystring.parse(paramStr);
    var repository = new categoryRepository();
    var paramer = {id : param.id};
    repository.list(paramer,1,10,function(err,categoies){
        if(err){
            req.flash('error',err);
            return res.redirect('/admin/category');
        }
        res.render('admin/category_update', {
            title: '更新分类' + title,
            layout:'admin/layout',
            success : req.flash("success").toString(),
            error: req.flash("error").toString(),
            list : categoies,
            data : categoies
        });
    });
};

//后台分类更新
exports.update = function(req,res){
//    var id = req.body.id ;
//    var name = req.body.name;
//    var slug = req.body.slug;
//    var description = req.body.description;
//    var parent = req.body.parent;
//
//    if( (!id && id === '') || (!name && name === '')){
//        req.flash('error','数据出错！');
//        return res.redirect('admin/category');
//    }
//    var category = {
//        name : name,
//        slug : slug,
//        description : description,
//        parent : parent
//    };
//    var param = { id: id};
//    Category.findByIdAndUpdate(param.id,category,function(err,category){
//        if(err){
//            req.flash('error',err.message);
//            return res.redirect('/admin/category_add');
//        }
//        req.flash('success', '保存成功!');
//        res.redirect('/admin/category');
//    });

};

//后台分类列表
exports.list = function(req,res){
    var repository = new categoryRepository();
    var param = {};
    repository.list(param,1,10,function(err,categoies){
        if(err){
            req.flash('error',err);
            return res.redirect('/admin/category');
        }
        res.render('admin/category01', {
            title: '分类管理' + title,
            layout:'admin/layout',
            success : req.flash("success").toString(),
            error: req.flash("error").toString(),
            data : categoies
        });
    });

};
