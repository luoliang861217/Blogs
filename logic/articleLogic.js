/**
 * 文章逻辑处理
 * Created by Administrator on 2014/11/20.
 */

var Q = require("q");
var validator = require('validator');
var settings = require('../settings');
var articleRepository = require('../Repository/articleRepository');
var categoryRepository = require('../Repository/categoryRepository');
var Article = require('../model/article');
var log = require('../common/log');
var moment = require('moment');

function articleLogic(){

    /**
     * 添加文章逻辑处理
     * @param param
     * @param funcReturn
     */
    this.add = function(param,callback){
        var repository = new articleRepository();
        var cgrepository = new categoryRepository();
        cgrepository.getById(param.category,function(err,category){
            if(err){
                callback(err.message);
            }
            repository.add(param,function(err,article){
                if(err){
                    callback(err.message);
                }
                category.articles.push(article);
                cgrepository.update(category,function(err,category){
                    if(err){
                        callback(err.message);
                    }
                    callback(null,category);
                });
            });
        });
    };

    /**
     * 删除文章逻辑处理     1.先获取文章所属分类；2.删除文章；3.更新文章所属分类的文章
     * @param param
     * @param funcReturn
     */
    this.delete = function(param,callback){
        var repository = new articleRepository();
        var cgrepository = new categoryRepository();
        articleRepository.getById(param.id,function(err,article){
            if(err){
                callback(err.message);
            }
            var artObj = article;
            var cateObj = article.category;
            articleRepository.findByIdAndRemove(param.id,function(err){
                if(err){
                    callback(err.message);
                }
                this.updateCategory({category:cateObj.id},function(err,category){
                    if(err){
                        callback(err.message);
                    }
                    callback(null,category);
                });
            });

        });
    };

    /**
     * 修改文章逻辑处理     1.修改文章；2.更新最新的分类所属文章；3.更新老分类的所属文章
     * @param param
     * @param funcReturn
     */
    this.update = function(param,callback){
        var repository = new articleRepository();
        var cgrepository = new categoryRepository();

        repository.update(param,function(err,article){
            if(err){
                callback(err.message);
            }
            this.updateCategory({category:param.category},function(err,category){
                if(err){
                    callback(err.message);
                }
                if(param.category != param.oldcategory){
                    this.updateCategory({category:param.oldcategory},function(err,category){
                        if(err){
                            callback(err.message);
                        }
                        callback(null,category);
                    });
                }
                else{
                    callback(null,category);
                }
            });
            callback(null,article);
        });

    };

    /**
     * 更新分类文章   1.先获取分类；2.按照分类获取所有文章；3.赋值并保存分类
     * @param param
     * @param funcReturn
     */
    this.updateCategory = function(param,callback){
        var id = param.category;
        var cgrepository = new categoryRepository();
        var repository = new articleRepository();
        cgrepository.getById(id,function(err,category){
            if(err){
                callback(err.message);
            }
            repository.list({category:id},1,10000,function(err,articles){
                if(err){
                    callback(err.message);
                }
                category.articles = articles;
                cgrepository.update(category,function(err,cate){
                    if(err){
                        callback(err.message);
                    }
                    callback(null,cate);
                });
            });
        });


    };


}

var article = new articleLogic();
exports.add = article.add;
exports.delete = article.delete;