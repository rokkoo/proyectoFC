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
          console.log(user);
            res.render("petProfile", {
                usuario: req.session.user,
                mascota: mascota,
                pagina: mascota.nombre,
                mascotausuario: user
            });
        });
    });
});

module.exports = router;
