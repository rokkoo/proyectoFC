let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: {type: String},
    apellido: {type: String},
    email: {type: String},
    telefono: {type: String},
    tipo: [{ rol: String},{ verificado: Boolean},{ curriculum: String} ],
    imgPerfil: {type: String},
    notificaciones: [{idMP: String}],
}, { versionKey: false });

let User = mongoose.model('User', userSchema);

module.exports = User;