let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let notificacionSchema = new Schema({
    idUser: {type: String},
    nuevoMp: {type: String},
    nuevoMensaje: {type: String},
    nuevaEntrada: {type: String},
}, { versionKey: false });

let notificacion = mongoose.model('Notificacion', notificacionSchema);

module.exports = Notificacion;