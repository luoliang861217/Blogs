/**
 * 注册控制器
 * Created by Asura on 2014/10/30.
 */


var util = require('util');
var base = require('./base');
var settings = require('../settings');
var userRepository = require('../Repository/userRepository');
var log = require('../common/log');

//自定义变量
var title = ' - '+ settings.blogtitle;

function register(){

    base.call(this);
    util.inherits(register,base);


    /**
     * 显示注册页面
     * @param req
     * @param res
     * @param next
     */
    this.showregister = function(req,res){
        res.render('admin/register', {
            title: '注册' + title,
            layout:'admin/layout_login',
            success : req.flash("success").toString(),
            error: req.flash("error").toString()
        });
    };

    /**
     * 注册逻辑
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    this.doregister = function(req,res){
        var repository = new userRepository();
        var param = {
            username : req.body.username,
            password : req.body.password,
            email : req.body.email
        };
        var errReturn = function(){
            return res.redirect('/admin/register');
        };
        if(!param.username || param.username === ''){
            this.log(true,'用户名不能为空！',log.type.add,req,errReturn);
        }
        if(!param.password || param.password === ''){
            this.log(true,'密码不能为空！',log.type.add,req,errReturn);
        }
        if( param.password != req.body.password_repeat){
            this.log(true,'密码不一致！',log.type.add,req,errReturn);
        }
        if(!param.email || param.email === ''){
            this.log(true,'邮箱不能为空！',log.type.add,req,errReturn);
        }
        if(!param.email.isEmail()){
            this.log(true,'邮箱不正确！',log.type.add,req,errReturn);
        }
        param.password = param.password.encryption();
        repository.getByuserName(param.username,function(err,user){
            if(err){
                this.log(true,err,log.type.exception,req,errReturn);
            }
            if(user){
                this.log(true,'用户已经存在!',log.type.add,req,errReturn);
            }
            repository.add(param,function(err,user){
                if (err) {
                    this.log(true,err,log.type.exception,req,errReturn);
                }
                this.log(false,user.username + '注册',log.type.add ,req, function(){
                    req.flash('success', '注册成功!');
                    res.redirect('/');
                 });
            }.bind(this));
        }.bind(this));
    };
}

var reg = new register();
exports.showregister = reg.showregister.bind(reg);
exports.doregister = reg.doregister.bind(reg);
