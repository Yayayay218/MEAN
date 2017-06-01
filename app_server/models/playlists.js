var mongoose = require('mongoose'), Schema = mongoose.Schema;
var playlistsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    key: String,
    coverPhoto: String,
    type: {
        type: Number,
        default: 0
    }
});

mongoose.model('Playlists', playlistsSchema);