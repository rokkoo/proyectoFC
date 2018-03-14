let express = require('express');
let router = express.Router();
var Mascot = require('./../models/mascot');
var realtime = require('../config/realtime/realTime');

var redis = require('redis');
var veces = [];
var i = {name:'alf',edad:'23'};
var client = redis.createClient();
const options = { sort: {nombre : 1}};
/** Pagina de inicio */
router.get('/', (req, res, next) => {
    
    veces.push(i);
    client.publish('chat',veces.toString());

    Mascot.find()
    .sort('-_id') // ordenamos de manera ascendente
    .exec((err, mascotas) => { 
        if(err) throw err;
        //console.log({ mascotas : mascotas});
        var nombrePagina = 'ADOPTAPP';
        res.render('index',{
            //Objeto
            pagina : nombrePagina,
            mascotas : mascotas
        });   
    });
});
module.exports = router;