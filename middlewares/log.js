/**
 * Created by Asura on 2014/10/30.
 */
/**
 * Created by Asura on 2014/10/30.
 */


var logRepository = require('../Repository/logRepository');

/**
 * 访问日志
 * @param req
 * @param res
 * @param next
 */
exports.accessLog = function(req,res,next){
    console.log('OK');
//    var param = {
//        content : '访问',
//        url : req.url.toString(),
//        level : 0
//    };
//    logRepository.add(param,function(err,log){
//        next();
//    });
};
