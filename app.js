//var app = require('express')();
var bodyParser = require('body-parser');
var express = require('express');

//Importamos nuestros controllers
var index = require('./controllers/index');
var mascotForm = require('./controllers/addMascot')
var userForm = require('./controllers/UserController')
var view = '/views';

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var router = express.Router();

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));
//Nuestro sistema de templates - EJS
app.set('view engine', 'ejs')
app.set('views', 'views');
 
//Rutas
app.use('/nuevaMascota',mascotForm);
app.use('/nuevoUsuario',userForm.nuevo);

app.get('/', index.index);
app.get('/enviarPrivado', );
app.get('/mundo', function(req, res){
res.send('Hola mundo');
//Root en el que se a buscar el archivo
//res.sendFile('header.html', { root: './views' })
});

//Conexion con el socket
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});

var port = process.env.PORT || 88;

http.listen(port, function(){
  console.log('listening on *:' + port);
});
    


// Exportar la variable 'app' que contiene express para poder usarla-requerirla en otros ficheros
module.exports = app;
