/**
 * 日志伪仓储，之后会增加类似仓储接口的设计，达到按照接口编程
 * Created by Administrator on 2014/11/13.
 */

var Log = require('../model/log');
var settings = require('../settings');


function LogRepository(){

    /**
     * 添加数据
     * @param param     添加原对象
     * @param callback  回调函数
     */
    this.add = function(param,callback){
        if(settings.isLog){
            var user = new Log({
                content : param.content,
                url : param.url,
                host : param.host,
                level : param.level,
                user : param.user
            });
            user.save(callback);
        }
    };

    this.list = function(param,pageIndex,pageSize,callback){
        var qurey = {};
        var skip = (pageIndex - 1 ) * pageSize;
        if(param.content){
            qurey['content'] = param.id;
        }
        if(param.url){
            qurey['url'] = param.url;
        }
        if(param.level){
            qurey['level'] = param.level;
        }
        if(param.user){
            qurey['user'] = param.user;
        }

        Log.find(qurey).skip(skip).limit(pageSize).exec(callback);
    };
}

var logRepository = new LogRepository();
exports.add = logRepository.add;
exports.list = logRepository.list;