'use strict'
let express = require("express");
let router = express.Router();
var redis = require("redis");

//cliente que enviara las imagenes
var client = redis.createClient();

router.get("/", (req, res, next) => {
        var nombrePagina = "Cliente Streaming";
        res.render("clienteStreaming", {
          usuario: req.session.user,
          pagina: nombrePagina
        });
    });

    router.get("/emitir", (req, res, next) => {
      var nombrePagina = "Streaming";
      res.render("streaming", {
        usuario: req.session.user,
        pagina: nombrePagina
      });
  });
module.exports = router;
