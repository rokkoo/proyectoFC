let express = require("express");
let router = express.Router();
var Mascot = require("./../models/mascot");
var User = require("./../models/user");

router.get("/:idUser", (req, res, next) => {
    User.findOne({_id: req.params.idUser}, function (err, user) {
        user.confirmEmail = 1;
        user.save();
        res.render("confirmado", {
            usuario: user,
            pagina: user.nombre,
        });
    });
});


module.exports = router;
