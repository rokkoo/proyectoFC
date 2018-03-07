

//Request - response
exports.index = function(req, res) {
    var nombrePagina = 'ADOPTAPP';
    res.render('index',{
        //Objeto
        pagina : nombrePagina
    });
};