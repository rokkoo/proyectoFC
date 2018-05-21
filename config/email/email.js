const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const templatesDir = path.resolve(__dirname, '../..', 'emails/hello');

let options = {
  viewPath: templatesDir,
  extName: '.ejs'
};


//Datos de nuestra autentifiacion con el server de gmail
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: 'appadoptes@gmail.com',
      clientId: process.env.google_client,
      clientSecret: process.env.google_secret,
      refreshToken: process.env.google_refresh
    }
  });

let send = mailOptions => {
    let enviado = true;
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return !enviado;
        return enviado;
      });
    return enviado;
};

module.exports.Options = (to,vars) => {
    let mailOptions = {
        from: '<appadoptes@gmail.com>',
        to: to,
        subject: 'Adoptapp',
        // html: '<h1> Hola! </h1>'
        template: 'hello',
        context:{
          data: vars
        }
      };
    
    //Compilamos los datos con el template
    transporter.use('compile', hbs(options));

    //Enviamos el correo    
    return send(mailOptions);
};
