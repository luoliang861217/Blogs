/**
 * 静态字符串操作函数
 * Created by Asura on 2014/10/30.
 */

var crypto = require('crypto');


/**
 * 加密
 * @returns {string}
 */
String.prototype.encryption = function () {
    var str = this.toString();
    var md5 = crypto.createHash('md5');
    return md5.update(str).digest('hex').toLowerCase();
}

/**
 * 解密
 * @returns {string}
 */
String.prototype.decryption = function () {
    var str = this.toString();
//    var md5 = crypto.createHash('md5');
//    md5.update
    return '为实现';
}

/**
 * 去除空格
 * @returns {string}
 */
String.prototype.trim = function () {
    var str = this.toString();
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

/**
 * 比较两个字符串是否相等
 * @param str
 * @returns {boolean}
 */
String.prototype.equal = function (str) {
    var str1 = this.toString();
    if (str1.length != str.length) {
        return false;
    }
    else {
        for (var i = 0; i < this.length; i++) {
            if (str1.charAt(i) != str.charAt(i)) {
                return false;
            }
        }
        return true;
    }
}

/**
 * 比较两个字符串是否相等，不区分大小写
 * @param str
 * @returns {boolean}
 */
String.prototype.equalIgnoreCase = function (str) {
    var temp1 = this.toString().toLowerCase();
    var temp2 = str.toLowerCase();
    return temp1.equal(temp2);
}

/**
 * 追加字符串
 * @param str
 * @returns {string}
 */
String.prototype.append = function (str) {
    return this.toString().concat(str);
}

/**
 * 验证是否邮箱
 * @returns {boolean}
 */
String.prototype.isEmail = function() {
    var str = this.toString();
    if (str.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
        return true;
    else
        return false;
}



/**
 * 生成随机数
 * @param length 长度
 * @returns {string}
 */
String.prototype.randomString = function (length) {
    length = length || 6;
    var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var max_num = code_string.length + 1;
    var new_pass = '';
    while (length > 0) {
        new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
        length--;
    }
    return new_pass;
}



