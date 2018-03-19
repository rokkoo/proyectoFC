//var app = require('express')();
var bodyParser = require('body-parser');
var express = require('express');
var multipart = require('connect-multiparty');

//Importamos nuestros controllers
var index = require('./controllers/index');
var mascotForm = require('./controllers/addMascot')
var userForm = require('./controllers/UserController')
var loginForm = require('./controllers/LoginController')
var registerForm = require('./controllers/RegisterController')
var session = require('client-sessions')
var realtime = require('./config/realtime/realTime')
var view = '/views';

var app = express();
var http = require('http').createServer(app);
var router = express.Router();
realtime(http);
app.enable('trust proxy');

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

// Login MiddleWare 
function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(multipart()); //Express 4


app.use(express.static('public'));
//Nuestro sistema de templates - EJS
app.set('view engine', 'ejs')
app.set('views', 'views');
 
//Rutas
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));


app.use('/', index);
app.use('/login', loginForm);
app.use('/perfil', requireLogin, userForm);
app.use('/registrate', registerForm);
app.use('/nuevaMascota', mascotForm);
app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

/*
//Conexion con el socket
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});*/

var port = process.env.PORT || 88;

http.listen(port, function(){
  console.log('listening on *:' + port);
});
    


// Exportar la variable 'app' que contiene express para poder usarla-requerirla en otros ficheros
module.exports = app;
