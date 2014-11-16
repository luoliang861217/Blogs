/**
 * Created by Liang on 2014/11/16.
 */

var log = require('../common/log');

module.exports = function(){

    /**
     * 写日志
     * @param isflash   是否写flash
     * @param content   内容
     * @param level     日志级别
     * @param url       url
     * @param callback  回调函数
     */
    this.log = function(isflash,content,level,req,callback){
        if(isflash){
            req.flash('error',content);
        }
        log.writelog(content,level,req,callback);
    };

}

