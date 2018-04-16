"use strict";
const express = require("express");
const router = express.Router();
const redis = require("redis");
const email = require('./../config/email/email');
const emailData = email.Options();
//variables de entorno
require("dotenv").config();

//cliente que enviara las imagenes
var client = redis.createClient();

router.get("/", (req, res, next) => {
  let nombrePagina = "Cliente Streaming";
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

router.get("/enviar", (req, res, next) => {
  let data = {
    name: 'Alfonso'
  }

  if (email.Options('alfonsolasaguirre@gmail.com', data)) {
    res.statusCode = 200;
    res.send('Email sent!');
  }else{
    return res.send('fallo al enviar el email');
  }

});
module.exports = router;
