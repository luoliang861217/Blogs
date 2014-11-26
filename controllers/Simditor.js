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
    var uptemppath = req.files.upfile.path; //上传至客服端临时文件路径
    var index = req.files.upfile.name.lastIndexOf('.');
    var lastname = req.files.upfile.name.substr(index, req.files.upfile.name.length - index);//后缀名
    var headpath = __dirname + '\public\\' ;   //服务端存储跟路径
    var fpath =  'upload\\image\\' ;    //服务端存储相对路径目录
    var filename =  moment().format('YYYYMMDDHHmmss') + lastname;   //文件名称
    var serverfilepathDir = headpath + fpath ;                     //服务端存储目录
    var serverfilepath = serverfilepathDir + filename ;                     //服务端存储目录
    var urlroot = '/upload/image/';             //url目录
    var urlfilepath = urlroot + filename;       //url文件路径
    var json = {};
    try{
        fs.exists(serverfilepathDir, function (exists) {
            if(!exists){
                fs.mkdirSync(serverfilepathDir,{ flags: 'w',autoClose: true});
            }
            var from = fs.createReadStream(uptemppath,{ flags: 'r',autoClose: true });
            var to = fs.createWriteStream(serverfilepath ,{ flags: 'w',autoClose: true });
            //返回数据格式：{ "success": true/false,"msg": "上传失败信息", # 可选 "file_path": "[real file path]"}
            var json = {};
            json.success = 'true';
            json.file_path = urlfilepath;
            from.pipe(to);
            fs.unlinkSync(uptemppath);
            res.send(JSON.stringify(json));
        });
    }catch (e){
        var json = {};
        json.success = 'false';
        json.msg = e.message;
        fs.unlinkSync(uptemppath);
        res.send(JSON.stringify(json));
    }
};


/**
 * 上传附件
 * @param req
 * @param res
 */
exports.uploadfile = function(req,res){
    var paramStr = url.parse(req.url).query;
    var param = querystring.parse(paramStr);
    var uptemppath = req.files.upfile.path; //上传至客服端临时文件路径
    var index = req.files.upfile.name.lastIndexOf('.');
    var lastname = req.files.upfile.name.substr(index, req.files.upfile.name.length - index);//后缀名
    var headpath = __dirname + '\public\\' ;   //服务端存储跟路径
    var fpath =  'upload\\file\\' ;    //服务端存储相对路径目录
    var filename =  moment().format('YYYYMMDDHHmmss') + lastname;   //文件名称
    var serverfilepathDir = headpath + fpath ;                     //服务端存储目录
    var serverfilepath = serverfilepathDir + filename ;                     //服务端存储目录
    var urlroot = '/upload/file/';             //url目录
    var urlfilepath = urlroot + filename;       //url文件路径
    try{
        fs.exists(serverfilepathDir, function (exists) {
            if(!exists){
                fs.mkdirSync(serverfilepathDir,{ flags: 'w',autoClose: true});
            }
            var from = fs.createReadStream(uptemppath,{ flags: 'r',autoClose: true });
            var to = fs.createWriteStream(serverfilepath ,{ flags: 'w',autoClose: true });
            //返回数据格式：{ "success": true/false,"msg": "上传失败信息", # 可选 "file_path": "[real file path]"}
            var json = {};
            json.success = 'true';
            json.file_path = urlfilepath;
            from.pipe(to);
            fs.unlinkSync(uptemppath);
            res.send(JSON.stringify(json));
        });
    }
    catch (e){
        var json = {};
        json.success = 'false';
        json.msg = e.message;
        fs.unlinkSync(uptemppath);
        res.send(JSON.stringify(json));
    }
};