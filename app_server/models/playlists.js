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
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: Date
});

mongoose.model('Playlists', playlistsSchema);