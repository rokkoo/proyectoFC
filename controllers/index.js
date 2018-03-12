let express = require('express');
let router = express.Router();

var Mascot = require('./../models/mascot');

router.get('/', (req, res, next) => {
    Mascot.find((err, mascotas) => {
        if(err) throw err;
        console.log({ mascotas : mascotas});
        var nombrePagina = 'ADOPTAPP';
        res.render('index',{
            //Objeto
            pagina : nombrePagina,
            mascotas : mascotas
        });    
    });
});
module.exports = router;