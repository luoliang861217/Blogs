/**
 * Created by Asura on 2014/10/30.
 */

var db = require('../common/db');
var mongoose = db.mongoose;
var Schema = db.Schema;
var ObjectId = Schema.ObjectId;

var articleSchema = new Schema({
//文章标题
    name : {type : String, unique:true },
//文章内容
    slug : {type : String},
//文章标签
    tags : [{ type : String }],
//文章所属分类
    category : { type: Schema.Types.ObjectId, ref: 'Category' },
//创建时间
    createTime:{type:Date,default:Date.now},
//修改时间
    updateTime:{type:Date,default:Date.now},
//发布时间
    PublicTime:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Article',articleSchema);








