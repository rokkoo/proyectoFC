hideChat(0);

$('#prime').click(function() {      
  toggleFab();
});
let targetEmail;
let msg;
function generarChat(email) {
      //TODO cargar los mensajes que tenemos de esa persona
      console.log('g');
      
      targetEmail = email;
      targetChat = filterChat(email);
      if (targetChat.length > 0){
            for (const mensaje of targetChat) {
                  console.log(mensaje);
                  $('#chat_converse').append(`<span class="chat_msg_item chat_msg_item_admin">
                  <div class="chat_avatar">
                  <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
                  </div>${mensaje.msg}</span>`);
            }
      }
}

generarpostChat = (mensaje) => {
      console.log('entrachatPost'+mensaje);
      $('#chat_converse').append(`<span class="chat_msg_item chat_msg_item_user">
      ${mensaje}</span>
       <span class="status2">Just now. Not seen yet</span>`);
}

//enviamos el mensaje
$('#fab_send').click(function() {      
      msg = $('#chatSend').val(); 
      socket.emit('check_user', my_username, targetEmail);  
});

//Toggle chat and links
function toggleFab() {
  $('.prime').toggleClass('zmdi-comment-outline');
  $('.prime').toggleClass('zmdi-close');
  $('.prime').toggleClass('is-active');
  $('.prime').toggleClass('is-visible');
  $('#prime').toggleClass('is-float');
  $('.chat').toggleClass('is-visible');
  $('.fab').toggleClass('is-visible');
  
}

  $('#chat_first_screen').click(function(e) {
        hideChat(1);
  });
  $('.personMsg').click(function(e) {
      console.log('entra');
      
      hideChat(1);
});
  $('#chat_second_screen').click(function(e) {
        hideChat(2);
  });

  $('#chat_third_screen').click(function(e) {
        hideChat(3);
  });

  $('#chat_fourth_screen').click(function(e) {
        hideChat(4);
  });

  $('#chat_fullscreen_loader').click(function(e) {
      $('.fullscreen').toggleClass('zmdi-window-maximize');
      $('.fullscreen').toggleClass('zmdi-window-restore');
      $('.chat').toggleClass('chat_fullscreen');
      $('.fab').toggleClass('is-hide');
      $('.header_img').toggleClass('change_img');
      $('.img_container').toggleClass('change_img');
      $('.chat_header').toggleClass('chat_header2');
      $('.fab_field').toggleClass('fab_field2');
      $('.chat_converse').toggleClass('chat_converse2');
      //$('#chat_converse').css('display', 'none');
     // $('#chat_body').css('display', 'none');
     // $('#chat_form').css('display', 'none');
     // $('.chat_login').css('display', 'none');
     // $('#chat_fullscreen').css('display', 'block');
  });

function hideChat(hide) {
    switch (hide) {
      case 0:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'block');
            $('.chat_fullscreen_loader').css('display', 'none');
             $('#chat_fullscreen').css('display', 'none');
            break;
      case 1:
            $('#chat_converse').css('display', 'block');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
      case 2:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'block');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
      case 3:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'block');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
      case 4:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            $('#chat_fullscreen').css('display', 'block');
            break;
    }
}



//Copia HTML      

