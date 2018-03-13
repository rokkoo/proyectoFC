//var app = require('express')();
var bodyParser = require('body-parser');
var express = require('express');
var multipart = require('connect-multiparty');

//Importamos nuestros controllers
var index = require('./controllers/index');
var mascotForm = require('./controllers/addMascot')
var userForm = require('./controllers/UserController')
var loginForm = require('./controllers/LoginController')
var session = require('express-session')
var realtime = require('./config/realtime/realTime')
var view = '/views';

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var router = express.Router();
realtime(http);
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

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
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));


app.use('/',index);
app.use('/login', loginForm);
app.use('/nuevaMascota',mascotForm);
app.use('/registrate', requiresLogin , userForm);
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
