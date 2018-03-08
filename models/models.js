'use strict';
const mongoose = require('./../config/mongoose/conn'),
  userSchema = require('./../app/schemas/users').userSchema;

const models = {

User: mongoose.model('user', userSchema)

};

module.exports = models;