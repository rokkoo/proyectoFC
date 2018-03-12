let mongoose = require('mongoose');
var bcrypt = require('bcrypt');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
    apellido: {
        type: String,
        unique: true,
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

    confirmarContrasena: {
        type: String,
        required: true,
      },
    
    telefono: {type: String},
    tipo: [{ rol: String},{ verificado: Boolean},{ curriculum: String} ],
    imgPerfil: {type: String},
    notificaciones: [{idMP: String}],
}, { versionKey: false });


userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.contrasena, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.contrasena = hash;
      next();
    })
  });

  userSchema.statics.authenticate = function (email, contrasena, callback) {
    User.findOne({ email: email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(contrasena, user.contrasena, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  };

  let User = mongoose.model('User', userSchema);
  
module.exports = User;