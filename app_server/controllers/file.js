var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

//  Config upload photo
var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'app_server/uploads/playlists')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});
var upload = multer({
    storage: storage
}).single('file');

exports.uploadFile = function(req,res){
    upload(req,res,function(err){
        console.log(req.file);
        if(err){
            console.log("error:"+err);
            sendJSONresponse(res, 400, {message: 'fail'});
        }
        if (!req.file) {
            sendJSONresponse(res, 404, {message: 'fail'})
        }
        var url = req.protocol + '://' + req.get('host') +'/'+ req.file.path.substring(11);
        console.log(url);
        sendJSONresponse(res, 200, url);
    })
};