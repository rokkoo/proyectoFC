let express = require('express');
let router = express.Router();
var Mascot = require('./../models/mascot');
var realtime = require('../config/realtime/realTime');

var ip = require('ip');
var geoip = require('geoip-lite');
const fetch = require("node-fetch");

var redis = require('redis');
var veces = [];
var i = { name: 'alf', edad: '23' };
var client = redis.createClient();
const options = { sort: { nombre: 1 } };
/** Pagina de inicio */

async function getLocation(puip) {
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + puip;
    const res = await fetch(url);
    const json = await res.json();
    return json.results[0].formatted_address;
}

router.get('/', (req, res, next) => {
    //var geo = geoip.lookup(ip.address());
    const puip = ip.address();
    getLocation(puip)
    .then(respu => console.log('Ciudad: '+respu))
    
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + puip;
    fetch(url) //Nos devuelve una promesa
    .then(response => {
      response.json().then(json => {
        console.log(
          `City: ${json.results[0].formatted_address} -`,
          `Latitude: ${json.results[0].geometry.location.lat} -`,
          `Longitude: ${json.results[0].geometry.location.lng}`
        );
      });
    })
    .catch(error => {
      console.log(error);
    });

    veces.push(i);
    client.publish('chat', veces.toString());

    Mascot.find()
        .sort('-_id') // ordenamos de manera ascendente
        .exec((err, mascotas) => {
            if (err) throw err;
            //console.log({ mascotas : mascotas});
            var nombrePagina = 'ADOPTAPP';
            res.render('index', {
                //Objeto
                pagina: nombrePagina,
                mascotas: mascotas
            });
        });
});
module.exports = router;