let express = require("express");
let router = express.Router();
var Mascot = require("./../models/mascot");
var User = require("./../models/user");

/** Pagina de inicio */

router.get("/", (req, res, next) => {
  
});

router.get("/:idPet", (req, res, next) => {
    Mascot.findOne({_id: req.params.idPet}, function (err, mascota) {
        User.findOne({_id: mascota.idUser}, function (err, user) {
            res.render("petProfile", {
                usuario: req.session.user,
                mascota: mascota,
                pagina: mascota.nombre,
                mascotausuario: user
            });
        });
    });
});


router.post("/nuevo", (req, res, next) => {
  console.log(req.body.accion);
  //Elementos que se capturan en el body
  let user = new User({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    contrasena: req.body.contrasena,
    telefono: req.body.telefono,
    tipo: null,
    notificaciones: [{notAnimalNuevo: req.body.notAnimalNuevo}, {notAnimalPerdido: req.body.notAnimalPerdido}],
  });
  user.save();
  if (email.Options(user.email, user)) {
    res.statusCode = 200;
    //res.send('Email sent!');
  }else{
    return res.send('fallo al enviar el email');
  }
  req.session.userId = user._id;
  res.redirect("/perfil");
  // alfonso.save().then(() => console.log(alfonso.username));
});

module.exports = router;
