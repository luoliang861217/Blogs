/**
 * Created by Administrator on 2014/11/12.
 */


var User = require('../model/user');

module.exports = function(){

    /**
     * 添加数据
     * @param param     添加原对象
     * @param callback  回调函数
     */
    this.add = function(param,callback){
        var user = new User({
            username : param.username,
            password : param.password,
            email : param.email,
            avatar : 'img/avatar.jpg'
        });
        user.save(callback);
    };

    /**
     * 删除数据
     * @param id        指定ID
     * @param callback  回调函数
     */
    this.findByIdAndRemove = function(id,callback){
        User.findByIdAndRemove(id,callback);
    };

    /**
     * 更新数据
     * @param param     更新原对象
     * @param callback  回调函数
     */
    this.update = function(param,callback){
        this.getById(param.id,function(err,result){
            if(err){
                callback(err);
            }
            result.username = param.username;
            result.password = param.password;
            result.email = param.email;
            result.UpdateTime = Date.now;
            result.save(callback);
        });
    };

    /**
     * 查找数据
     * @param id        指定ID
     * @param callback  回调函数
     */
    this.getById = function(id,callback){

        User.findOne({ _id : id },callback);
    };

    this.getByuserName = function(username,callback) {

        User.findOne({ username: username }, callback);
    };

    /**
     * 分类列表
     * @param param     查询条件
     * @param pageIndex 页码
     * @param pageSize  页大小
     * @param callback  回调函数
     */
    this.list = function(param,pageIndex,pageSize,callback){
        var qurey = {};
        var skip = (pageIndex - 1 ) * pageSize;
        if(param.id){
            qurey['_id'] = param.id;
        }
        if(param.name){
            qurey['username'] = param.username;
        }
        if(param.slug){
            qurey['email'] = param.email;
        }

        User.find(qurey).skip(skip).limit(pageSize).exec(callback);
    };

}