/**
 * 分类伪仓储，之后会增加类似仓储接口的设计，达到按照接口编程
 * Created by Administrator on 2014/11/12.
 */

//var db = require('../common/db');
//var mongoose = db.mongoose;
//var Schema = db.Schema;


var moment = require('moment');
var Category = require('../model/category');

module.exports = function(){

    /**
     * 添加数据
     * @param param     添加原对象
     * @param callback  回调函数
     */
    this.add = function(param,callback){
        var category = new Category({
            name : param.name,
            slug : param.slug,
            description : param.description
        });
        if( param.parent && param.parent != ''){
            category.parent = param.parent;
        }
        category.save(callback);
    };

    /**
     * 删除数据
     * @param id        指定ID
     * @param callback  回调函数
     */
    this.findByIdAndRemove = function(id,callback){
        Category.findByIdAndRemove(id,callback);
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
            if(param.name){
                result.name = param.name;
            }
            if(param.slug){
                result.slug = param.slug;
            }
            if(param.description){
                result.description = param.description;
            }
            if(param.articles != undefined){
                result.articles = param.articles;
            }
            result.updateTime = moment().unix();
            if(param.parent && param.parent != ''){
                result.parent = param.parent;
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
        Category.findOne({ _id : id }).populate('parent').exec(callback);
    };

    /**
     * 分类列表
     * @param param     查询条件
     * @param pageIndex 页码
     * @param pageSize  页大小
     * @param callback  回调函数
     */
    this.list = function(param,callback){
        var qurey = {};
        var skip = (param.pageIndex - 1 ) * param.pageSize;
        if(param.id){
            qurey['_id'] = param.id;
        }
        if(param.name){
            qurey['name'] = param.name;
        }
        if(param.slug){
            qurey['slug'] = param.slug;
        }
        if(param.description){
            qurey['description'] = param.description;
        }

        /**
         * articles属性由关系维护自动加载
         */
        Category.count(qurey,function(err,count){
            if(err){
                callback(err);
            }
            param.Total = count;
            Category.find(qurey).skip(skip).limit(param.pageSize).populate('parent').exec(callback);
        });
    };

}