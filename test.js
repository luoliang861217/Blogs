//var moment = require('moment');
//
//// console.log(moment().format());
//// console.log(moment().format('X'));
//// console.log(moment().unix());
//
//// console.log(moment('2014-11-18 20:13:15').unix());
//
////var str = 'id ids  ggg';
////var reg = /\s+/g;
////var arr = str.replace(reg," ");
////var arr1 = new Array(3)
////arr1[0] = "George";
////arr1[1] = "John";
////arr1[2] = "Thomas";
////console.log(arr1.join(" "));
//
////var imagePathFormat = "/upload/image/YYYY/MM/DD/x";
////console.log(__dirname + moment().format('YYYY/MM/DD/YYYYMMDDHHmmss'));
//    function page(pageIndex,pageSize,total,urlformat){
//        var totalPage = Math.ceil(total / pageSize);
//        var count = 3;
//        var start = pageIndex < count ? 1 : pageIndex - count;
//        var end = start + 5 > totalPage ? totalPage : start + 5;
//        var html = '<ol class=\"page-navigator\">';
//        if(pageIndex > 1 ){
//            html += '<li class=\"pre\"><a href=\"'+ pageIndex + '\">«</a> </li>';
//        }
//        for(var i = start;i<= end; i++){
//            if(pageIndex === i ){
//                html += '<li class=\"current\"><a href=\"'+ i + '\">'+ i + '</a> </li>';
//            }
//            else{
//                html += '<li><a href=\"'+ i + '\">'+ i + '</a> </li>';
//            }
//        }
//        if(pageIndex <　totalPage ){
//            html += '<li class=\"next\"><a href=\"'+ pageIndex + '\">»</a></li>';
//        }
//        html += '</ol>';
//        return html;
//    }
//
//var index = 1;
//var size = 3;
//var total = 10;
////console.log(page(index,size,total,''));
//
////console.log(__dirname);
//var date = {start : 123456,end: 456789 };
//console.log(date.start > date.end);

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
console.log(new Date().Format("yyyy年MM月dd号"));
