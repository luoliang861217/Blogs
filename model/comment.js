/**
 * Created by Asura on 2014/10/30.
 */

var moment = require('moment');
var db = require('../common/db');
var mongoose = db.mongoose;
var Schema = db.Schema;
var ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
    body: String,
    createTime:{type:Number,default:moment().unix()},
    article : { type: Schema.Types.ObjectId, ref: 'Article' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Comment',commentSchema);








