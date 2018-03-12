
let express = require('express');
let router = express.Router();

const mongoose = require('./../config/mongoose/conn');
var User = require('./../models/user');


router.get('/', (req, res, next) => {
    var nombrePagina = 'Conéctate!';
    res.render('users/loginUser',{
        //Objeto
        pagina : nombrePagina,
    });    
});

module.exports = router;

