/**
 * 日志存储架构
 * Created by Asura on 2014/11/13.
 */

var moment = require('moment');
var db = require('../common/db');
var mongoose = db.mongoose;
var Schema = db.Schema

var logSchema = new Schema({
//日志内容
    content : { type:String ,index : true},
//请求URL
    url : { type:String ,index : true},
//IP地址
    host : { type:String ,index : true},
//用户
    user:{ type: Schema.Types.ObjectId, ref: 'User' },
//日志级别：0:普通访问;1:增加；2：删除；3：修改；4：查；5：异常;6:非法访问;
    level:{type:Number,default:0 ,index : true},
//创建时间
    createTime:{type:Number,default:moment().unix() ,index : true}
});

module.exports = mongoose.model('Log',logSchema);








