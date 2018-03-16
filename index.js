const express = require('express');
const app = express();
const _ = require('lodash');

//imagen aleatoria
const request = require('request');
const argv = require('yargs').argv;
let direccion = argv.direccion;


app.get('/:raza', (req, res) => {
    //JSON con todas las razas y la foto la busca en un array de fotos y elige una al azar
    var perros = [
        {raza: "african", foto: foto(req.params.raza)},
        {raza: "razaPerro2", foto: foto(req.params.raza)}
    ]
    
    //"req.params.raza" coge el parámetro enviado por la url, por ejemplo localhost:3000/pastorAleman y la función find coge el json del pastorAleman
    let resultado = _.find(perros, {raza: req.params.raza});
    console.log(resultado);
    res.send(resultado);


    //Esta función devuelve una foto aleatoria
    function foto(raza){
        let url = "https://dog.ceo/api/breed/"+raza+"/images/random";
        request({
            async: false,
            url: url,
            json: true
        },(error, response, body)=>{
            var jRandom = body;
            var img = jRandom['message'];
        });
    }

})

app.listen('3000');