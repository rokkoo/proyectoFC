let express = require('express');
let router = express.Router();
var Mascot = require('./../models/mascot');
const options = { sort: {nombre : 1}};
/** Pagina de inicio */
router.get('/', (req, res, next) => {
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