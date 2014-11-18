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
            result.name = param.name;
            result.slug = param.slug;
            result.description = param.description;
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

        Category.findOne({ _id : id },callback);
    };
    /**
     * 分类列表
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
        if(param.description){
            qurey['description'] = param.description;
        }

        Category.find(qurey).skip(skip).limit(pageSize).populate('parent').exec(callback);
    };

}