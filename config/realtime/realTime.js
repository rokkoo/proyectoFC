module.exports = function (server) {
'use strict';
var io = require('socket.io')(server);
/*
io.use( (socket, next) =>{
    /** Middleware de session 
});
*/

//Conexion con mensajes N-N
io.on('connection', function(socket){
    console.log('sockets');

    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });

    socket.on('nuevo post', function(msg){
        io.emit('nuevo post', msg);
      });
  });
}
