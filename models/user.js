/**
 * Created by Asura on 2014/10/30.
 */

var db = require('../common/db');
var mongoose = db.mongoose;
var Schema = db.Schema

var userSchema = new Schema({
//用户名称
    username : {type:String, unique:true},
//登录名称(显示名称)
    loginname:{type : String , unique:true},
//登录密码
    password:{type:String},
//用户邮箱
    email:{type:String , unique:true},
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
    createTime:{type:Date,default:Date.now},
//修改时间
    UpdateTime:{type:Date,default:Date.now}
});

exports.User = mongoose.model('User',userSchema);








