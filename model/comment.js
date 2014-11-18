/**
 * Created by Asura on 2014/10/30.
 */

var moment = require('moment');
var db = require('../common/db');
var mongoose = db.mongoose;
var Schema = db.Schema;
var relationship = db.relationship;
var ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
//评论内容
    content : {type : String},
//评论所属文章
    article : { type: Schema.Types.ObjectId, ref: 'Article',childPath:'comments'  },
//评论所属用户
    user : { type: Schema.Types.ObjectId, ref: 'User' },
//创建时间
    createTime:{type:Number,default:moment().unix() },
//修改时间
    updateTime:{type:Number,default:moment().unix() }
});
commentSchema.plugin(relationship, { relationshipPathName : 'article' });
module.exports = mongoose.model('Comment',commentSchema);








