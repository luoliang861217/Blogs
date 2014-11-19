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
            content : param.content,
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
            result.content = param.content;
            result.article = param.article;
            result.user = param.user;
            result.updateTime = moment().unix();
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
     * 评论列表
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
        if(param.content){
            qurey['content'] = param.content;
        }
        if(param.article){
            qurey['article'] = param.article;
        }
        if(param.user){
            qurey['user'] = param.user;
        }
        if(param.createTime){
            qurey['createTime'] = param.createTime;
        }
        Comment.find(qurey).skip(skip).limit(pageSize).populate('article').populate('user').exec(callback);
    };

}