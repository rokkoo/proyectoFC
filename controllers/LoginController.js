
let express = require('express');
let router = express.Router();

const mongoose = require('../config/mongoose/conn');
var User = require('../models/user');

router.get('/', (req, res, next) => {
    var nombrePagina = 'Conéctate!';
    res.render('users/loginUser',{
        //Objeto
        pagina : nombrePagina,
    });    
});

router.post('/logueando', (req, res, next) => {
    if (req.body.logEmail && req.body.logContrasena) {
        User.authenticate(req.body.logEmail, req.body.logContrasena, function (error, user) {
          if (error || !user) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
          } else {
            req.session.userId = user._id;
            req.session.userNombre = user.nombre;
            return res.redirect('/registrate');
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

