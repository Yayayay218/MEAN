var express = require('express');
var router = express.Router();

var ctrlCategory = require('../controllers/category.controller');
var ctrlPlaylist = require('../controllers/playlist.controller');
var ctrlFile = require('../controllers/file');

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

//  File
router.post('/file', ctrlFile.uploadFile);
module.exports = router;
