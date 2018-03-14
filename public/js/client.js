    var socket = io();
    var post = [];
          //Enviar mensaje a el canal 
    // $('form').submit(function () {
    //     socket.emit('chat message', $('#m').val());
    //     $('#m').val('');
    //     return false;
    //   });
      //A la escuchba del canal
      socket.on('todos chat', (msg) => {
        console.log(msg);
        $('#actu').html(`<div id="reload" class="btn btn-primary fadeIn">${post.length}Nueva actu</div>`);
        $('#reload').click(()=>{
          console.log('clikeado boton');
          for (let i = 0; i < post.length; i++) {
            $('#main').prepend(`
            <div class="col-md-12">
            <div class="panel panel-default">
            <div class="panel-heading">
            <h3 class="panel-title">${post[i].nombre}</h3>
            </div>
            <div class="panel-body">
            <img src="${post[i].url}" alt="" srcset="">
            <p>Información: ${post[i].info}</p>
            <p>Edad: ${post[i].edad}</p>
            <p>Fecha del post: ${post[i].date}</p>
            </div>
            </div>
            </div>
            `);
          };
          post = [];
        });
      });
      socket.on('nuevo post', function (msg) {
        msg = JSON.parse(msg);
        post.push(msg);
        // TODO crear un array he ir añadiendo los JSON que vayan llegando y cuando los vea vaciarlo.
        console.log(post);
        $('#actu').html('<div id="reload" class="btn btn-primary fadeIn">Nuevos post</div>');
      });

