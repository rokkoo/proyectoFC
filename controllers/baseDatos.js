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
          //console.log("baseDatosMascotasLat : "+mascota.de);
        });
        //console.log(mascotasMap);
        res.send(mascotasMap);  
    });  
});
//////////////////////////////

module.exports = router;
