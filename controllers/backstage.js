/**
 * Created by Asura on 2014/10/30.
 */


var util = require('util');
var base = require('./base');
var settings = require('../settings');
var log = require('../common/log');

//自定义变量
var title = ' - '+ settings.blogtitle;

function backstage(){

    base.call(this);
    util.inherits(backstage,base);

    this.index = function(req,res){
        //最近发布的文章
        //最近得到的回复
        //官方最新日志
        res.render('admin/index', {
            title: '后台中心' + title,
            layout:'admin/layout',
            success : req.flash("success").toString(),
            error : req.flash("error").toString()
        });
    };

    this.profile = function(req,res){

    };
}

var backStage = new backstage();
exports.index = backStage.index;
exports.profile = backStage.profile;


