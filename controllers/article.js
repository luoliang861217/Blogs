/**
 * 文章控制器
 * Created by Asura on 2014/10/30.
 */

var util = require('util');
var base = require('./base');
var settings = require('../settings');
var articleRepository = require('../Repository/articleRepository');
var categoryRepository = require('../Repository/categoryRepository');
var commentRepository = require('../Repository/commentRepository');
var Article = require('../model/article');
var log = require('../common/log');
var moment = require('moment');
var Q = require('q');

//自定义变量
var title = ' - '+ settings.blogtitle;

function article(){
    base.call(this);
    util.inherits(article,base);

    /**
     * 后台文章首页
     * @param req
     * @param res
     */
    this.index = function(req,res){
        var repository = new articleRepository();
        var errReturn = function(){
            return res.redirect('/admin/article');
        };
        try{
            req.query.pageIndex = req.query.pageIndex === undefined ? 1 : parseInt(req.query.pageIndex) > 0 ? parseInt(req.query.pageIndex) : 1;
            req.query.pageSize = req.query.pageSize === undefined ? 10 : parseInt(req.query.pageSize) >0 ? parseInt(req.query.pageSize) : 10;
            req.query.pageSort = req.query.pageSort === undefined ? 1 : parseInt(req.query.pageSort);
            req.query.Total = 0;
        }catch(e) {
            this.log(true,'参数不合法：' + e.message,log.type.exception ,req, errReturn);
        }
        var getList = function(query){
            var defered = Q.defer();
            repository.list(query,function(err,articles){
                if(!err){
                    articles.forEach(function(e){
                        e.create = moment.unix(e.createTime).format('YYYY-MM-DD HH:mm:ss');
                        e.comments.total = e.comments.length;
                        e.comments.forEach(function(item){
                            item.create = moment.unix(item.createTime).format('YYYY-MM-DD HH:mm:ss');
                        });
                    });
                    defered.resolve(articles);
                }
                else{
                    defered.reject(err);
                }
            });
            return defered.promise;
        };
        var success = function(articles){
            res.render('admin/article', {
                title: '文章管理' + title,
                layout:'admin/layout',
                success : req.flash("success").toString(),
                error: req.flash("error").toString(),
                list : articles,
                page : this.page(req.query.pageIndex,req.query.pageSize,req.query.Total,'','typecho-pager')
            });
        };
        var error = function(err){
            this.log(true,err,log.type.exception ,req, errReturn);
        };
        getList(req.query).done(success.bind(this),error.bind(this));
    };

    /**
     * 后台显示文章添加页面
     * @param req
     * @param res
     */
    this.showadd = function(req,res){
        var CategoryRepository = new categoryRepository();
        var errReturn = function(){
            return res.redirect('/admin/article');
        };
        var param = {pageIndex : 1,pageSize : 10000};
        var getList = function(query){
            var defered = Q.defer();
            CategoryRepository.list(query,function(err,categoies){
                if(!err){
                    defered.resolve(categoies);
                }
                else{
                    defered.reject(err);
                }
            });
            return defered.promise;
        };
        var success = function(categoies){
            res.render('admin/article_add', {
                title: '添加文章' + title,
                layout:'admin/layout',
                success : req.flash("success").toString(),
                error: req.flash("error").toString(),
                data :categoies
            });
        };
        var error = function(err){
            this.log(true,err,log.type.exception ,req, errReturn);
        };
        getList(param).done(success.bind(this),error.bind(this));
    };

    /**
     * 后台文章保存
     * @param req
     * @param res
     */
    this.add = function(req,res){
        var isCommit = true;
        var repository = new articleRepository();
        var cgrepository = new categoryRepository();
        var errReturn = function(){
            return res.redirect('/admin/article_add');
        };
        var param = {
            title : req.body.title,
            content : req.body.content,
            tags : req.body.tags,
            category : req.body.category,
            user : req.session.user._id,
            comments :[],
            PublicTime : req.body.PublicTime
        };
        if( this.isnullOrundefined(param.title)){
            isCommit = false;
            this.log(true,'文章标题不能为空！',log.type.add ,req, errReturn);
        }
        if( isCommit && this.isnullOrundefined(param.content)){
            isCommit = false;
            this.log(true,'文章内容不能为空！',log.type.add ,req, errReturn);
        }
        if( isCommit && this.isnullOrundefined(param.category) ){
            isCommit = false;
            this.log(true,'文章分类不能为空！',log.type.add ,req, errReturn);
        }
        /**
         * 这里可以进行字符分隔多个数组，不过要页面配合，现在这架设页面只输入一个进行转化数组再赋值
         * @type {Array}
         */
        if( isCommit && !this.isnullOrundefined(param.tags)){
            param.tags = this.getArraywithdeleteWhitespace(param.tags);
        }
        if( isCommit && this.isnullOrundefined(param.PublicTime)){
            isCommit = false;
            this.log(true,'文章发布时间不能为空！',log.type.add ,req, errReturn);
        }
        if(isCommit){
            param.PublicTime = moment(param.PublicTime).unix();
            var getById = function(param){
                var defered = Q.defer();
                cgrepository.getById(param.category,function(err,category){
                    if(!err){
                        defered.resolve(category);
                    }
                    else{
                        defered.reject(err);
                    }
                });
                return defered.promise;
            };
            var add = function(category){
                var defered = Q.defer();
                repository.add(param,function(err,article){
                    if(!err){
                        category.articles.push(article);
                        var model = {category:category,article:article};
                        defered.resolve(model);
                    }
                    else{
                        defered.reject(err);
                    }
                });
                return defered.promise;
            };
            var update = function(model){
                var defered = Q.defer();
                cgrepository.update(model.category,function(err,category){
                    if(!err){
                        model.category = category;
                        defered.resolve(model);
                    }
                    else{
                        defered.reject(err);
                    }
                });
                return defered.promise;

            };
            var success = function(model){
                this.log(false,model.article.toString(),log.type.add ,req, function(){
                    req.flash('success', '添加成功!');
                    res.redirect('/admin/article');
                });
            };
            var error = function(err){
                this.log(true,err,log.type.exception ,req, errReturn);
            };
            getById(param).then(add).then(update).done(success.bind(this),error.bind(this));
        }
    };

    /**
     * 后台文章删除
     * @param req
     * @param res
     */
    this.delete = function(req,res){
        var errReturn = function(){
            return res.redirect('/admin/article');
        };
        var repository = new articleRepository();
        var cgrepository = new categoryRepository();

        repository.getById(req.query.id,function(err,article){
            if(err){
                this.log(true,err.message,log.type.exception ,req, errReturn);
            }
            cgrepository.getById(article.category,function(err,category){
                if(err){
                    this.log(true,err.message,log.type.exception ,req, errReturn);
                }
                repository.findByIdAndRemove(req.query.id,function(err,cate){
                    if(err){
                        this.log(true,err.message,log.type.exception ,req, errReturn);
                    }
                    var param = {category:category.id,pageIndex:1,pageSize:1000};
                    repository.list(param,function(err,articles){
                        if(err){
                            this.log(true,err.message,log.type.exception ,req, errReturn);
                        }
                        category.articles = articles;
                        cgrepository.update(category,function(err,category){
                            if(err){
                                this.log(true,err.message,log.type.exception ,req, errReturn);
                            }
                            this.log(false,'删除id:' + param.id,log.type.delete ,req, function(){
                                req.flash('success','删除成功!');
                                res.redirect('/admin/article');
                            });
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }.bind(this));
    };

    /**
     * 后台显示文章更改页面
     * @param req
     * @param res
     */
    this.showupdate = function(req,res){
        var repository = new articleRepository();
        var CategoryRepository = new categoryRepository();
        var errReturn = function(){
            return res.redirect('admin/article');
        };
        var id = req.query.id;
        req.query.id = null;
        req.query.pageIndex = 1;
        req.query.pageSize = 10000;
        CategoryRepository.list(req.query,function(err,categoies){
            if(err){
                this.log(true,err,log.type.exception ,req, errReturn);
            }
            repository.getById(id,function(err,article){
                if(err){
                    this.log(true,err,log.type.exception ,req, errReturn);
                }
                res.render('admin/article_update', {
                    title: '编辑文章' + title,
                    layout: 'admin/layout',//admin/layout
                    success : req.flash("success").toString(),
                    error: req.flash("error").toString(),
                    data :article,
                    list : categoies
                });
            }.bind(this));
        }.bind(this));
    };

    /**
     * 后台文章更新
     * @param req
     * @param res
     */
    this.update = function(req,res){
        var isCommit = true;
        var newcategory = {};
        var repository = new articleRepository();
        var cgrepository = new categoryRepository();
        var param = {
            id : req.body.id,
            title : req.body.title,
            content : req.body.content,
            tags : req.body.tags,
            category : req.body.category,
            oldcategory : req.body.oldcategory,
            user : req.session.user._id,
            comments :[],
            PublicTime : req.body.PublicTime
        };
        var errReturn = function(){
            isCommit = false;
            return res.redirect('/admin/article_update?id=' + req.body.id );
        };
        if( this.isnullOrundefined(param.title)){
            isCommit = false;
            this.log(true,'文章标题不能为空！',log.type.add ,req, errReturn);
        }
        if( isCommit && this.isnullOrundefined(param.content)){
            isCommit = false;
            this.log(true,'文章内容不能为空！',log.type.add ,req, errReturn);
        }
        if( isCommit && this.isnullOrundefined(param.category)){
            isCommit = false;
            this.log(true,'文章分类不能为空！',log.type.add ,req, errReturn);
        }
        if( isCommit && this.isnullOrundefined(param.PublicTime)){
            isCommit = false;
            this.log(true,'文章发布时间不能为空！',log.type.add ,req, errReturn);
        }
        if(isCommit){
            if( !this.isnullOrundefined(param.tags)){
                param.tags = this.getArraywithdeleteWhitespace(param.tags);
            }
            param.PublicTime = moment(param.PublicTime).unix();
            param.updateTime = moment().unix();

            //获取老文章数据
            repository.getById(param.id,function(err,oldarticle){
                if(err){
                    this.log(true,err.message,log.type.exception ,req, errReturn);
                }
                //获取老分类数据
                cgrepository.getById(oldarticle.category,function(err,oldcategory){
                    if(err){
                        this.log(true,err.message,log.type.exception ,req, errReturn);
                    }
                    //更新文章数据
                    repository.update(param,function(err,newarticle){
                        if(err){
                            this.log(true,err.message,log.type.exception ,req, errReturn);
                        }
                        //获取新分类数据
                        cgrepository.getById(newarticle.category,function(err,cg){
                            if(err){
                                this.log(true,err.message,log.type.exception ,req, errReturn);
                            }
                            newcategory = cg;
                            //获取新分类下的所有文章
                            var param = {category:newcategory.id,pageIndex : 1,pageSize : 10000};
                            repository.list(param,function(err,newarticles){
                                if(err){
                                    this.log(true,err.message,log.type.exception ,req, errReturn);
                                }
                                newcategory.articles = newarticles;
                                //保存新分类数据
                                cgrepository.update(newcategory,function(err,newcategory){
                                    if(err){
                                        this.log(true,err.message,log.type.exception ,req, errReturn);
                                    }
                                    if(newcategory.id === oldcategory.id){
                                        this.log(false,newarticle.toString(),log.type.update ,req, function(){
                                            req.flash('success', '保存成功!');
                                            res.redirect('/admin/article');
                                        });
                                    }
                                    else{
                                        //获取老分类下的所有文章
                                        repository.list({category:oldcategory.id},1,1000,function(err,oldarticles){
                                            if(err){
                                                this.log(true,err.message,log.type.exception ,req, errReturn);
                                            }
                                            oldcategory.articles = oldarticles;
                                            //保存老分类数据
                                            cgrepository.update(oldcategory,function(err,category){
                                                if(err){
                                                    this.log(true,err.message,log.type.exception ,req, errReturn);
                                                }
                                                this.log(false,newarticle.toString(),log.type.update ,req, function(){
                                                    req.flash('success', '保存成功!');
                                                    res.redirect('/admin/article');
                                                });
                                            }.bind(this));
                                        }.bind(this));
                                    }
                                }.bind(this));
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));

        }
    };

    /**
     * 后台文章列表
     * @param req
     * @param res
     */
    this.list = function(req,res){

    };

    /**
     * 新增评论
     * @param req
     * @param res
     */
    this.post = function(req,res){
        var err = '';
        var repository = new articleRepository();
        var comRepository = new commentRepository();
        var errReturn = function(){
            var json = {success : false,mes : err};
            res.send(JSON.stringify(json));
        };
        var param = {
            body : req.body.body,
            user : req.session.user._id
        };
        if( this.isnullOrundefined(param.body)){
            err = '回复内容不能为空！';
            this.log(true,err,log.type.add ,req, errReturn);
        }
        if( this.isnullOrundefined(req.body.article)){
            err = '参数错误！';
            this.log(true,err,log.type.add ,req, errReturn);
        }
        else{
            var param = {body:param.body, user : param.user,createTime:moment().unix(),article:req.body.article };
            comRepository.add(param,function(err,comment){
                if(err){
                    err = err.message;
                    this.log(true,err,log.type.exception ,req, errReturn);
                }
                repository.getById(req.body.article,function(err,article){
                    if(err){
                        err = err.message;
                        this.log(true,err,log.type.exception ,req, errReturn);
                    }
                    article.comments.push(comment._id);
                    repository.update(article,function(err,newarticle){
                        if(err){
                            this.log(true,err.message,log.type.exception ,req, errReturn);
                        }
                        res.redirect('/article/' + req.body.article);
                    }.bind(this));
                }.bind(this));
            }.bind(this));

        }

    };

    /**
     * 删除评论
     * @param req
     * @param res
     */
    this.deletecomment = function(req,res){

    };

    /**
     * 评论列表
     * @param req
     * @param res
     */
    this.commentlist = function(req,res){

    };
}


var art = new article();
exports.index = art.index.bind(art);
exports.showadd = art.showadd.bind(art);
exports.add = art.add.bind(art);
exports.delete = art.delete.bind(art);
exports.showupdate = art.showupdate.bind(art);
exports.update = art.update.bind(art);
exports.list = art.list.bind(art);
exports.post = art.post.bind(art);
exports.deletecomment = art.deletecomment.bind(art);
exports.commentlist = art.commentlist.bind(art);