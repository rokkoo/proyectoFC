//var app = require('express')();
var bodyParser = require('body-parser');
var express = require('express');
var multipart = require('connect-multiparty');
const Twitter = require('twitter');
const redis = require('redis');

//variables de entorno
require('dotenv').config();

//emails
const nodemailer = require('nodemailer');

//Importamos nuestros controllers
var index = require('./controllers/index');
var mascotForm = require('./controllers/addMascot');
var userForm = require('./controllers/UserController');
var loginForm = require('./controllers/LoginController');
var registerForm = require('./controllers/RegisterController');
var session = require('client-sessions');
var realtime = require('./config/realtime/realTime');
var streaming = require('./controllers/streaming');


var view = '/views';

const app = new express();
const http = require('http').Server(app);
var router = express.Router();
realtime(http);
//var io = require("socket.io")(http);
app.enable('trust proxy');

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

// Login MiddleWare 
function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};


// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(multipart()); //Express 4


app.use(express.static('public'));
//Nuestro sistema de templates - EJS
app.set('view engine', 'ejs')
app.set('views', 'views');
 
//Rutas
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));


app.use('/', index);
app.use('/login', loginForm);
app.use('/perfil', requireLogin, userForm);
app.use('/registrate', registerForm);
app.use('/streaming', streaming);
app.use('/nuevaMascota', requireLogin, mascotForm);
app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

//Conexion con el socket
// let clients =  new Set();
// let users = [];
// io.on('connection', function(socket){
//   socket.on('streaming', function(video){
//     console.log('envio')
//     io.emit('stream', video);
//   });
// });

const rClient = redis.createClient();

//Twitter client - appadoptes@gmail.com

const client = new Twitter({
  consumer_key: 'aYataD59dggFZgiKKkYpN07Oz',
  consumer_secret: 'aCV2OsIROshZyL7RB9WxBarn4LaMLMeydcv97XoVsyDg0ElKr7',
  access_token_key: '979817070547390464-rO0Wr3iN4JzllPzt5iyiQFzMAKfg5dU',
  access_token_secret: 'qSxnE8Rm2nKqArnuocJqDQxOsquPQPgk7IXUgXjh2qnXE'
});

//Escucha del stream - track:palabras claves
const stream = client.stream('statuses/filter', {track:'#adopcionApp'});
stream.on('data', (tweet) => {

  /* Hacamos retwitt */
  client.post('statuses/retweet', {id:tweet.id_str}, (err, response) => {
      if (response) {
          console.log('Retweeteado');
      }
      // if there was an error while tweeting
      if (err) {
          console.log('Error al retwittear');
      }
  });

  /* Damos una respuesta al twitt */
  //Contruimos nuestro objeto de respuesta
  let statusObj = {status: `Hola @${tweet.user.screen_name}, puedes buscar un dueño para la mascota en nuestra web :)`};

   //llamamos a la funcion post para crear una respuesta
   client.post('statuses/update', statusObj, (error, tweetReply, response) => {
         //Si llega algun error los printeamos
         if(error){
          console.log(error);
         }else{
          //Motsramos en consola nuestra respuesta
          console.log(tweetReply.text);
         }

  });

  /* Marcamos como favorito el twitt */
  client.post('favorites/create', {id:tweet.id_str}, (error, response) => {
     if(error){
      console.log(error)
     }else{
       nuevoTwitt = {
         id: response.id_str,
         text: response.text,
         user: response.user.screen_name
       }
      // console.log(`Twit ID ${response.id_str} Liked! - ${response.text}`);
      let url = `https://twitter.com/${response.user.screen_name}/status/${response.id_str}`;
      rClient.publish('nuevoTwitt',JSON.stringify(nuevoTwitt));
     }
  });
  
});

stream.on('error', (error) => {
  console.log(`Ha ocurrido un error ${error}`)
});






var port = process.env.PORT || 88;

http.listen(port, function(){
  console.log('listening on *:' + port);
});
    


// Exportar la variable 'app' que contiene express para poder usarla-requerirla en otros ficheros
module.exports = app;
