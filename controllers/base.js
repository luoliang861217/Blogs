/**
 * Created by Liang on 2014/11/16.
 */

var log = require('../common/log');
var Q = require('q');

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
     * 删除空白符数组
     * @param array
     * @returns {*}
     */
    this.getArraywithdeleteWhitespace = function(str){
        str = str.toString().replace(/(^\s*)|(\s*$)/g, "");
        var array = str.split(" ");
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
    this.isnullOrundefined = function (obj) {
        if( obj === undefined || obj == null || obj.length < 1){
            return true;
        }
        obj = this.toString().replace(/(^\s*)|(\s*$)/g, "");
        if(!obj || obj === ''){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * 分页
     * @param pageIndex 页码
     * @param pageSize  也大小
     * @param total     总数
     * @param url       url
     */
    this.page = function(pageIndex,pageSize,total,url,pageclass){
        var str = url + '?pageIndex={0}' + '&pageSize={1}';
        var totalPage = Math.ceil(total / pageSize);
        var count = 3;
        var start = pageIndex < count ? 1 : (pageIndex - count < 1 ? 1 : pageIndex - count);
        var end = start + 5 > totalPage ? totalPage : start + 5;
        var html = '<ol class=\"' + pageclass + '\">'; //page-navigator
        if(pageIndex > 1 ){
            html += '<li class=\"pre\"><a href=\"'+ url + '?pageIndex='+ (pageIndex - 1) + '&pageSize='+ pageSize + '\">«</a> </li>';
        }
        for(var i = start;i<= end; i++){
            if(pageIndex === i ){
                html += '<li class=\"current\"><a href=\"javascript:void(0)\">'+ i + '</a> </li>';
            }
            else{
                html += '<li><a href=\"'+ url + '?pageIndex='+ i + '&pageSize='+ pageSize +  '\">'+ i + '</a> </li>';
            }
        }
        if(pageIndex <totalPage){
            html += '<li class=\"next\"><a href=\"'+ url + '?pageIndex='+ (pageIndex + 1) + '&pageSize='+ pageSize +  '\">»</a></li>';
        }
        html += '</ol>';
        return html;
    }


    /**
     * 使用Q.defer()构造promise实例
     * @param func  函数名称
     * @param param 函数参数
     * @returns {*}
     */
    this.promise = function(func,param){
        var defered = Q.defer();
        func(param,function(err,result){
            if(!err){
                defered.resolve(result);
            }
            else{
                defered.reject(err);
            }
        });
        return defered.promise;
    };
}

