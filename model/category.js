/**
 * 分类存储架构
 * Created by Asura on 2014/10/30.
 */

var moment = require('moment');
var db = require('../common/db');
var mongoose = db.mongoose;
var Schema = db.Schema;
var ObjectId = Schema.ObjectId;


var categorySchema = new Schema({
    //分类名称
    name : { type : String, unique:true },
    //分类缩略名
    slug : { type : String, unique:true },
    //分类描述
    description : { type : String },
    //分类父级
    parent : { type: Schema.Types.ObjectId, ref: 'Category' },
    //分类文章
    articles : [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    //创建时间
    createTime:{ type:Number,default:moment().unix()  },
    //修改时间
    UpdateTime:{ type:Number,default:moment().unix()  }
});

module.exports = mongoose.model('Category',categorySchema);





















