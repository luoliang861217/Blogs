var moment = require('moment');

// console.log(moment().format());
// console.log(moment().format('X'));
// console.log(moment().unix());

// console.log(moment('2014-11-18 20:13:15').unix());

//var str = 'id ids  ggg';
//var reg = /\s+/g;
//var arr = str.replace(reg," ");
//var arr1 = new Array(3)
//arr1[0] = "George";
//arr1[1] = "John";
//arr1[2] = "Thomas";
//console.log(arr1.join(" "));

//var imagePathFormat = "/upload/image/YYYY/MM/DD/x";
//console.log(__dirname + moment().format('YYYY/MM/DD/YYYYMMDDHHmmss'));
    function page(pageIndex,pageSize,total,urlformat){
        var totalPage = Math.ceil(total / pageSize);
        var count = 3;
        var start = pageIndex < count ? 1 : pageIndex - count;
        var end = start + 5 > totalPage ? totalPage : start + 5;
        var html = '<ol class=\"page-navigator\">';
        if(pageIndex > 1 ){
            html += '<li class=\"pre\"><a href=\"'+ pageIndex + '\">«</a> </li>';
        }
        for(var i = start;i<= end; i++){
            if(pageIndex === i ){
                html += '<li class=\"current\"><a href=\"'+ i + '\">'+ i + '</a> </li>';
            }
            else{
                html += '<li><a href=\"'+ i + '\">'+ i + '</a> </li>';
            }
        }
        if(pageIndex <　totalPage ){
            html += '<li class=\"next\"><a href=\"'+ pageIndex + '\">»</a></li>';
        }
        html += '</ol>';
        return html;
    }
	
var index = 1;
var size = 3;
var total = 10;
//console.log(page(index,size,total,''));

console.log(__dirname);
