//TODO hacer el require del dotenv para usar la variable del puerto en el que esta
let my_username = '';
let myChats = new Array({email: 'a@a.com',msg:'asdasd'},{email: 'b@a.com',msg:'a'},{email: 'c@a.com',msg:'b'});
const myUsers = new Set();
const usuarios = new Array();
const server = '192.168.137.34:3000'
var socket = io.connect(server);
comprobar = email => {
    //comprobamos que el array tenga el email
    if(myUsers.has(email)){
        return true
    }else{
        myUsers.add(email);
        return false;
    }
};

const filterChat = email => {
    return myChats.filter(chat =>
      chat.email == email
    );
  }

function send_individual_msg(email) {
    //alert(id);
    //alert(my_username);
    generarChat(email);
    hideChat(1);
    // socket.emit('check_user', my_username, id);
    //socket.emit('msg_user', id, my_username, prompt("Type your message:"));
}
// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function () {
    // call the server-side function 'adduser' and send one parameter (value of prompt)
    socket.emit('adduser', userEmail);
});
// listener, whenever the server emits 'msg_user_handle', this updates the chat body
socket.on('msg_user_handle', function (username, data) {
    //A la escucha de un mensaje solo para el usuario
    let mensaje = {email: username, msg: data}
    myChats.push(mensaje);
    msg = filterChat(username);
    console.log(msg);
    console.log('nuevo chat msg_user');
    $('#conversation').append('<b>' + username + ':</b> ' + data + '<br>');
    $('#chat_converse').append(`<span class="chat_msg_item chat_msg_item_admin">
    <div class="chat_avatar">
         <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
    </div>${mensaje.msg}</span>`);
});

// listener, whenever the server emits 'msg_user_found'
socket.on('msg_user_found', function (username) {
    // TODO comprobar antes de enviar que el usuario no haya cambiado de socket
    //alert(username);
    hideChat(1); //Cambiamos a la vista de chat 1*1
    // socket.emit('msg_user', username, my_username, prompt("Escribe el mensaje:"));
    // socket.emit('msg_user', username, my_username, prompt("Escribe el mensaje:"));
    socket.emit('msg_user', username, my_username, msg);
    console.log(filterChat(username));
    generarpostChat(msg);
    $('#chatSend').val("") //vaciamos el input
});
// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
    //A la escucha de un mesnaje para todo el grupo
    console.log('nuevo chat updatechat');
    $('#conversation').append('<b>' + username + ':</b> ' + data + '<br>');
});

// listener, whenever the server emits 'store_username', this updates the username
socket.on('store_username', function (username) {
    my_username = username;
});
// listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateusers', function (data) {
    //alert(data);
    // console.log(data);
    $('#users').empty();
    $.each(data, function (key, value) {
        //Mostramos en nombre en el chat de seleccion
        /**
         * @param key = correo
         * 
         * @param value = socket
         */
        if( !comprobar(key) ) {
            $('#usr').append(`
            <ul id="${key}"style="cursor:pointer;" onclick="send_individual_msg('${key}')">
            ${key}</ul>
            <hr>`);
        }else{
            document.getElementById(`${key}`).setAttribute( 'onclick', `send_individual_msg('${key}')` );
            console.log(`Correo -> ${key} -> ${value}`);
            
        }
        $('#users').append('<div style="cursor:pointer;" onclick="send_individual_msg(\'' + value + '\')">' + key + '</div>');

    });
});
// on load of page
$(function () {
    // when the client clicks SEND
    $('#datasend').click(function () {
        var message = $('#data').val();
        if (message == '' || jQuery.trim(message).length == 0)
            return false;
        $('#data').val('');
        // tell server to execute 'sendchat' and send along one parameter
        socket.emit('sendchat', message);
    });
    // when the client hits ENTER on their keyboard
    $('#data').keypress(function (e) {
        if (e.which == 13) {
            $(this).blur();
            //$('#datasend').focus().click();
            $('#datasend').click();
        }
    });
});
