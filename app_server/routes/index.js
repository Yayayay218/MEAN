var express = require('express');
var router = express.Router();

var ctrlCategory = require('../controllers/category.controller');
var ctrlPlaylist = require('../controllers/playlist.controller');

//  Category APIs
router.post('/category', ctrlCategory.categoryPost);
router.get('/category', ctrlCategory.categoryGetAll);
router.get('/category/:id', ctrlCategory.categoryGetOne);
router.put('/category/:id', ctrlCategory.categoryPut);
router.delete('/category/:id', ctrlCategory.categoryDel);

//  Playlist APIs
router.post('/playlist', ctrlPlaylist.playlistPost);
router.get('/playlist', ctrlPlaylist.playlistGetAll);
router.delete('/playlist/:playlistID', ctrlPlaylist.playlistDel);
router.put('/playlist/:playlistID', ctrlPlaylist.playlistPut);

module.exports = router;
