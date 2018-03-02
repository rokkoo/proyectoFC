var app = require('express')();
var bodyParser = require('body-parser');
var express = require('express');



var http = require('http').Server(app);
var io = require('socket.io')(http);

//Importamos nuestros controllers
//var api = require('./routes/favorito');

var view = '/views';

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res){
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
