var express = require('express');
var swaggerUi = require('swagger-ui-express');

var JsonRefs = require('json-refs');
var YAML = require('js-yaml');
var router = express.Router();


var optionsRef = {
    filter: ['relative', 'remote'],
    loaderOptions: {
        processContent: function (res, cb) {
            cb(undefined, YAML.safeLoad(res.text));
        }
    }
};

JsonRefs.resolveRefsAt('./swagger/index.yaml', optionsRef).then(function (results) {
    // console.log(results.resolved);
    // console.log("================refs ",results.refs);
    router.get('/api-docs', swaggerUi.serve, swaggerUi.setup(results.resolved));
}, function (err) {
    console.log(err.stack);
});


var ctrlCategory = require('../controllers/category.controller');
var ctrlPlaylist = require('../controllers/playlist.controller');
var ctrlFile = require('../controllers/file');
var ctrlKeyword = require('../controllers/keyword.controller');
var ctrlNotification = require('../controllers/notification.controller');

//  Category APIs
router.post('/category', ctrlCategory.categoryPost);
router.get('/category', ctrlCategory.categoryGetAll);
router.get('/category/:id', ctrlCategory.categoryGetOne);
router.put('/category/:id', ctrlCategory.categoryPut);
router.delete('/category/:id', ctrlCategory.categoryDel);

//  Playlist APIs
router.post('/playlist', ctrlPlaylist.playlistPost);
router.get('/playlist', ctrlPlaylist.playlistGetAll);
router.get('/playlist/:id', ctrlPlaylist.playlistGetOne);
router.delete('/playlist/:id', ctrlPlaylist.playlistDel);
router.put('/playlist/:id', ctrlPlaylist.playlistPut);

//  Trending Keyword APIs
router.post('/keyword', ctrlKeyword.keywordPost);
router.get('/keyword', ctrlKeyword.keywordGetAll);
router.get('/keyword/:id', ctrlKeyword.keywordGetOne);
router.delete('/keyword/:id', ctrlKeyword.keywordDel);
router.put('/keyword/:id', ctrlKeyword.keywordPut);

//  File
router.post('/file', ctrlFile.uploadFile);

//  Notification
router.post('/notifications', ctrlNotification.notificationPost);
router.get('/notifications', ctrlNotification.notificationGetAll);
router.get('/notifications/:id', ctrlNotification.notificationGetOne);
router.delete('/notifications/:id', ctrlNotification.notificationDel);
router.put('/notifications/:id', ctrlNotification.notificationPut);

module.exports = router;
