var userDB = require('../models/models').User;
const alfonso = new userDB({ username: 'Zildjian', password: '1234'});
alfonso.save().then(() => console.log(alfonso.username));
//Request - response
exports.index = function(req, res) {
    var nombrePagina = 'ADOPTAPP';
    res.render('index',{
        //Objeto
        pagina : nombrePagina
    });
};