/**
 * Created by Asura on 2014/10/30.
 */

var log = require('../common/log');

/**
 * 访问日志
 * @param req
 * @param res
 * @param next
 */
exports.accessLog = function(req,res,next){
    log.writelog('访问',log.type.normal,req,function(err,log){
        next();
    });
};
