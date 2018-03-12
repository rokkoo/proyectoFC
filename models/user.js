let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: {type: String},
    apellido: {type: String},
    mp: [{ titulo: String, date: Date , mensaje: String}],
}, { versionKey: false });

let User = mongoose.model('User', userSchema);

module.exports = User;