/* 
						<!-- chat -->
						<div class="fabs">
							<div class="chat">
							  <div class="chat_header">
								<div class="chat_option">
								<div class="header_img">
								  <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
								  </div>
								  <span id="chat_head">Jane Doe</span> <br> <span class="agent">Agent</span> <span class="online">(Online)</span>
								 <span id="chat_fullscreen_loader" class="chat_fullscreen_loader"><i class="fullscreen zmdi zmdi-window-maximize"></i></span>
						  
								</div>
						  
							  </div>
							  <div class="chat_body chat_login">
								  <a id="chat_first_screen" class="fab"><i class="zmdi zmdi-arrow-right"></i></a>
								  <p>Estos son los usarios conectados en estos momentos.<br> ¡Enviales un mensaje!<p>
								<li id="usr">
								</li>
							</div>
							  <div id="chat_converse" class="chat_conversion chat_converse">
									  <a id="chat_second_screen" class="fab"><i class="zmdi zmdi-arrow-right"></i></a>
								<span class="chat_msg_item chat_msg_item_admin">
									  <div class="chat_avatar">
										 <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
									  </div>Hey there! Any question?</span>
								<span class="chat_msg_item chat_msg_item_user">
									  Hello!</span>
									  <span class="status">20m ago</span>
								<span class="chat_msg_item chat_msg_item_admin">
									  <div class="chat_avatar">
										 <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
									  </div>Hey! Would you like to talk sales, support, or anyone?</span>
								<span class="chat_msg_item chat_msg_item_user">
									  Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
									   <span class="status2">Just now. Not seen yet</span>
							  </div>
							  <div id="chat_body" class="chat_body">
								  <div class="chat_category">
									<a id="chat_third_screen" class="fab"><i class="zmdi zmdi-arrow-right"></i></a>
								  <p>What would you like to talk about?</p>
								  <ul>
									<li>Tech</li>
									<li class="active">Sales</li>
									<li >Pricing</li>
									<li>other</li>
								  </ul>
								  </div>
						  
							  </div>
							  <div id="chat_form" class="chat_converse chat_form">
							  <a id="chat_fourth_screen" class="fab"><i class="zmdi zmdi-arrow-right"></i></a>
								<span class="chat_msg_item chat_msg_item_admin">
									  <div class="chat_avatar">
										 <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
									  </div>Hey there! Any question?</span>
								<span class="chat_msg_item chat_msg_item_user">
									  Hello!</span>
									  <span class="status">20m ago</span>
								<span class="chat_msg_item chat_msg_item_admin">
									  <div class="chat_avatar">
										 <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
									  </div>Agent typically replies in a few hours. Don't miss their reply.
									  <div>
										<br>
										<form class="get-notified">
											<label for="chat_log_email">Get notified by email</label>
											<input id="chat_log_email" placeholder="Enter your email"/>
											<i class="zmdi zmdi-chevron-right"></i>
										</form>
									  </div></span>
						  
								  <span class="chat_msg_item chat_msg_item_admin">
									  <div class="chat_avatar">
										 <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
									  </div>Send message to agent.
									  <div>
										<form class="message_form">
											<input placeholder="Your email"/>
											<input placeholder="Technical issue"/>
											<textarea rows="4" placeholder="Your message"></textarea>
											<button>Send</button> 
										</form>
						  
								  </div></span>   
							  </div>
								<div id="chat_fullscreen" class="chat_conversion chat_converse">
								<span class="chat_msg_item chat_msg_item_admin">
									  <div class="chat_avatar">
										 <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
									  </div>Hey there! Any question?</span>
								<span class="chat_msg_item chat_msg_item_user">
									  Hello!</span>
									  <div class="status">20m ago</div>
								<span class="chat_msg_item chat_msg_item_admin">
									  <div class="chat_avatar">
										 <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
									  </div>Hey! Would you like to talk sales, support, or anyone?</span>
								<span class="chat_msg_item chat_msg_item_user">
									  Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
								<span class="chat_msg_item chat_msg_item_admin">
									  <div class="chat_avatar">
										 <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
									   </div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
								<span class="chat_msg_item chat_msg_item_user">
									  Where can I get some?</span>
								<span class="chat_msg_item chat_msg_item_admin">
									  <div class="chat_avatar">
										 <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"/>
									   </div>The standard chuck...</span>
								<span class="chat_msg_item chat_msg_item_user">
									  There are many variations of passages of Lorem Ipsum available</span>
									  <div class="status2">Just now, Not seen yet</div>
								<span class="chat_msg_item ">
									<ul class="tags">
									  <li>Hats</li>
									  <li>T-Shirts</li>
									  <li>Pants</li>
									</ul>
								</span>
							  </div>
							  <div class="fab_field">
								<a id="fab_camera" class="fab"><i class="zmdi zmdi-camera"></i></a>
								<a id="fab_send" class="fab"><i class="zmdi zmdi-mail-send"></i></a>
								<textarea id="chatSend" name="chat_message" placeholder="Send a message" class="chat_field chat_message"></textarea>
							  </div>
							</div>
							  <a id="prime" class="fab"><i class="prime zmdi zmdi-comment-outline"></i></a>
                                    </div>
*/