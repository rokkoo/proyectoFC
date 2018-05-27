'use strict'
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const _ = require('lodash');
var mongoose = require('mongoose');
var Mascot = require("./models/mascot");
var User = require('./models/user');
let router = express.Router();
const email = require('./modulos/email');
const emailData = email.Options();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const razasJson = require('./razasJson.js');

var MongoClient = require('mongodb').MongoClient;

var ip_mongo = "85.86.79.3";
var port_mongo = "27017";
var database_mongo = "test";
var username_mongo = "alfonso";
var pass_mongo = "alfonso";

// Connect to the db
const url = "mongodb://"+username_mongo+":"+pass_mongo+"@"+ip_mongo+":"+port_mongo+"/"+database_mongo+"?authSource=test&w=1";
mongoose.connect(url);
module.exports = mongoose;

app.get('/', (req, res) => {
    res.send('API adopptApp');
})

app.get('/buscar/:raza', (req, res) => {
    //con "req.params.raza" coge el parámetro que se mana por la url por ejemplo: localhost:3000/pastorAleman, devuelve "pastorAleman"
    //"_.find" busca en el array razas el json que tenga el nombre que le indicas, por ejemplo Pasotor Aleman, y te devuelve el json con todos los datos
    //"razasJson.razas" importa el array con todas las razas
    var bRaza = _.find(razasJson.razas, { castellano: req.params.raza }).ingles
    foto(bRaza)
        .then((resp) => {
            //String
            var perros = {
                raza: req.params.raza,
                foto: resp.message,
                regionOrigen: _.find(razasJson.razas, { castellano: req.params.raza }).regionOrigen,
                dimensiones: _.find(razasJson.razas, { castellano: req.params.raza }).dimensiones,
                tamaño: _.find(razasJson.razas, { castellano: req.params.raza }).tamaño,
                peso: _.find(razasJson.razas, { castellano: req.params.raza }).peso,
                caracter: _.find(razasJson.razas, { castellano: req.params.raza }).caracter,
                descripcion: _.find(razasJson.razas, { castellano: req.params.raza }).descripcion
            };
            res.send(perros);
        });

    //Esta función devuelve una foto aleatoria
    async function foto(raza) {
        let url = "https://dog.ceo/api/breed/" + raza + "/images/random";
        var jRandom = await fetch(url);
        var json = await jRandom.json();
        return json;
    }
})

//Devuelve JSon con todas las razas en castellano 
app.get('/lista/razas', (req, res) => {
    var i;
    var lista = [];
    for (i = 0; i < razasJson.razas.length; i++) {
        var sig = { nombre: _.find(razasJson.razas, { id: i.toString() }).ingles };
        lista.push(sig);
    }
    res.send(lista);
})

app.get('/tamano/:tamano', (req, res) => {
    if (req.params.tamano == "Toy" || req.params.tamano == "Pequeño" || req.params.tamano == "Medio" || req.params.tamano == "Grande" || req.params.tamano == "Gigante") {
        var i;
        var lista = [];
        for (i = 0; i < razasJson.razas.length; i++) {
            if (_.find(razasJson.razas, { id: i.toString() }).tamaño == req.params.tamano) {
                var sig = { nombre: _.find(razasJson.razas, { id: i.toString(), tamaño: req.params.tamano }).castellano };
                lista.push(sig);
            }
        }
        res.send(lista);
    } else {
        res.send("No existe ese tamaño");
    }
})
///LISTA DE LAS MASCOTAS EN LA BASE DE DATOS
app.get('/lista/mascotas', (req, res) => {
    var i=0;
    Mascot.find({}, function(err, mascotas) {
        var mascotasMap = [];
    
        mascotas.forEach(function(mascota) {
          mascotasMap[i] = mascota;
          i++;
          //console.log("baseDatosMascotasLat : "+mascota.de);
        });
        //console.log(mascotasMap);
        res.send(mascotasMap);  
    });  
})
//NUMERO DE MASCOTAS
app.get('/numero/mascotas', (req, res) => {
    var i=0;
    Mascot.find({}, function(err, mascotas) {
        var mascotasMap = [];
    
        mascotas.forEach(function(mascota) {
          mascotasMap[i] = mascota;
          i++;
          //console.log("baseDatosMascotasLat : "+mascota.de);
        });
        //console.log(mascotasMap);
        var numeroMascotas = "{Numero mascotas:"+i+"}";
        res.send(numeroMascotas);  
    });  
})

//NUMERO DE USUARIOS
app.get('/numero/usuarios', (req, res) => {
    var i=0;
    User.find({}, function(err, users) {
        var userMap = [];
    
        users.forEach(function(user) {
          i++;
          //console.log("baseDatosMascotasLat : "+mascota.de);
        });
        //console.log(mascotasMap);
        var numeroUsers = "{Numero usuarios:"+i+"}";
        res.send(numeroUsers);  
    });  
})
//LISTA DE USUARIOS
app.get('/lista/usuarios', (req, res) => {
    var i=0;
    User.find({}, function(err, users) {
        var userMap = [];
    
        users.forEach(function(user) {
          userMap[i] = user;
          i++;
          //console.log("baseDatosMascotasLat : "+mascota.de);
        });
        //console.log(mascotasMap);
        res.send(userMap);  
    });  
})

//Register
app.post("/usuario/registrar", (req, res, next) => {
    //Elementos que se capturan en el body
    console.log(req.body);
    let user = new User({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      contrasena: req.body.contrasena,
      confirmarContrasena: req.body.confirmarContrasena
    });
    user.save();
    
    
    if (email.Options(user.email, user)) {
      console.log("POR AQUI MAIL")
      res.statusCode = 200;
      //res.send('Email sent!');
    }else{
      return res.send('fallo al enviar el email');
    }
  
    res.send("200: "+user._id);
    // alfonso.save().then(() => console.log(alfonso.username));
  });

//Login

app.post('/usuarios/login', function (req, res, next) {
    //const language = req.body.language;
    //console.log(req.body.username);
    console.log("EMAIL: "+logEmail);
    User.findOne({ email: req.body.logEmail }, function(err, user) {
        if (!user) {
          //res.render("users/loginUser", { error: "El usuario y contraseña no son válidos." });
          res.send("Status 400, no aceptado");
        } else {
          console.log(user);
          bcrypt.compare(req.body.logContrasena, user.contrasena, function(err,result) {
            console.log("entrando bcryps");
            if (result === true) {
              console.log("entrando true");
    
              if(user.emailConfirmado == 0){
                res.send("Confirma email");
                //res.render("users/loginUser", { error: "Debes de confirmar tu email para conectarte.", });
              }else{
                req.session.user = user;
                res.send("Status 200, aceptado");
                //res.redirect("/");
              }
    
              // sets a cookie with the user's info
    
            } else {
              console.log("entrando false");
              res.send("Status 400, no aceptado");
              //res.render("users/loginUser", { error: "La contraseña no es correcta.", });
            }
          });
        }
      });
});

//LISTA DE CORREOS DE LOS USUARIOS
app.get('/lista/usuarios/correos', (req, res) => {
    var i=0;
    User.find({}, function(err, users) {
        var emailMap = [];
    
        users.forEach(function(user) {
          var email = user["email"];
          emailMap[i] = email;
          i++;
          //console.log("baseDatosMascotasLat : "+mascota.de);
        });
        //console.log(mascotasMap);
        res.send(emailMap);  
    });  
})


app.listen(process.env.PORT || '3000', () => {
    console.log('====================================');
    console.log('Escuchando en el puerto 3000');
    console.log('====================================');
});