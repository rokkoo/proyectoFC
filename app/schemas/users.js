'use strict';
const mongoose = require('./../../config/mongoose/con'),
      Schema = mongoose.Schema;

const schemas = {

    userSchema: new Schema({
        username: {type: String},
        password: {type: String},
    })

};

module.exports = schemas;