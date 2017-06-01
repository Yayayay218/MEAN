var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Playlists = mongoose.model('Playlists');

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

//  POST a playlist
module.exports.playlistPost = function (req, res) {
    upload(req, res, function (err) {
        if(err){
            res.json({error_code: 1, err_desc: err});
            return;
        }
        else {
            var img = req.file || {};
            var playlist = new Playlists();
            playlist.name = req.body.name;
            playlist.key = req.body.key;
            playlist.coverPhoto = img.filename;
            playlist.save(function (err, playlist) {
                if(err)
                    sendJSONresponse(res, 400, err);
                else
                    sendJSONresponse(res, 201, playlist);
            })
        }
    })
};

//  GET All Playlists
module.exports.playlistGetAll = function (req, res) {
    Playlists.find(function (err, playlist) {
        if (err) {
            sendJSONresponse(res, 404, err)
        }
        else {
            sendJSONresponse(res, 200, {'data': playlist});
        }
    });
};