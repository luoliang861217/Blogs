module.exports = {
    cookSecret : 'asura',
    db:'Blogs',
    host:'localhost',
    blogtitle:'独孤求败',
    blogdescription:'希望自己是站在高处寻找对手的一名码农。',

    //是否调试
    debug:true,
    //是否记录操作日志
    isLog:true,
    // 邮箱配置
    smtpTransport: {
        host: '192.168.1.45',
        port: 25,
        auth: {
            user: 'barfoo@barfoo.cn',
            pass: '123456'
        }
    }
}