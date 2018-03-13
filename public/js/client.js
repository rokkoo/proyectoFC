    var socket = io();

    //A la escuchba del canal
    socket.on('nuevo post', function (msg) {
        console.log ('Escuchado nuevo post'+msg);
      });
/*
          //Enviar mensaje a el canal 
    $('form').submit(function () {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
      });
      //A la escuchba del canal
      socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
      });
*/