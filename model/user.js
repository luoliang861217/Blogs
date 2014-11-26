/**
 * 用户存储架构
 * Created by Asura on 2014/10/30.
 */

var moment = require('moment');
var db = require('../common/db');
var mongoose = db.mongoose;
var Schema = db.Schema

var userSchema = new Schema({
//用户名称
    username : {type:String, index : true},
//登录密码
    password:{type:String},
//用户邮箱
    email:{type:String , index : true},
//用户图像
    avatar:{type:String},
//用户微博
    weibo:{type:String},
//github ID
    githubId: { type: String },
//github用户名称
    githubUsername: {type: String},
//是否锁户
    is_block: {type: Boolean, default: false},
//用户积分
    score:{type:Number,default:0},
//用户级别：0:xx;1:xx；2：xx
    level:{type:Number,default:0},
//用户类型：0：普通用户；1：管理员；
    type:{type:Number,default:0},
//创建时间
    createTime:{type:Number,default:moment().unix()},
//修改时间
    UpdateTime:{type:Number,default:moment().unix()}
});

module.exports = mongoose.model('User',userSchema);

var userType = {
    /**
     * 普通
     */
    general:0,
    /**
     * 管理员
     */
    admin:1
};
module.exports.userType = userType;
var userLevel = {
    /**
     * 一级会员
     */
    one:1,
    /**
     * 二级会员
     */
    two:2
};
module.exports.userLevel = userLevel;








