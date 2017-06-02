var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Categories = mongoose.model('Categories');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

//  POST a category
module.exports.categoryPost = function (req, res) {
    var category = new Categories();
    category.name = req.body.name;
    category.playlists = req.body.playlist;
    category.save(function (err, category) {
        if (err)
            sendJSONresponse(res, 400, err);
        else
            sendJSONresponse(res, 201, category);
    })
};

//  GET all categories
module.exports.categoryGetAll = function (req, res) {
    Categories.find({})
        .sort({name: 'asc'})
        .find({})
        .populate('playlists')
        .exec(function (err, category) {
            if (err)
                sendJSONresponse(res, 404, err);
            else
                sendJSONresponse(res, 200, {'data': category});
        })
};

//  DEL category
module.exports.categoryDel = function (req, res) {
    var categoryID = req.params.categoryID;
    if (categoryID) {
        Categories.findByIdAndRemove(categoryID, function (err) {
            if (err) {
                sendJSONresponse(res, 404, err);
            }
            sendJSONresponse(res, 204, {'message': 'success'});

        });
    } else {
        sendJSONresponse(res, 404, {'message': 'Not found categoryID'});
    }
};

//  PUT category
module.exports.categoryPut = function (req, res) {
    if (req.params.categoryID) {
        Categories.findById(req.params.categoryID, function (err, category) {
            if (err) {
                res.send(err);
                return;
            }
            category.name = req.body.name;
            category.playlists = req.body.playlist;
            category.updateAt = Date.now();

            category.save(function (err, category) {
                if (err) {
                    res.send(err);
                } else {
                    sendJSONresponse(res, 201, category);
                }
            });
        });
    } else {
        sendJSONresponse(res, 404, {'message': 'Not found categoryID'});
    }
};