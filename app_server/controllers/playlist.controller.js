var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});

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
    var data = req.body;

    upload(req, res, function (err) {
        if (err) {
            res.json({error_code: 1, err_desc: err});
            return;
        }
        else {
            var playlist = new Playlists(data);

            playlist.save(function (err, playlist) {
                if (err)
                    sendJSONresponse(res, 400, err);
                else {
                    console.log(playlist.coverPhoto.substring(22));
                    gm('app_server/'+playlist.coverPhoto.substring(22))
                        .resize('144', '144')
                        .autoOrient()
                        .write('app_server/'+playlist.coverPhoto.substring(22), function (err) {
                            if (err)
                                console.log(err);
                        });
                    sendJSONresponse(res, 201, {'data': playlist});
                }
            })
        }
    })
};

//  GET All Playlists
module.exports.playlistGetAll = function (req, res) {
    var query = req.query || {};

    const page = Number(req.query.page);
    delete req.query.page;
    const limit = Number(req.query.limit);
    delete req.query.limit;
    const sort = req.query.sort;
    delete req.query.sort;

    Playlists.paginate(
        query,
        {
            sort: sort,
            populate: 'category',
            page: page,
            limit: limit
        },
        function (err, category) {
            if (err)
                sendJSONresponse(res, 404, err);
            else {
                var results = {
                    data: category.docs,
                    total: category.total,
                    limit: category.limit,
                    page: category.page,
                    pages: category.pages
                };
                sendJSONresponse(res, 200, results);
            }
        })
};

//  GET a playlist
module.exports.playlistGetOne = function (req, res) {
    Playlists.findById(req.params.id)
        .populate('category')
        .exec(function (err, playlist) {
            if (err)
                sendJSONresponse(res, 404, err);
            else
                sendJSONresponse(res, 200, {'data': playlist})
        })
};
//  DEL a playlist
module.exports.playlistDel = function (req, res) {
    var playlistID = req.params.id;
    if (playlistID) {
        Playlists.findByIdAndRemove(playlistID, function (err, playlist) {
            if (err) {
                sendJSONresponse(res, 404, err);
            }
            else {
                // var filePath = 'app_server/uploads/playlists/' + playlist.coverPhoto;
                // fs.unlink(filePath);
                sendJSONresponse(res, 204, {data: playlist});
            }

        });
    } else {
        sendJSONresponse(res, 404, {'message': 'Not found playlistID'});
    }
};

//  PUT a playlist
module.exports.playlistPut = function (req, res) {
    var data = req.body;
    upload(req, res, function (err) {
        if (err) {
            return res.json({error_code: 1, err_desc: err});
        }
        else
            Playlists.findOneAndUpdate({_id: req.params.id}, data, function (err, playlist) {
                if (err)
                    sendJSONresponse(res, 400, err);
                else {
                    if (playlist) {
                        playlist.updateAt = Date.now();
                        sendJSONresponse(res, 201, {'data': playlist});
                    }
                    else
                        sendJSONresponse(res, 404, {'message': 'not found this playlist'})
                }
            })
    })

};

