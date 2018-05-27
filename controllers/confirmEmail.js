let express = require("express");
let router = express.Router();
var Mascot = require("./../models/mascot");
var User = require("./../models/user");

router.get("/:idUser", (req, res, next) => {
    User.findOne({_id: req.params.idUser}, function (err, user) {
        console.log(user);
        if(user == null){
            res.render("404", {
                pagina: "ERROR",
            });
        }else{
            user.emailConfirmado = 1;
            user.save();
            res.render("confirmado", {
                usuario: user,
                pagina: user.nombre,
            });
        }
    });
});


module.exports = router;
