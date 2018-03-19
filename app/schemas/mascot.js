'use strict';
const mongoose = require('./../../config/mongoose/conn'),
      Schema = mongoose.Schema;

const schemas = {

    mascotSchema: new Schema({
        nombre: {type: String},
        edad: { type: Number, min: 0 },
        info: {type: String},
        idUser: {type: String}
    })

};

module.exports = schemas;