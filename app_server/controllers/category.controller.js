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
    category.createAt = category.createAt.toString();
    category.save(function (err, category) {
        if (err)
            sendJSONresponse(res, 400, err);
        else
            sendJSONresponse(res, 201, {'data': category});
    })
};

//  GET all categories
module.exports.categoryGetAll = function (req, res) {
    var query = req.query || {};

    const page = Number(req.query.page);
    delete req.query.page;
    const limit = Number(req.query.limit);
    delete req.query.limit;
    delete req.query.sort;

    Categories.paginate(
        query,
        {
            populate: 'playlists',
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

//  GET a category
module.exports.categoryGetOne = function (req, res) {
    Categories.findById(req.params.id)
        .populate('playlists')
        .exec(function (err, category) {
            if(err)
                sendJSONresponse(res, 404, err);
            else
                sendJSONresponse(res, 200, {'data': category})
        })
};

//  DEL category
module.exports.categoryDel = function (req, res) {
    var categoryID = req.params.id;
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
    if (req.params.id) {
        Categories.findById(req.params.id, function (err, category) {
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
                    sendJSONresponse(res, 201, {'data': category});
                }
            });
        });
    } else {
        sendJSONresponse(res, 404, {'message': 'Not found categoryID'});
    }
};