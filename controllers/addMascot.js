let express = require('express');
let router = express.Router();
var redis = require('redis');
var moment = require('moment');

var client = redis.createClient();
/** Imagen uploader*/
var cloudinary = require('./../config/cloudinary/cloudinary');

/** db conection */
const mongoose = require('./../config/mongoose/conn');
var Mascot = require('./../models/mascot');

/** Cloudinary - Configuracion */
var realtime = require('../config/realtime/realTime');

router.get('/', (req, res, next) => {
        var nombrePagina = 'ADOPTAPP';
        const user = req.session.user;
        res.render('addAnimal',{
            //Objeto
            pagina : nombrePagina,
            usuario: req.session.user
        });  
});

router.post('/adopcion/nueva', (req, res, next) => {
    //Elementos que se capturan en el body
    //console.log(req.files.mascotaImg);
    //El modulo 'fs' (File System) que provee Nodejs nos permite manejar los archivos
    var fs = require('fs')
    const user = req.session.user._id;
    console.log('POST '+user._id);
    var img = req.files.mascotaImg;
    var path = req.files.mascotaImg.path
    var newPath = './public/fotos/' + req.files.mascotaImg.originalFilename;
    var is = fs.createReadStream(path);
    var os = fs.createWriteStream(newPath);
    var addedPet;
   is.pipe(os)

    is.on('end', function () {
        //eliminamos el archivo temporal
        //fs.unlink(path);
        const t = new Date();
        var date = formatDate(t) // Formateamos la fecha dia/mes/año ESP
        var hour = t.getHours()+":"+t.getMinutes();
        date = date+","+hour;
        console.log(moment().format('LL'))
        /** Subimos la imagen a cloudinary */
        cloudinary.uploader
            .upload(newPath,(result) => {
                //console.log(result)
                let mascot = new Mascot({
                    nombre: req.body.nombre,
                    edad: req.body.edad,
                    info: req.body.info,
                    url: result.url,
                    date: moment().format('LL'),
                    idUser: user
                });
                addedPet = mascot;
                mascot.save()
                .then((val) =>{
                    client.publish('images',JSON.stringify(addedPet));
                },(res) =>{
                    console.log('La imagen no fue guardada');
                });
                res.redirect('/');
            });
    });
    /**
     * TODOS
     * meter mas de una imagen
     * cargar con un virtual schema si no tiene imagen asiganada
     */
    // alfonso.save().then(() => console.log(alfonso.username));
});

function formatDate(date) {
    /* var monthNames = [
       "Enero", "Febrero", "Marzo",
       "Abril", "Mayo", "Junio", "Julio",
       "Agosto", "Septiembre", "Octubre",
       "Noviembre", "Diciembre"
     ];*/
    var monthNames = [
       "Ene", "Feb", "Mar",
       "Abr", "May", "Jun", "Jul",
       "Ago", "Sep", "Oct",
       "Nov", "Dic"
     ];
   
     //var day = date.getDate();
     var monthIndex = date.getMonth();
     var year = date.getFullYear();
   
   //  return day + ' ' + monthNames[monthIndex] + ' ' + year;
     return  date.getDate()+' ' + monthNames[monthIndex] + ' ' + year;
   }
module.exports = router;