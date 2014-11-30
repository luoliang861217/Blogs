/**
 * 评论伪仓储，之后会增加类似仓储接口的设计，达到按照接口编程
 * Created by Administrator on 2014/11/12.
 */


var moment = require('moment');
var Comment = require('../model/comment');

module.exports = function(){
    /**
     * 添加数据
     * @param param     添加原对象
     * @param callback  回调函数
     */
    this.add = function(param,callback){
        var comment = new Comment({
            body : param.body,
            createTime : param.createTime,
            article : param.article,
            user : param.user
        });
        comment.save(callback);
    };

    /**
     * 删除数据
     * @param id        指定ID
     * @param callback  回调函数
     */
    this.findByIdAndRemove = function(id,callback){
        Comment.findByIdAndRemove(id,callback);
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
            result.body = param.body;
            result.article = param.article;
            result.user = param.user;
            result.save(callback);
        });
    };

    /**
     * 查找数据
     * @param id        指定ID
     * @param callback  回调函数
     */
    this.getById = function(id,callback){
        Comment.findOne({ _id : id }).populate('article').populate('user').exec(callback);
    };


    /**
     * 查找数据 使用文章回复字段数组进行分页 开始位置，长度 t.find( { x : { $elemMatch : { a : 1, b : { $gt : 1 } } } } )
     * @param param     查询参数
     * @param callback  回调函数
     */
    this.getArticleCommentById = function(param,callback){
//        var start = (param.pageIndex - 1 ) * param.pageSize;
//        var end = param.pageSize === undefined ? 10 : param.pageSize;
//        Article.findOne({ _id : param.id }).populate('category').populate('user').exec(function(err,results){
//            if(err){
//                callback(err);
//            }
//            param.Total = results.comments.length;
//            Article.findOne({ _id : param.id },{ comments:{$slice : [start,end]}}).populate('category').populate('user').exec(callback);
//        });

    };
    /**
     * 最近发布的文章
     * @param param
     * @param callback
     */
    this.getLastPublishArticle = function(param,callback){
        var query = {};
        Comment.find(query).sort({"createTime":-1}).limit(param.pageSize).populate('article').populate('user').exec(callback);
    };

    /**
     * 最近得到的回复
     * @param param
     * @param callback
     */
    this.getLastCommentsArticle = function(param,callback){
        var query = {};
        if(param.id){
            query['_id'] = param.id;
        }
        Comment.find(query).sort({"createTime":-1}).limit(param.pageSize).populate('article').populate('user').exec(callback);
    };

    /**
     * 文章列表
     * @param param     查询条件
     * @param pageIndex 页码
     * @param pageSize  页大小
     * @param callback  回调函数
     */
    this.list = function(param,callback){
        var query = {};
        var skip = (param.pageIndex - 1 ) * param.pageSize;
        if(param.id){
            query['_id'] = param.id;
        }
        if(param.title){
            query['body'] = param.body;
        }
        if(param.slug){
            query['article'] = param.article;
        }

        if(param.user){
            query['user'] = param.user;
        }
        Comment.count(query,function(err,count){
            if(err){
                callback(err);
            }
            param.Total = count;
            Comment.find(query).skip(skip).limit(param.pageSize).populate('article').populate('user').exec(callback);
        });

    };
}