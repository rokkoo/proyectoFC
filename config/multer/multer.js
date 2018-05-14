
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "./public/uploads");
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname);
    }
      });
module.exports = storage;