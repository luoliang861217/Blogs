/**
 * Simditor编辑器控制器
 * Created by Asura on 2014/10/30.
 */

var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var moment = require('moment');
var settings = require('../settings');

/**
 * 上传图片
 * @param req
 * @param res
 */
exports.uploadimage = function(req,res){
    var paramStr = url.parse(req.url).query;
    var param = querystring.parse(paramStr);
    var path = req.files.upfile.path;
    var index = req.files.upfile.name.lastIndexOf('.');
    var lastname = req.files.upfile.name.substr(index, req.files.upfile.name.length - index);//后缀名
    var headpath = settings.uploadpath + 'public\\' ;
    var fpath =  'upload\\image\\' ;
    var filepath = headpath + fpath + moment().format('YYYYMMDDHHmmss') + lastname;
    var size = req.files.upfile.size;
    fs.exists(headpath + fpath, function (exists) {
        if(!exists){
            fs.mkdirSync(headpath + fpath,{ flags: 'w',autoClose: true});
        }
        var from = fs.createReadStream(path,{ flags: 'r',autoClose: true });
        var to = fs.createWriteStream(filepath,{ flags: 'w',autoClose: true });
        //返回数据格式：{ "success": true/false,"msg": "上传失败信息", # 可选 "file_path": "[real file path]"}
        var json = {
            'success':'true',
            'msg' : '上传失败信息', /** 可选 */
            'file_path' : fpath
        };
        from.pipe(to);
        fs.unlinkSync(req.files.upfile.path);
        res.send(JSON.stringify(json));
    });
};


/**
 * 上传附件
 * @param req
 * @param res
 */
exports.uploadfile = function(req,res){
    var paramStr = url.parse(req.url).query;
    var param = querystring.parse(paramStr);
    var path = req.files.upfile.path;
    var index = req.files.upfile.name.lastIndexOf('.');
    var lastname = req.files.upfile.name.substr(index, req.files.upfile.name.length - index);//后缀名
    var headpath = settings.uploadpath + 'public\\' ;
    var fpath =  'upload\\file\\' ;
    var filepath = headpath + fpath + moment().format('YYYYMMDDHHmmss') + lastname;
    var size = req.files.upfile.size;
    fs.exists(headpath + fpath, function (exists) {
        if(!exists){
            fs.mkdirSync(headpath + fpath,{ flags: 'w',autoClose: true});
        }
        var from = fs.createReadStream(path,{ flags: 'r',autoClose: true });
        var to = fs.createWriteStream(filepath,{ flags: 'w',autoClose: true });
        //返回数据格式：{ "success": true/false,"msg": "上传失败信息", # 可选 "file_path": "[real file path]"}
        var json = {
            'success':'true',
            'msg' : '上传失败信息', /** 可选 */
            'file_path' : fpath
        };
        from.pipe(to);
        fs.unlinkSync(req.files.upfile.path);
        res.send(JSON.stringify(json));
    });
};