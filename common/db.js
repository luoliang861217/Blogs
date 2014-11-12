/**
 * Created by Asura on 2014/10/30.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var settings = require('../settings');
var host = settings.host;
var blog = settings.db;

mongoose.connect('mongodb://' + host + '/' + blog);
exports.mongoose = mongoose;
exports.Schema = Schema;