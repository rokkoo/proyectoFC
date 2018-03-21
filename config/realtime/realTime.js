module.exports = function(server) {
  "use strict";
  var io = require("socket.io")(server);
  var redis = require("redis");

  /*
    io.use( (socket, next) =>{
        /** Middleware de session 
    });
    */
  var client = redis.createClient();
  var chat = redis.createClient();

  client.subscribe("images");
  client.subscribe("chat");

  client.on("message", function(channel, msg) {
    if (channel == "images") {
      // Canal de envio de nuevas imagenes
      io.emit("nuevo post", msg);
    }
    if (channel == "chat") {
      // Mensaje para el chat N*N
      io.emit("todos chat", msg);
    }
  });
  //Conexion con mensajes N-N
  io.on("connection", function(socket) {
    io.emit("chat1", "usuario añadido");
  });
};
