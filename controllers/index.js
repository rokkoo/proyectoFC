//Request - response
exports.index = function(req, res) {
    var nombrePagina = 'ADOPTAPP';
    res.render('addAnimal',{
        //Objeto
        pagina : nombrePagina
    });
};