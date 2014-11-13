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
    exception:5,
    /**
     * 非法访问
     */
    illegal:6
};
exports.type = Type;

function Log(){
    /**
     * 写日志
     * @param content   内容
     * @param level     日志级别
     * @param url       url
     * @param callback  回调函数
     */
    this.writelog = function(content,level,req,callback){
        var user = req.session.user;
        var param = {
            content : content,
            url : req.url.toString(),
            host : req.host.toString(),
            level : level
        };
        if( user ){
            param.user = user._id ;
        }
        logRepository.add(param,callback);
    };

}

var log = new Log();
exports.writelog = log.writelog;

