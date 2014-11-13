/**
 * Created by Asura on 2014/11/13.
 */



var logRepository = require('../Repository/logRepository');

var Type = {
    /**
     * 常规访问
     */
    normal:0,
    /**
     * 添加操作
     */
    add:1 ,
    /**
     * 删除操作
     */
    delete:2,
    /**
     * 更新操作
     */
    updata:3,
    /**
     * 查看操作
     */
    list:4,
    /**
     * 异常错误
     */
    exception:5
};
exports.type = Type;

function Error(){
    /**
     * 写日志
     * @param content   内容
     * @param level     日志级别
     * @param url       url
     * @param callback  回调函数
     */
    this.writelog = function(content,level,req,callback){
        var param = {
            content : content,
            url : req.url.toString(),
            level : level
        };
        logRepository.add(param,function(err,log){
            req.flash('error',content);
            callback();
        });
    };

}

var error = new Error();
exports.writelog = error.writelog;

