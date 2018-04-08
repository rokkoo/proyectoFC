"use strict";
let express = require("express");
let router = express.Router();
var redis = require("redis");

//variables de entorno
require("dotenv").config();

//emails
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

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

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: 'appadoptes@gmail.com',
    clientId: process.env.google_client,
    clientSecret: process.env.google_secret,
    refreshToken: process.env.google_refresh
  }
});

let mailOptions = {
  from: '<appadoptes@gmail.com>',
  to: 'alfonsolasaguirre@gmail.com',
  subject: 'Adoptapp',
  // html: '<h1> Hola! </h1>'
  template: 'hello',
  context:{
    name: 'alfonso'
  }
};

const path = require('path');
const templatesDir = path.resolve(__dirname, '..', 'emails/hello');
let options = {
  viewPath: templatesDir,
  extName: '.ejs'
};

transporter.use('compile', hbs(options));


router.get("/enviar", (req, res, next) => {
   transporter.sendMail(mailOptions, (err, info) => {
      if (err) res.send('fallo al enviar el email');
      res.statusCode = 200
      res.send('Email sent!')
    });
});
module.exports = router;
