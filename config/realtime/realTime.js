module.exports = function (server) {
'use strict';
var io = require('socket.io')(server);
var redis = require('redis');

/*
io.use( (socket, next) =>{
    /** Middleware de session 
});
*/

//Conexion con mensajes N-N
io.on('connection', function(socket){
    console.log('Cliente conectado');
    var client = redis.createClient();
    client.subscribe('images');

    client.on('message', function(channel,msg){
        console.log(msg);
        client.emit('nuevo post', msg);
      });
  });
}
