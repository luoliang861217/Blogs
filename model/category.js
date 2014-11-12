/**
 * Created by Asura on 2014/10/30.
 */
//
//var db = require('../common/db');
//var mongoose = db.mongoose;
//var Schema = db.Schema;
//var ObjectId = Schema.ObjectId;
//
//var categorySchema = new Schema({
////分类名称
//    name : {type : String, unique:true },
////分类缩略名
//    slug : {type : String, unique:true },
////分类描述
//    description : { type : String },
////分类父级
//    parent : { type : String }, /* [{ type: Schema.Types.ObjectId, ref: 'Category' }], */
////文章数量
//    count : {type:Number,default:0},
////创建时间
//    createTime:{type:Date,default:Date.now},
////修改时间
//    UpdateTime:{type:Date,default:Date.now}
//});
//
//exports.Category = mongoose.model('Category',categorySchema);
//
//exports.ObjectId = ObjectId;



/**
 * Created by Asura on 2014/10/30.
 */

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
    parent : [{ type: Schema.Types.ObjectId, ref: 'Category' }], /* , */
    //文章数量
    count : { type:Number,default:0 },
    //创建时间
    createTime:{ type:Date,default:Date.now },
    //修改时间
    UpdateTime:{ type:Date,default:Date.now }
});

module.exports = mongoose.model('Category',categorySchema);





















