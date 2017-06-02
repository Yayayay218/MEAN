var express = require('express');
var router = express.Router();

var ctrlCategory = require('../controllers/category.controller');
var ctrlPlaylist = require('../controllers/playlist.controller');

//  Category APIs
router.post('/category', ctrlCategory.categoryPost);
router.get('/categories', ctrlCategory.categoryGetAll);
router.put('/category/:categoryID', ctrlCategory.categoryPut);
router.delete('/category/:categoryID', ctrlCategory.categoryDel);

//  Playlist APIs
router.post('/playlist', ctrlPlaylist.playlistPost);
router.get('/playlists', ctrlPlaylist.playlistGetAll);
router.delete('/playlist/:playlistID', ctrlPlaylist.playlistDel);

module.exports = router;
