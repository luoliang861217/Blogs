/**
 * Created by Asura on 2014/10/30.
 */

var db = require('../common/db');
var mongoose = db.mongoose;
var Schema = db.Schema;
var ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
//评论内容
    content : {type : String},
//评论所属文章
    article : { type: Schema.Types.ObjectId, ref: 'Article' },
//评论所属用户
    user : { type: Schema.Types.ObjectId, ref: 'User' },
//创建时间
    createTime:{type:Date,default:Date.now},
//修改时间
    updateTime:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Comment',commentSchema);








