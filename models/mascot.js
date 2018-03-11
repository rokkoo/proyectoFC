let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let mascotSchema = new Schema({
    nombre: {type: String},
    dueño: {type: String},
    edad: { type: Number, min: 0 },
    info: {type: String},
    date: { type: Date, default: Date.now },
    comments: [{ body: String, date: Date }],
}, { versionKey: false });

let Mascot = mongoose.model('Mascot', mascotSchema);

module.exports = Mascot;