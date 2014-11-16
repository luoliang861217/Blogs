/**
 * 文章伪仓储，之后会增加类似仓储接口的设计，达到按照接口编程
 * Created by Administrator on 2014/11/12.
 */


var Article = require('../model/article');

module.exports = function(){
    /**
     * 添加数据
     * @param param     添加原对象
     * @param callback  回调函数
     */
    this.add = function(param,callback){
        var article = new Category({
            name : param.name,
            slug : param.slug,
            tags : param.tags,
            PublicTime : param.PublicTime
        });
        if( param.category && param.category != ''){
            category.category = param.category;
        }
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
            result.name = param.name;
            result.slug = param.slug;
            result.tags = param.tags;
            result.PublicTime = param.PublicTime;
            result.updateTime = Date.now;
            if(param.category && param.category != ''){
                result.category = param.category;
            }
            result.save(callback);
        });
    };

    /**
     * 查找数据
     * @param id        指定ID
     * @param callback  回调函数
     */
    this.getById = function(id,callback){

        Article.findOne({ _id : id },callback);
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
        if(param.name){
            qurey['name'] = param.name;
        }
        if(param.slug){
            qurey['slug'] = param.slug;
        }
        if(param.tags){
            qurey['tags'] = param.tags;
        }

        Article.find(qurey).skip(skip).limit(pageSize).populate('parent').exec(callback);
    };

}