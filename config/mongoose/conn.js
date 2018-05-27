'use strict';
var mongoose = require('mongoose');

var ip_mongo = "85.86.79.3";
var port_mongo = "27017";
var database_mongo = "test";
var username_mongo = "alfonso";
var pass_mongo = "alfonso";


const url = "mongodb://"+username_mongo+":"+pass_mongo+"@"+ip_mongo+":"+port_mongo+"/"+database_mongo+"?authSource=test&w=1";
//const url = `mongodb://${process.env.mongo_user}:${process.env.mongo_pass}@${process.env.mongo_server}:${process.env.mongo_port}/${process.env.mongo_db}`
mongoose.connect(url);
module.exports = mongoose;