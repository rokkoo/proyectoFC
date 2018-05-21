let express = require('express');
let router = express.Router();
var Mascot = require("./../models/mascot");
var User = require("./../models/user");

const mongoose = require('./../config/mongoose/conn');
var User = require('./../models/user');


router.get('/', (req, res, next) => {
    var nombrePagina = '¡No estás conectado!';
    if(req.session.user == null){
        res.render('notLogged',{
            pagina : nombrePagina,
        });
    }else{
        Mascot.find({idUser: req.session.user._id}, function (err, mascotas) {
            res.render('users/profileUser',{
                usuario : req.session.user,
                mascotas : mascotas,
                pagina : nombrePagina,
            });    
        });
    }
    
});

router.get("/:_id", (req, res, next) => {
    User.findOne({_id: req.params._id}, function (err, user) {
        Mascot.find({idUser:  req.params._id}, function (err, mascotas) {
            res.render("users/profileUser", {
                usuario: req.session.user,
                user: user,
                pagina: user.nombre,
                mascotas: mascotas
            });
        });
    });
});

module.exports = router;