var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Categories = mongoose.model('Categories');

var sendJSONrespone = function (res, status, content) {
    res.status(status);
    res.json(content);
};

//  POST a category
module.exports.categoryPost = function (req, res) {
    var category = new Categories();
    category.name = req.body.name;

    category.save(function (err, category) {
        if (err)
            sendJSONrespone(res, 400, err);
        else
            sendJSONrespone(res, 201, category);
    })
};

//  GET all categories
module.exports.categoryGetAll = function (req, res) {
    Categories.find(function (err, category) {
        if(err)
            sendJSONrespone(res, 404, err);
        else
            sendJSONrespone(res, 200, category);
    })
};