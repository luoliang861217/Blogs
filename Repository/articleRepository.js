/**
 * 文章伪仓储，之后会增加类似仓储接口的设计，达到按照接口编程
 * Created by Administrator on 2014/11/12.
 */


var moment = require('moment');
var Article = require('../model/article');

module.exports = function(){
    /**
     * 添加数据
     * @param param     添加原对象
     * @param callback  回调函数
     */
    this.add = function(param,callback){
        var article = new Article({
            title : param.title,
            content : param.content,
            tags : param.tags,
            user : param.user,
            category : param.category,
            comments : param.comments,
            PublicTime : param.PublicTime
        });
        article.save(callback);
    };

    /**
     * 删除数据
     * @param id        指定ID
     * @param callback  回调函数
     */
    this.findByIdAndRemove = function(id,callback){
        Article.findByIdAndRemove(id,callback);
    };

    /**
     * 更新数据
     * @param param     更新原对象
     * @param callback  回调函数
     */
    this.update = function(param,callback){
        this.getById(param.id,function(err,result){
            if(err){
                callback(err);
            }
            result.title = param.title;
            result.content = param.content;
            result.tags = param.tags;
            result.user = param.user;
            result.category = param.category;
            result.comments = param.comments;
            result.PublicTime = param.PublicTime;
            result.updateTime = param.updateTime;
            result.save(callback);
        });
    };

    /**
     * 查找数据
     * @param id        指定ID
     * @param callback  回调函数
     */
    this.getById = function(id,callback){
        Article.findOne({ _id : id }).populate('category').populate('user').populate('comments.user').exec(callback);
    };
    /**
     * 查找数据 使用文章回复字段数组进行分页 开始位置，长度
     * @param param     查询参数
     * @param callback  回调函数
     */
    this.getArticleCommentById = function(param,callback){
        var start = (param.pageIndex - 1 ) * param.pageSize;
        var end = param.pageSize === undefined ? 10 : param.pageSize;
        Article.findOne({ _id : param.id }).populate('category').populate('user').populate('comments.user').exec(function(err,results){
            if(err){
                callback(err);
            }
            param.Total = results.comments.length;
            Article.findOne({ _id : param.id },{ comments:{$slice : [start,end]}}).populate('category').populate('user').populate('comments.user').exec(callback);
        });

    };

    /**
     * 文章列表
     * @param param     查询条件
     * @param pageIndex 页码
     * @param pageSize  页大小
     * @param callback  回调函数
     */
    this.list = function(param,pageIndex,pageSize,callback){
        var qurey = {};
        var skip = (pageIndex - 1 ) * pageSize;
        if(param.id){
            qurey['_id'] = param.id;
        }
        if(param.title){
            qurey['title'] = param.title;
        }
        if(param.slug){
            qurey['content'] = param.content;
        }

        if(param.user){
            qurey['user'] = param.user;
        }

        if(param.tags){
            qurey['tags'] = param.tags;
        }
        if(param.category){
            qurey['category'] = param.category;
        }

        if(param.PublicTime){
            qurey['PublicTime'] = param.PublicTime;
        }
        Article.find(qurey).skip(skip).limit(pageSize).populate('category').populate('user').populate('comments.user').exec(callback);
    };
}