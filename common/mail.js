/**
 * 邮件工具
 * Created by Asura on 2014/10/30.
 */

var nodemailer = require('nodemailer');
var settings = require('../settings');


function Mail(){
    var transporter = nodemailer.createTransport(settings.smtpTransport);
    var site_root_url = settings.host;

    this.send = function(from,to,subject,text,html){
        if(settings.debug){
            return true;
        }
        var mailOptions = {
            from : from,        //发送人
            to : to,            //bar@blurdybloop.com, baz@blurdybloop.com
            subject : subject,  //主题
            text : text,        //明文
            html : html         //主体
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){

            }
        });
    };

}





















