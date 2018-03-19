'use strict'
const express = require('express');
const app = express();
const fetch = require('node-fetch');
//const _ = require('lodash');
//const request = require('request');
//const argv = require('yargs').argv;
//const direccion = argv.direccion;

app.get('/:raza', (req, res) => {
    //con "req.params.raza" coge el parámetro que se mana por la url por ejemplo: localhost:3000/pastorAleman, devuelve "pastorAleman"
    foto(req.params.raza)
        .then((resp) => {
            //String
            var perros = { raza: req.params.raza, foto: resp.message };
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

app.listen('3005');