let express = require('express');
let router = express.Router();

/** Imagen uploader*/
var cloudinary = require('./../config/cloudinary/cloudinary');

/** db conection */
const mongoose = require('./../config/mongoose/conn');
var Mascot = require('./../models/mascot');

/** Cloudinary - Configuracion */

router.get('/', (req, res, next) => {
        var nombrePagina = 'ADOPTAPP';
        res.render('addAnimal',{
            //Objeto
            pagina : nombrePagina,
        });    
});

router.post('/adopcion/nueva', (req, res, next) => {
    //Elementos que se capturan en el body
    console.log(req.body);
    let mascot = new Mascot({
        nombre: req.body.nombre,
        edad: req.body.edad,
        info: req.body.info
    });
    mascot.save();
    res.redirect('/');
    // alfonso.save().then(() => console.log(alfonso.username));
});

module.exports = router;