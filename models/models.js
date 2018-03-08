'use strict';
const mongoose = require('./../config/mongoose/con'),
  userSchema = require('./../app/schemas/users').userSchema;

const models = {

User: mongoose.model('user', userSchema)

};

module.exports = models;