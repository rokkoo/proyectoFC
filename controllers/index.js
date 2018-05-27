let express = require("express");
var app = express();
let router = express.Router();
var Mascot = require("./../models/mascot");
var realtime = require("../config/realtime/realTime");
var moment = require('moment');
moment.locale('es');
var ip = require("ip");
var geoip = require("geoip-lite");
const fetch = require("node-fetch");
const email = require('./../config/email/email');
const emailData = email.Options();
var redis = require("redis");
var veces = [];
var i = { name: "alf", edad: "23" };
let client = redis.createClient(process.env.REDIS_URL, process.env.Redis_pass||"");
const options = { sort: { nombre: 1 } };
var User = require('./../models/user');
var bcrypt = require('bcrypt');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//const razasJson = require('./razasJson.js');


/** Pagina de inicio */
let origenLat = -38.416097;
let origenLon = -63.616671999999994;
let geOn = false;
//var io = socket(server);
/*
io.on("latitud", function(data){
  console.log("cliente cliente latitud: "+data["map"]);
  origenLat=data["map"];
});
io.on("longitud", function(data){
  console.log("cliente longitud: "+data["map"]);
  origenLon=data["map"];
});
*/
router.get("/", (req, res, next) => {
  veces.push(i);
  client.publish("chat", veces.toString());

  Mascot.find()
    .sort("-_id") // ordenamos de manera ascendente
    .exec((err, mascotas) => {
      if (err) throw err;
      //console.log({ mascotas : mascotas});
      var nombrePagina = "ADOPTAPP";
      //console.log("ESTOY AQUI  "+mascotas);
      //console.log("SE HA ACABADO");
      res.render("index", {
        usuario: req.session.user,
        pagina: nombrePagina,
        mascotas: mascotas,
        moment: moment
      });
    });
});

router.get("/sacarListaRazas", async (req, res, next) => {
  veces.push(i);
  client.publish("chat", veces.toString());
  var razas;
  var razasFoto = [];
  
  razas = primera();
  //console.log("hola"+razas);
  razasMap = JSON.parse(razas);
  async function foto(nombre) {
    //console.log(nombre);
    nombre = nombre.toLowerCase();
    var url = "https://dog.ceo/api/breed/"+nombre+"/images/random";
    //let url = "https://dog.ceo/api/breeds/" + nombre + "/image/random";
    var jRandom = await fetch(url);
    var json = await jRandom.json();
    //console.log(json);
    //console.log('INSIDE FOTO '+JSON.stringify(json));
    return json;
  }
  var razasM
  for(i=0;i<razasMap.length;i++){
    console.log(i);
    var nombre = razasMap[i]["nombre"];
    var fotos;
    await foto(nombre)
        .then((resp) => {
            //String
            fotos = resp.message;
            razasFoto[i]={'nombre':nombre,'foto':fotos};
        });
  }
  

  console.log(razasFoto);
  //razasFoto=JSON.parse(razasFoto);
  res.render("razas", {
    usuario: req.session.user,
    mascotas: razasFoto,
    moment: moment
  });
});

/////////////////LLAMADAS API///////////////////////////////////////

//Llamada 1
var razasMap = []; 
function primera(){
  var razas = [];
  var theUrl = "https://ancient-waters-92827.herokuapp.com/lista/razas";
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        razas =  xmlHttp.responseText;
      }
    }
  xmlHttp.open("GET", theUrl, false); // true for asynchronous 
  xmlHttp.send(null);
  return razas;
}


//Llamada 2
var razasMap = []; 
function segunda(razas){
  //console.log("RAZAS: "+razas);
  var url = "https://ancient-waters-92827.herokuapp.com/buscar/";
  var xmlHttp1 = new XMLHttpRequest();
  var raza;
  xmlHttp1.onreadystatechange = function() { 
    if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200){
      //callback(xmlHttp.responseText);
      raza = xmlHttp1.responseText;
      //console.log("/////////////////////////////////////////////////////////");
      //console.log(raza);
    }
  }
  url = url+razas["nombre"];
  //console.log("URL : "+url);
  xmlHttp1.open("GET", url, false); // true for asynchronous 
  xmlHttp1.send(null);
  return raza;
}
////////////////////////////////////////////////////////////////////////////

