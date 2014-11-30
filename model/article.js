/**
 * Created by Asura on 2014/10/30.
 */

var moment = require('moment');
var db = require('../common/db');
var mongoose = db.mongoose;
var Schema = db.Schema;
var ObjectId = Schema.ObjectId;

var articleSchema = new Schema({
//文章标题
    title : {type : String, unique:true },
//文章内容
    content : {type : String},
//文章标签
    tags : [{ type : String }],
//文章所属分类
    category : { type: Schema.Types.ObjectId, ref: 'Category'  },
//文章所属用户
    user : { type: Schema.Types.ObjectId, ref: 'User' },
//文章所有评论
    comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
//创建时间
    createTime:{type:Number,default:moment().unix() },
//修改时间
    updateTime:{type:Number,default:moment().unix() },
//发布时间
    PublicTime:{type:Number,default:moment().unix() }
});

module.exports = mongoose.model('Article',articleSchema);