var mongoose = require('mongoose'), Schema = mongoose.Schema;
var categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    updateAt: Date,
    createAt: {
        type: Date,
        default: Date.now()
    },
    playlists: [{type: Schema.Types.ObjectId, ref: 'Playlists'}]
});

mongoose.model('Categories', categoriesSchema);