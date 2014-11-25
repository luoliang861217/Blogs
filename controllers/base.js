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
     * @param urlformat     url格式化
     */
    this.page = function(pageIndex,pageSize,total,urlformat){
        var totalPage = Math.ceil(total / pageSize);
        var count = 3;
        var start = pageIndex < count ? 1 : pageIndex - count;
        var end = start + 5 > totalPage ? totalPage : start + 5;
        var html = '<ol class=\"page-navigator\">';
        if(pageIndex > 1 ){
            html += '<li class=\"pre\"><a href=\"'+ pageIndex + '\">«</a> </li>';
        }
        for(var i = start;i<= end; i++){
            if(pageIndex === i ){
                html += '<li class=\"current\"><a href=\"'+ i + '\">'+ i + '</a> </li>';
            }
            else{
                html += '<li><a href=\"'+ i + '\">'+ i + '</a> </li>';
            }
        }
        if(pageIndex <　totalPage ){
            html += '<li class=\"next\"><a href=\"'+ pageIndex + '\">»</a></li>';
        }
        html += '</ol>';
        return html;
    }
}

