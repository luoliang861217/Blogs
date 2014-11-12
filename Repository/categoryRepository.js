/**
 * Created by Administrator on 2014/11/12.
 */

//var db = require('../common/db');
//var mongoose = db.mongoose;
//var Schema = db.Schema;


var model = require('../model/category');

module.exports = function(){

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

        model.find(qurey).skip(skip).limit(pageSize).populate('parent').exec(callback);
    };

    this.findByIdAndRemove = function(id,callback){
        model.findByIdAndRemove(id,callback);
    };

    this.add = function(){

    };

}