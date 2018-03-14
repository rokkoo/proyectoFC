
let express = require('express');
let router = express.Router();
var Mascot = require('./../models/mascot');

const mongoose = require('../config/mongoose/conn');
var User = require('../models/user');

router.get('/', (req, res, next) => {
    Mascot.find()
    .sort('-_id') // ordenamos de manera ascendente
    .exec((err, mascotas) => { 
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


router.get('/login', (req, res, next) => {
    var nombrePagina = 'Conéctate!';
    res.render('users/loginUser',{
        //Objeto
        pagina : nombrePagina,
    });    
});

router.post('/home', (req, res, next) => {
    if (req.body.logEmail && req.body.logContrasena) {
        User.authenticate(req.body.logEmail, req.body.logContrasena, function (error, user) {
          if (error || !user) {
            var err = 'Wrong email or password.';
            err.status = 401;
            return res.render('users/notLoggedUser',{
                //Objeto
                pagina: 'NO PERMISOS',
                message : err
            });
          } else {
            req.session.user = user;
            return res.render('users/profileUser',{
                //Objeto
                pagina: 'HOLA',
                session : req.session.user
            });
          }
        });
      } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
      }
});

router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });





module.exports = router;

