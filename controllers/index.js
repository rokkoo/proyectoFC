let express = require("express");
let router = express.Router();
var Mascot = require("./../models/mascot");
var realtime = require("../config/realtime/realTime");
var moment = require('moment');
moment.locale('es');
var ip = require("ip");
var geoip = require("geoip-lite");
const fetch = require("node-fetch");

var redis = require("redis");
var veces = [];
var i = { name: "alf", edad: "23" };
var client = redis.createClient();
const options = { sort: { nombre: 1 } };
var User = require('./../models/user');
/** Pagina de inicio */

router.get("/", (req, res, next) => {
  veces.push(i);
  client.publish("chat", veces.toString());

  Mascot.find()
    .sort("-_id") // ordenamos de manera ascendente
    .exec((err, mascotas) => {
      if (err) throw err;
      //console.log({ mascotas : mascotas});
      var nombrePagina = "ADOPTAPP";
      res.render("index", {
        usuario: req.session.user,
        pagina: nombrePagina,
        mascotas: mascotas,
        moment: moment
      });
    });
});

router.get("/registrate", (req, res, next) => {
  var nombrePagina = "REGISTRAR USUARIO";
  res.render("users/addUser", {
    usuario: req.session.user,
    pagina: nombrePagina
  });
});

router.post("/nuevo", (req, res, next) => {
  //Elementos que se capturan en el body
  console.log(req.body);
  let user = new User({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    contrasena: req.body.contrasena,
  });
  user.save();
  req.session.userId = user._id;
  res.redirect("/perfil");
  // alfonso.save().then(() => console.log(alfonso.username));
});

module.exports = router;
