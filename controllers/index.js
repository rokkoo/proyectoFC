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
var client = redis.createClient();
const options = { sort: { nombre: 1 } };
var User = require('./../models/user');


/** Pagina de inicio */
var origenLat;
var origenLon;
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

var mascotasO;
router.get("/ander", (req, res, next) => {
  var conValor = false;
  veces.push(i);
  client.publish("chat", veces.toString());

  Mascot.find()
    .sort("-_id") // ordenamos de manera ascendente
    .exec((err, mascotas) => {
      if (err) throw err;
      //console.log("why why why: "+parseFloat(mascotas[0].lat));
        
        /*do{
          //console.log(origenLat);
          //console.log(origenLon);
          //console.log("entra al DO");
          if(origenLat != null && origenLon != null){
            console.log("ENTRA AL IF");
            conValor=true;
          }
        }while(!conValor);*/
      
        ordenar(mascotas);
        //console.log("mascotasOOO: "+mascotasO);
      
      //ordenar(mascotas);
      //console.log("HOLA HOLA HOLA: "+(mascotasO[0].lat));
      //console.log({ mascotas : mascotasO});
      var nombrePagina = "ADOPTAPP";
      res.render("index", {
        usuario: req.session.user,
        pagina: nombrePagina,
        mascotas: mascotasO,
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
  console.log("accion " + req.body.accion);
  //Elementos que se capturan en el body
  let user = new User({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    contrasena: req.body.contrasena,
    telefono: req.body.telefono,
    tipo: null,
    notAnimalNuevo: req.body.notAnimalNuevo,
    notAnimalPerdido: req.body.notAnimalPerdido,
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

//////////////////////////////
function ordenar(mascotas){
  //console.log("FIRST OF ALL: "+mascotas);
  //console.log("SECOND OF ALL: "+mascotas[1].edad);
  //console.log("THIRD OF ALL: "+mascotas[1].lat);
  console.log("LATITUD CLIENTE: "+origenLat);
  console.log("LONGITUD CLIENTE: "+origenLon);
  /*
  Number.prototype.toRad = function() {
      return this * Math.PI / 180;
  }
  */
  function toRad(numb){
      numb=numb * Math.PI /180;
      return numb;
  }
  
  
  var distancias=[];
  origenLat = 43.3380969;
  origenLon = -1.7888483000000406;
  //var origen = {"lat":51.903614,"lon":-8.468399};
  //var origenLat=sessionStorage.getItem("latitud");
  //console.log("LLEGAN LAS COORDENADAS: "+origenLat+" y "+origenLon);
  var origenLatRad = toRad(origenLat);
  //console.log("origenLatRad : "+origenLatRad);
  //console.log("origenLonRad : "+origenLatRad);
  //var origenLon=sessionStorage.getItem("longitud");
  var mascotas = mascotas;
  //console.log("mascotas: "+mascotas);
  //console.log("length : "+mascotas.length);
  for(i=0;i<mascotas.length;i++){
      var ander = mascotas[i].lat;
      //ander = parseFloat(ander);
      //console.log("wat de fuk"+ander);
      //console.log("latitud mascotas : "+mascotas[i].lat);
      var destinoLat=mascotas[i].lat;
      //console.log(destinoLat);
      var destinoLatRad=toRad(destinoLat);
      //console.log("destinoLatRad : "+destinoLatRad);
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
      //console.log("RRR: "+R);
      //console.log("CCC: "+c);
      var distanciaKm = R * c;
      //console.log("LATITUD CLIENTE: "+origenLat);
      //console.log("LONGITUD CLIENTE: "+origenLon);
      console.log("LATITUD MASCOTA: "+mascotas[i].lat);
      console.log("LONGITUD MASCOTAS: "+mascotas[i].long);
      console.log("NOMBRE MASCOTA : "+mascotas[i].nombre);
      console.log("DISTANCIA : "+distanciaKm);

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
      //console.log("distanciaKM"+parseInt(distanciaKm));
      distancias[i]=mascota;
  }

  //console.log(distancias);
  
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
  //console.log("aqui");
  //console.log(distancias);
  //document.write("<p>Ciudades mas cercanas a cork</p>");
  
  //console.log(distancias);
  mascotasO=distancias;
  //return distancias;
  
}

//////////////////////////////
module.exports = router;
