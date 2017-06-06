var mongoose = require('mongoose'), Schema = mongoose.Schema;
var autoIncre = require('mongoose-sequence');
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
    updateAt: Date,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    }
});
playlistsSchema.plugin(mongoosePaginate);
playlistsSchema.plugin(autoIncre, {inc_field: 'playlist_id'});

mongoose.model('Playlists', playlistsSchema);