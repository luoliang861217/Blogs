module.exports = function(){
    this.name = '我是一个人';

    this.talk = function(str){
        console.log(this.name + '说：' + str);
    };
}

