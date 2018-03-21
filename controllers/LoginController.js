let express = require("express");
let router = express.Router();
var bcrypt = require("bcrypt");

const mongoose = require("../config/mongoose/conn");
var User = require("../models/user");

router.get("/", (req, res, next) => {
  var nombrePagina = "Conéctate!";
  res.render("users/loginUser", {
    //Objeto
    pagina: nombrePagina
  });
});

router.post("/", function(req, res) {
  //                  nombre de campo input
  User.findOne({ email: req.body.logEmail }, function(err, user) {
    if (!user) {
      res.render("users/loginUser", { error: "NO HAY USUARIO." });
    } else {
      console.log(user);
      bcrypt.compare(req.body.logContrasena, user.contrasena, function(
        err,
        result
      ) {
        console.log("entrando bcryps");
        if (result === true) {
          console.log("entrando true");

          // sets a cookie with the user's info
          req.session.user = user;
          res.redirect("/perfil");
        } else {
          console.log("entrando false");
          res.render("users/loginUser", { error: "MAL LA CONTRASEÑA" });
        }
      });
    }
  });
});

router.get("/logout", function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

module.exports = router;