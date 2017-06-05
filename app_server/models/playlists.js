var mongoose = require('mongoose'), Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

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
playlistsSchema.plugin(mongoosePaginate);

mongoose.model('Playlists', playlistsSchema);