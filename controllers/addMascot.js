let express = require('express');
let router = express.Router();
var http = require('http');
var io = require('socket.io');

/** Imagen uploader*/
var cloudinary = require('./../config/cloudinary/cloudinary');

/** db conection */
const mongoose = require('./../config/mongoose/conn');
var Mascot = require('./../models/mascot');

/** Cloudinary - Configuracion */
var realtime = require('../config/realtime/realTime')

router.get('/', (req, res, next) => {
        var nombrePagina = 'ADOPTAPP';
        res.render('addAnimal',{
            //Objeto
            pagina : nombrePagina,
        });    
});

router.post('/adopcion/nueva', (req, res, next) => {
    //Elementos que se capturan en el body
    //console.log(req.files.mascotaImg);
    io(req.server);
    //El modulo 'fs' (File System) que provee Nodejs nos permite manejar los archivos
    var fs = require('fs')

    var img = req.files.mascotaImg;
    var path = req.files.mascotaImg.path
    var newPath = './public/fotos/' + req.files.mascotaImg.originalFilename;

    var is = fs.createReadStream(path);
    var os = fs.createWriteStream(newPath);

   is.pipe(os)

    is.on('end', function () {
        //eliminamos el archivo temporal
        //fs.unlink(path);

        /** Subimos la imagen a cloudinary */
        cloudinary.uploader
            .upload(newPath, (result) => {
                //console.log(result)
                let mascot = new Mascot({
                    nombre: req.body.nombre,
                    edad: req.body.edad,
                    info: req.body.info,
                    url: result.url
                });
                mascot.save();
                res.redirect('/');
            });
    });

    // alfonso.save().then(() => console.log(alfonso.username));
});

module.exports = router;