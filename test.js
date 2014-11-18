// var moment = require('moment');

// console.log(moment().format());
// console.log(moment().format('X'));
// console.log(moment().unix());

// console.log(moment('2014-11-18 20:13:15').unix());

var str = 'id ids  ggg ';
var reg = /\s+/g;
var arr = str.replace(reg," "); 
console.log(str.split(/\s+/).length);