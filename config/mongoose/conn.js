'use strict';
var mongoose = require('mongoose');
const url = `mongodb://${process.env.mongo_user}:${process.env.mongo_pass}@${process.env.mongo_server}:${process.env.mongo_port}/${process.env.mongo_db}`
mongoose.connect(url);
module.exports = mongoose;