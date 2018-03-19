let express = require('express');
let router = express.Router();

const mongoose = require('./../config/mongoose/conn');
var User = require('./../models/user');


router.get('/', (req, res, next) => {
        var nombrePagina = 'PERFIL:';

        res.render('users/profileUser',{
            usuario : req.session.user,
            pagina : nombrePagina,
        });    
});

module.exports = router;