var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Keywords = mongoose.model('Keywords');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

//  POST a keyword
module.exports.keywordPost = function (req, res) {
    var keyword = new Keywords();
    keyword.key = req.body.key;
    keyword.save(function (err, keyword) {
        if (err)
            sendJSONresponse(res, 400, err);
        else{
            sendJSONresponse(res, 201, {'data': keyword});
        }
    })
};

//  GET all keyword
module.exports.keywordGetAll = function (req, res) {
    var query = req.query || {};

    const page = Number(req.query.page);
    delete req.query.page;
    const limit = Number(req.query.limit);
    delete req.query.limit;
    const sort = req.query.sort;
    delete req.query.sort;

    Keywords.paginate(
        query,
        {
            sort: sort,
            page: page,
            limit: limit
        },
        function (err, keyword) {
            if (err)
                sendJSONresponse(res, 404, err);
            else {
                var results = {
                    data: keyword.docs,
                    total: keyword.total,
                    limit: keyword.limit,
                    page: keyword.page,
                    pages: keyword.pages
                };
                sendJSONresponse(res, 200, results);
            }
        })
};

//  GET a keyword
module.exports.keywordGetOne = function (req, res) {
    Keywords.findById(req.params.id)
        .exec(function (err, keyword) {
            if (err)
                sendJSONresponse(res, 404, err);
            else
                sendJSONresponse(res, 200, {'data': keyword})
        })
};

//  DEL keyword
module.exports.keywordDel = function (req, res) {
    var keywordID = req.params.id;
    if (keywordID) {
        Keywords.findByIdAndRemove(keywordID, function (err) {
            if (err) {
                sendJSONresponse(res, 404, err);
            }
            sendJSONresponse(res, 204, {'message': 'success'});

        });
    } else {
        sendJSONresponse(res, 404, {'message': 'Not found keywordID'});
    }
};

//  PUT keyword
module.exports.keywordPut = function (req, res) {
    if (req.params.id) {
        Keywords.findById(req.params.id, function (err, keyword) {
            if (err) {
                res.send(err);
                return;
            }
            keyword.key = req.body.key;
            keyword.updateAt = Date.now();

            keyword.save(function (err, keyword) {
                if (err) {
                    res.send(err);
                } else {
                    sendJSONresponse(res, 201, {'data': keyword});
                }
            });
        });
    } else {
        sendJSONresponse(res, 404, {'message': 'Not found keywordID'});
    }
};