var mascotasO;
router.get("/ander", (req, res, next) => {
  var conValor = false;
  veces.push(i);
  client.publish("chat", veces.toString());

      Mascot.find()
    .sort("-_id") // ordenamos de manera ascendente
    .exec((err, mascotas) => {
      let dataMascotas
      if (err) throw err;
      if(geOn) ordenar(mascotas); //ordenamos las mascotas
      geOn == true ? dataMascotas = mascotasO : dataMascotas = mascotas;
      console.log('====================================');
      console.log("session lat: "+origenLat);
      console.log("session lat: "+origenLon);
      console.log("genOn "+geOn);
      dataMascotas.forEach(mascotas => {
        console.log(mascotas);
      });
      console.log('====================================');
      var nombrePagina = "ADOPTAPP";
      res.render("index", {
        usuario: req.session.user,
        pagina: nombrePagina,
        mascotas: dataMascotas,
        moment: moment
      });
    });
});

router.post("/geo", (req, res) => {
  geOn = true;
  origenLat = JSON.stringify(req.body.lat);
  origenLon = JSON.stringify(req.body.lon)
  req.session.latitud = origenLat
  req.session.longitud = origenLon
  console.log('====================================');
	console.log('body: '+req.session.latitud);
  console.log('====================================');
  res.redirect("/perfil");
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
  let user = new User({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    contrasena: req.body.contrasena,
    telefono: req.body.telefono,
    codPostal: req.body.codPostal,
    direccion: req.body.direccion,
    tipo: null,
    notAnimalNuevo: req.body.notAnimalNuevo,
    notAnimalPerdido: req.body.notAnimalPerdido,
    emailConfirmado: 0,
  });

  bcrypt.hash(user.contrasena, 10, function (err, hash){
    user.contrasena = hash;
    console.log(user);
    user.save();

  })


  if (email.Options(user.email, user, "confirmEmail")) {
    res.statusCode = 200;
    //res.send('Email sent!');
  }else{
    return res.send('fallo al enviar el email');
  }

  req.session.userId = user._id;
  res.redirect("/login");
  // alfonso.save().then(() => console.log(alfonso.username));
});

//////////////////////////////
function ordenar(mascotas){
  function toRad(numb){
      numb=numb * Math.PI /180;
      return numb;
  }

  var distancias=[];
  console.log('====================================');
  console.log("LATITUD CLIENTE: "+origenLat);
  console.log("LONGITUD CLIENTE: "+origenLon);
  console.log('====================================');

  var origenLatRad = toRad(origenLat);
  var mascotas = mascotas;
  for(i=0;i<mascotas.length;i++){
      var ander = mascotas[i].lat;
      var destinoLat=mascotas[i].lat;
      var destinoLatRad=toRad(destinoLat);
      var destinoLon=mascotas[i].long;
      
      var R = 6371; // km 
      
      var distanciaLat = destinoLat-origenLat;
      var distanciaLat = toRad(distanciaLat);;  
      var distanciaLon = destinoLon-origenLon;
      var distanciaLon = toRad(distanciaLon);  
      var a = Math.sin(distanciaLat/2) * Math.sin(distanciaLat/2) + 
                      Math.cos(origenLatRad) * Math.cos(destinoLatRad) * 
                      Math.sin(distanciaLon/2) * Math.sin(distanciaLon/2);  
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var distanciaKm = R * c;

      var mascota = {
          "date":mascotas[i].date,
          "edad":mascotas[i].edad,
          "idUser":mascotas[i].idUser,
          "info":mascotas[i].info,
          "lat":mascotas[i].lat,
          "long":mascotas[i].long,
          "nombre":mascotas[i].nombre,
          "url":mascotas[i].url,
          "_id":mascotas[i]._id,
          "distancia":distanciaKm
      };
      distancias[i]=mascota;
  }
  
  var ordenado = false;
  var movimiento;
  var value;
  do{
      movimiento = false;
      
      for(i=0;i<distancias.length-1;i++){
          value=distancias[i];
          if(distancias[i].distancia>distancias[i+1].distancia){
              distancias[i]=distancias[i+1];
              distancias[i+1]=value;
              movimiento=true;
          }
      }
      if(!movimiento){
          ordenado=true;
      }
  }while(!ordenado);

  mascotasO=distancias;
}

//////////////////////////////
module.exports = router;
