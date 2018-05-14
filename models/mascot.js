let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let mascotSchema = new Schema({
    id: { type: String },
    nombre: {type: String},
    dueño: {type: String},
    raza: {type: String},
    edad: { type: Number, min: 0 },
    info: {type: String},
    url: {type: String},
    date: { type: String},
    idUser: {type: String},
    comments: [{ body: String, date: Date }],
}, { versionKey: false });

let Mascot = mongoose.model('Mascot', mascotSchema);

module.exports = Mascot;