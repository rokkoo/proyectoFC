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
        // TODO poner el titulo por defecto
        $('#titulo').text('Adoptapp ('+post.length+')');
        $('#actu').html(`<div id="reload" class="btn btn-primary fadeIn">${post.length} Nueva actualización</div>`);
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
            <img src="${post[i].url}" alt="" width="400" height="400" srcset="" style="border-radius: 10px;">
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
      socket.on('chat1', (data) => {
        $('#main').prepend(`${data}`);
      });
      socket.on('nuevo post', function (msg) {
        msg = JSON.parse(msg);
        post.push(msg);
        // TODO crear un array he ir añadiendo los JSON que vayan llegando y cuando los vea vaciarlo.
        console.log(post);
        $('#actu').html('<div id="reload" class="btn btn-primary fadeIn">Nuevos post</div>');
      });

