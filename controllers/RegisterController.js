let express = require('express');
let router = express.Router();

const mongoose = require('./../config/mongoose/conn');
var User = require('./../models/user');


router.get('/', (req, res, next) => {
        var nombrePagina = 'registrate';
        
        res.render('users/addUser',{
            user : req.session.user,
            pagina : nombrePagina,
        });    
});

router.post('/', (req, res, next) => {
    //Elementos que se capturan en el body
    console.log(req.body);
    let user = new User({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contrasena: req.body.contrasena,
        confirmarContrasena: req.body.confirmarContrasena,
    });
    user.save();
    req.session.userId = user._id;
    res.redirect('/home');
    // alfonso.save().then(() => console.log(alfonso.username));
});

module.exports = router;