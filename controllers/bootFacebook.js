'use strict'
//variables de entorno
require("dotenv").config();

router.get("/", (req, res, next) => {
    // Verificar la coincidendia del token
    if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
        // Mensaje de exito y envio del token requerido
        console.log("webhook verificado!");
        res.status(200).send(req.query["hub.challenge"]);
    } else {
        // Mensaje de fallo
        console.error("La verificacion ha fallado, los tokens no coinciden");
        res.sendStatus(403);
    }
  });

  // Todos eventos de mesenger sera apturados por esta ruta
app.post("/webhook", function (req, res) {
    // Verificar si el vento proviene del pagina asociada
    if (req.body.object == "page") {
        // Si existe multiples entradas entraas
        req.body.entry.forEach(function(entry) {
            // Iterara todos lo eventos capturados
            entry.messaging.forEach(function(event) {
                if (event.message) {
                    process_event(event);
                }
            });
        });
        res.sendStatus(200);
    }
});

// Funcion donde se procesara el evento
function process_event(event){
    // Capturamos los datos del que genera el evento y el mensaje 
    var senderID = event.sender.id;
    var message = event.message;
    
    // Si en el evento existe un mensaje de tipo texto
    if(message.text){
        // Crear un payload para un simple mensaje de texto
        var response = {
            "text": 'Has escrito lo siguiente: ' + message.text
        }
    }
    // Enviamos el mensaje mediante SendAPI
    enviar_texto(senderID, response);
}

// Funcion donde el chat respondera usando SendAPI
function enviar_texto(senderID, response){
    // Construcicon del cuerpo del mensaje
    let request_body = {
        "recipient": {
          "id": senderID
        },
        "message": response
    }
    
    // Enviar el requisito HTTP a la plataforma de messenger
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
          console.log('Mensaje enviado!')
        } else {
          console.error("No se puedo enviar el mensaje:" + err);
        }
    }); 
}


 module.export = router;