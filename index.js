'use strict'
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const _ = require('lodash');
var mongoose = require('mongoose');
var Mascot = require("./models/mascot");
var User = require('./models/user');


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
        var sig = { nombre: _.find(razasJson.razas, { id: i.toString() }).castellano };
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
app.listen('3000');