/**
 * 百度UE编辑器控制器
 * Created by Asura on 2014/10/30.
 */

var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var moment = require('moment');
var settings = require('../settings');

/**
 * UEditor 控制器
 * @param req
 * @param res
 */
exports.config = function(req,res){
    var paramStr = url.parse(req.url).query;
    var param = querystring.parse(paramStr);
    if(param.action === 'config'){
        var config = require('../public/ueditor/config.js');
        console.log(config);
        res.send(JSON.stringify(config));
    }
    else if(param.action === 'uploadimage') {
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
            //UEditor返回数据格式：{"state":"SUCCESS","url":"\/usr\/uploads\/2014\/11\/21\/1416582096586061.jpg","title":"1416582096586061.jpg","original":"QQ\u56fe\u724720141120210121.jpg","type":".jpg","size":29559}
            var json = {
                'state':'SUCCESS',
                'url' : fpath,
                'title':path.substr(path.lastIndexOf('\\') + path.length - path.lastIndexOf('\\')),
                'original' : path,
                'type':lastname,
                'size' : size
            };
            from.pipe(to);
            fs.unlinkSync(req.files.upfile.path);
            res.send(JSON.stringify(json));
        });
    }
    else if(param.action === 'catchimage') {
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
            //UEditor返回数据格式：{"state":"SUCCESS","url":"\/usr\/uploads\/2014\/11\/21\/1416582096586061.jpg","title":"1416582096586061.jpg","original":"QQ\u56fe\u724720141120210121.jpg","type":".jpg","size":29559}
            var json = {
                'state':'SUCCESS',
                'url' : fpath,
                'title':path.substr(path.lastIndexOf('\\') + path.length - path.lastIndexOf('\\')),
                'original' : path,
                'type':lastname,
                'size' : size
            };
            from.pipe(to);
            fs.unlinkSync(req.files.upfile.path);
            res.send(JSON.stringify(json));
        });
    }
    else if(param.action === 'uploadfile'){
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
            //UEditor返回数据格式：{"state":"SUCCESS","url":"\/usr\/uploads\/2014\/11\/21\/1416582096586061.jpg","title":"1416582096586061.jpg","original":"QQ\u56fe\u724720141120210121.jpg","type":".jpg","size":29559}
            var json = {
                'state':'SUCCESS',
                'url' : fpath,
                'title':path.substr(path.lastIndexOf('\\') + path.length - path.lastIndexOf('\\')),
                'original' : path,
                'type':lastname,
                'size' : size
            };
            from.pipe(to);
            fs.unlinkSync(req.files.upfile.path);
            res.send(JSON.stringify(json));
        });
    }
    else if(param.action === 'uploadvideo'){
        //action=listimage&start=0&size=20&noCache=1416746287808
        var fpath =  'upload\\video\\' ;
        var filepath = headpath + fpath + moment().format('YYYYMMDDHHmmss') + lastname;
        var size = req.files.upfile.size;
        fs.exists(headpath + fpath, function (exists) {
            if(!exists){
                fs.mkdirSync(headpath + fpath,{ flags: 'w',autoClose: true});
            }
            var from = fs.createReadStream(path,{ flags: 'r',autoClose: true });
            var to = fs.createWriteStream(filepath,{ flags: 'w',autoClose: true });
            //UEditor返回数据格式：{"state":"SUCCESS","url":"\/usr\/uploads\/2014\/11\/21\/1416582096586061.jpg","title":"1416582096586061.jpg","original":"QQ\u56fe\u724720141120210121.jpg","type":".jpg","size":29559}
            var json = {
                'state':'SUCCESS',
                'url' : fpath,
                'title':path.substr(path.lastIndexOf('\\') + path.length - path.lastIndexOf('\\')),
                'original' : path,
                'type':lastname,
                'size' : size
            };
            from.pipe(to);
            fs.unlinkSync(req.files.upfile.path);
            res.send(JSON.stringify(json));
        });
    }
    else if(param.action === 'listimage'){
        //action=listimage&start=0&size=20&noCache=1416746287808
//        {"state":"SUCCESS","list":[
//            {"url":"\/usr\/uploads\/2014\/10\/1414631929374600.png","mtime":1414631929},
//            {"url":"\/usr\/uploads\/2014\/10\/1066371918.jpg","mtime":1414116613}
//        ],"start":"0","total":81}
        var path = settings.uploadpath + 'public\\upload\\image\\' ;
        var urlroot = '/upload/image/';
        var dirList = fs.readdirSync( path);
        var list = [];
        var total = 0;
        dirList.forEach(function(item){
            var stat = fs.lstatSync(path  + item);;
            if(stat.isFile()){
                list.push({url : urlroot + item , mtime: moment(stat.mtime).format('X')});
                total++;
            }
        });
        //排序
        list.sort(createComparsionFunction("mtime"));
        var json = {state:'SUCCESS',list : list,start:'0',total:total.toString()};
        res.send(JSON.stringify(json));
    }
    else if(param.action === 'listfile'){
        //action=listimage&start=0&size=20&noCache=1416746287808
//        {"state":"SUCCESS","list":[
//            {"url":"\/usr\/uploads\/2014\/10\/1414631929374600.png","mtime":1414631929},
//            {"url":"\/usr\/uploads\/2014\/10\/1066371918.jpg","mtime":1414116613}
//        ],"start":"0","total":81}
        var path = settings.uploadpath + 'public\\upload\\file\\' ;
        var urlroot = '/upload/file/';
        var dirList = fs.readdirSync( path);
        var list = [];
        var total = 0;
        dirList.forEach(function(item){
            var stat = fs.lstatSync(path  + item);;
            if(stat.isFile()){
                console.log(urlroot + item);
                list.push({url : urlroot + item , mtime: moment(stat.mtime).format('X')});
                total++;
            }
        });
        //排序,反序
        list.sort(createComparsionFunction("mtime",true));
        var json = {state:'SUCCESS',list : list,start:'0',total:total.toString()};
        res.send(JSON.stringify(json));
    }
};


/**
 * 排序
 * @param propertyName  排序字段
 * @param desc          true:反序；false:升序
 * @returns {Function}
 */
function createComparsionFunction(propertyName,isDesc)
{
    return function(object1, object2)
    {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2)
        {
            return isDesc ? 1 : -1; //-1
        } else if (value1 > value2)
        {
            return isDesc ? -1 : 1;; //1
        } else
        {
            return 0;
        }
    }
}

