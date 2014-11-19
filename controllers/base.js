/**
 * Created by Liang on 2014/11/16.
 */

var log = require('../common/log');

module.exports = function(){
    this.name = '我是一个人';

    this.talk = function(str){
        console.log(this.name + '说：' + str);
    };

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

    /**
     *
     * @param array
     * @returns {*}
     */
    this.deleteWhitespaceOfArray = function(array){
        for(var i = 0; i < array.length; i++) {
            if(array[i].length == 0) array.splice(i,1);
        }
        return array;
    };

    /**
     * 判断是否为空
     * @param str
     * @returns {boolean}
     */
    this.isnullOrundefined = function (str) {
        if( str === undefined || str.length < 1){
            return true;
        }
        str = this.toString().replace(/(^\s*)|(\s*$)/g, "");
        if(!str || str === undefined || str === ''){
            return true;
        }
        else{
            return false;
        }
    }
}

