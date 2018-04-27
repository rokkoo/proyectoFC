let express = require("express");
let mongoose = require("mongoose");
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
/*
var app = express();
var socket = require("socket.io");
//socket
var server = app.listen(9999,function(){
    console.log("listening to request on port 9999");
});

io.on('connection', function(socket){
    console.log("made socket connection", socket.id);
    
});
*/

router.get('/buscarDatos', function (req, res) {
    //let language = req.body.language;
    //var mapMascotas=[];
    var i=0;
    Mascot.find({}, function(err, mascotas) {
        var mascotasMap = [];
    
        mascotas.forEach(function(mascota) {
          mascotasMap[i] = mascota;
          i++;
          console.log("baseDatosMascotasLat : "+mascota.de);
        });
        //console.log(mascotasMap);
        res.send(mascotasMap);  
    });  
});
//////////////////////////////
function ordenar(mascotas){
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
    //var origen = {"lat":51.903614,"lon":-8.468399};
    //var origenLat=sessionStorage.getItem("latitud");
    var origenLat=-8.4706100;
    var origenLon=51.8979700;
    var origenLatRad = toRad(origenLat);
    //var origenLon=sessionStorage.getItem("longitud");
    var mascotas = mascotas;
    //console.log("mascotas: "+mascotas);
    for(i=0;i<mascotas.length;i++){
        
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
    return distancias;
    
  }
  
//////////////////////////////
module.exports = router;
