let express = require('express');
let router = express.Router();

const mongoose = require('./../config/mongoose/conn');
var User = require('./../models/user');


router.get('/', (req, res, next) => {
        var nombrePagina = 'USUARIOS';

        res.render('users/addUser',{
            nombre: req.session.userId,
            pagina : nombrePagina,
        });    
});

router.get('/registrar', (req, res, next) => {
    var nombrePagina = 'REGISTRAR USUARIO';
    res.render('usersRegister',{
        //Objeto
        pagina : nombrePagina,
    });    
});

router.get('/mensajes', (req, res, next) => {
    var nombrePagina = 'MENSAJES';
    res.render('usersMPs',{
        //Objeto
        pagina : nombrePagina,
    });    
});

router.post('/nuevo', (req, res, next) => {
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
    res.redirect('/enhorabuena');
    // alfonso.save().then(() => console.log(alfonso.username));
});


router.post('/modificar', (req, res, next) => {
    //Elementos que se capturan en el body
    console.log(req.body);
    let user = new User({
        nombre: req.body.nombre,
        edad: req.body.edad,
        info: req.body.info
    });
    user.save();
    res.redirect('/');
    // alfonso.save().then(() => console.log(alfonso.username));
});

module.exports = router;