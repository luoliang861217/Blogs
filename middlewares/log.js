/**
 * Created by Asura on 2014/10/30.
 */

var error = require('../common/err');

/**
 * 访问日志
 * @param req
 * @param res
 * @param next
 */
exports.accessLog = function(req,res,next){
    error.writelog('访问',error.type.normal,req,function(err,log){
        next();
    });
};
