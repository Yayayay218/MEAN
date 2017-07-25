var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Notifications = mongoose.model('Notifications');

var pushNotification = require('../config/notification.config');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

//  POST a notification
module.exports.notificationPost = function (req, res) {
    var data = req.body;

    var notification = new Notifications(data);
    notification.save(function (err, notification) {
        if (err)
            sendJSONresponse(res, 400, err);
        else {
            sendJSONresponse(res, 201, {'data': notification});
        }
    })
};

//  GET all Notifications
module.exports.notificationGetAll = function (req, res) {
    var query = req.query || {};

    const page = Number(req.query.page);
    delete req.query.page;
    const limit = Number(req.query.limit);
    delete req.query.limit;
    const sort = req.query.sort;
    delete req.query.sort;

    Notifications.paginate(
        query,
        {
            sort: sort,
            page: page,
            limit: limit
        },
        function (err, notification) {
            if (err)
                sendJSONresponse(res, 404, err);
            else {
                var results = {
                    data: notification.docs,
                    total: notification.total,
                    limit: notification.limit,
                    page: notification.page,
                    pages: notification.pages
                };
                pushNotification.pushNotification();
                sendJSONresponse(res, 200, results);
            }
        })
};

//  GET a notification
module.exports.notificationGetOne = function (req, res) {
    Notifications.findById(req.params.id)
        .exec(function (err, notification) {
            if (err)
                sendJSONresponse(res, 404, err);
            else
                sendJSONresponse(res, 200, {'data': notification})
        })
};

//  DEL notification
module.exports.notificationDel = function (req, res) {
    var notificationID = req.params.id;
    if (notificationID) {
        Notifications.findByIdAndRemove(notificationID, function (err) {
            if (err) {
                sendJSONresponse(res, 404, err);
            }
            sendJSONresponse(res, 204, {'message': 'success'});

        });
    } else {
        sendJSONresponse(res, 404, {'message': 'Not found notificationID'});
    }
};

//  PUT notification
module.exports.notificationPut = function (req, res) {
    req.body.updateAt = Date.now();
    var data = req.body;
    Notifications.findOneAndUpdate({_id: req.params.id}, data, function (err, notification) {
        if (err)
            sendJSONresponse(res, 400, err);
        else {
            if (notification) {
                sendJSONresponse(res, 201, {'data': notification});
            }
            else
                sendJSONresponse(res, 404, {'message': 'not found this notification'})
        }
    })
};