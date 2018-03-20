    var socket = io();
    var post = [];
          //Enviar mensaje a el canal 
    // $('form').submit(function () {
    //     socket.emit('chat message', $('#m').val());
    //     $('#m').val('');
    //     return false;
    //   });
      //A la escuchba del canal
      socket.on('nuevo post', (msg) => {
        // Mostramos que tenemos un nuevo/s post disponibles para su carga
        msg = JSON.parse(msg);
        post.push(msg);
        post.length == 0 ? $('#titulo').text('Adoptapp') : $('#titulo').text('Adoptapp ('+post.length+')');
        $('#actu').html(`<div id="reload" class="btn btn-primary fadeIn">${post.length} Nueva actualización</div>`);
        $('#reload').click(()=>{
          for (let i = 0; i < post.length; i++) {
            $('#main').prepend(`
            <div class="post col-md-6">
              <div class="post-child post-left">
                  <img src="${post[i].url}" title="This is a placeholder image">
              </div>
              <div class="post-child post-right">
                  <h1>${post[i].nombre}</h1>
                  <hr>
                  <p>Edad: ${post[i].edad}</p>
                  <p>Fecha del post: ${post[i].date}</p>
                  <a class="btn-circle">&#x21e2;</a>
              </div>
            </div>`);
          };
          post = [];
          $('#actu').html(''); // Dejamos de mostrar el boton de aviso de nuevas actualizaciones
          $('#titulo').text('Adoptapp'); //Ponemos el titulo por defecto
        });
      });

      socket.on('chat1', (data) => {
        // TODO carga chat 1*1  
        $('#mains').prepend(`${data}`);
      });
      



