let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
      },
    apellido: {
        type: String,
        required: true,
        trim: true
      },
    email: {
        type: String,
        unique: true,
        required: true,
        
        trim: true
      },

      contrasena: {
        type: String,
        required: true,
      },

      codPostal: {
        type: String,
        required: true,
      },

      direccion: {
        type: String,
        required: true,
      },

      emailConfirmado: {
        type: Number,
      },
    
    telefono: {type: String},
    tipo: [{ rol: String},{ verificado: Boolean},{ curriculum: String} ],
    imgPerfil: {type: String},
    notAnimalNuevo: { type: Boolean},
    notAnimalPerdido: { type: Boolean},
}, { versionKey: false });

/*
userSchema.pre('save', function (next) {
    var user = this;
    console.log(user);
    if(user.emailConfirmado == 0){
      console.log("crypteo pass");
      bcrypt.hash(user.contrasena, 10, function (err, hash){
        if (err) {
          return next(err);
        }
        user.contrasena = hash;
        console.log(user);
        next();
      })
    }
    next();   

  });*/

  let User = mongoose.model('User', userSchema);
  
module.exports = User;