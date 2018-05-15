    socket = io();
    var post = [];
    let twittBox = [];
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
      
      socket.on('nuevoTwitt', (data) => {
        let twitt = JSON.parse(data);
        let url = `https://twitter.com/${twitt.user}/status/${twitt.id}`;
        twittBox.push(url)
        console.log('recibido '+twittBox);
        $('#badg').text(twittBox.length);
          $('#notificaciones').append(`
          <li>
            <a href="${url}" target="_blank">
                <span class="pull-left"><i class="fa fa-user-plus fa-2x text-info"></i></span>
                <span>${twitt.user}<br><small class="text-muted">5 minutes ago</small></span>
            </a>
          </li>`);
      });

      socket.emit('adduser', userEmail);

      socket.on('updateusers', (data) => {
        // console.log(data);
      });

      socket.on('msg_user_handle', (username, msg) => {
        console.log(username);
        console.log(data);
      });
      

      ////////////////////////////////////////////////////////////


      var x = document.getElementById("location");
      console.log('====================================');
      console.log(mascotas);
      console.log('====================================');
      function getLocation() {
          console.log('====================================');
          console.log('location');
          console.log('====================================');
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
          } else {
              x.innerHTML = "Geolocation is not supported by this browser.";
          }
      }
      function showPosition(position) {
          console.log('====================================');
          console.log('entras a enviar');
          console.log('====================================');
          var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyA88ZZI6IIhaXxQ0YrQHvRsInn7SGnQVbE`;
          
          var latitud = position.coords.latitude;
          var longitud= position.coords.longitude;
          console.log(latitud);
          console.log(longitud);
          socket.emit('latitud', latitud);
          socket.emit('longitud', longitud);

          sessionStorage.setItem("latitud", latitud);
          sessionStorage.setItem("longitud", longitud);
          ordenar();
          $.post(url, function () {
          })
              .done(function () {
                  $('#location').text('esperando...');
              })
              .always(function (data) {
                  var data = data.results[0].address_components[1].long_name;
                  //console.log(data)
                  $('#location').html(`<p class="text-center"> <i class="fas fa-map-marker-alt fa-fw"></i> <div> ${data}</div></p>`);
              });
      }
      
      function pasarValores(){
          var animales = document.getElementById
          for(i=0;i<distancias.length;i++){
              var string = 
              '<div class="post col-md-6">'+
                  '<div class="post-child post-left" style="text-align:left">'+
                      '<img src="'+distancias[i].url+'" title="This is a placeholder image">'+
                  '</div>'+
                  '<div class="post-child post-right">'+
                      '<h1>'+distancias[i].nombre+'</h1><hr>'+
                      '<div>Edad:'+distancias[i].edad+'</div>'+
                      '<div>Tamaño del perro: Grande</div>'+
                      '<div id="fecha">Fecha del post:'+
                          '<span>'+distancias[i].date+'</span>'+
                      '</div>'+
                      '<a class="btn-circle">&#x21e2;</a>'+
                  '</div>'+
              '</div>';
              document.getElementById("main")=string;
          }
      }

