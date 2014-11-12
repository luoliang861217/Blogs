/**
 * Created by Asura on 2014/10/30.
 */

//获取配置
exports.config = function(req,res){
    var config = require('../public/ueditor/config.js');
    console.log(config);
    res.send(JSON.stringify(config));
};

//上传图片
exports.uploadimage = function(req,res){
    var config = require('../public/ueditor/config.js');
    console.log(config);
    res.send(JSON.stringify(config));
};

//上传涂鸦
exports.uploadscrawl = function(req,res){
    var config = require('../public/ueditor/config.js');
    console.log(config);
    res.send(JSON.stringify(config));
};
//上传视频
exports.uploadvideo = function(req,res){
    var config = require('../public/ueditor/config.js');
    console.log(config);
    res.send(JSON.stringify(config));
};

//上传文件
exports.uploadfile = function(req,res){
    var config = require('../public/ueditor/config.js');
    console.log(config);
    res.send(JSON.stringify(config));
};

//列出图片
exports.listimage = function(req,res){
    var config = require('../public/ueditor/config.js');
    console.log(config);
    res.send(JSON.stringify(config));
};

//列出文件
exports.listfile = function(req,res){
    var config = require('../public/ueditor/config.js');
    console.log(config);
    res.send(JSON.stringify(config));
};

//抓取远程文件
exports.catchimage = function(req,res){
    var config = require('../public/ueditor/config.js');
    console.log(config);
    res.send(JSON.stringify(config));
};