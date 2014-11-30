module.exports = {
    db:'BlogsTest',
    host:'localhost',
    blogtitle:'独孤求败',
    blogdescription:'希望自己是站在高处寻找对手的一名码农。',

    //是否调试
    debug:true,
    //是否记录操作日志
    isLog:true,
    session_db : 'BlogsTest',
    session_secret: 'asura_secret', // 务必修改
    auth_cookie_name: 'asurablog',
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