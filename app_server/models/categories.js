var mongoose = require('mongoose'), Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var autoIncre = require('mongoose-sequence');

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

categoriesSchema.plugin(mongoosePaginate);
categoriesSchema.plugin(autoIncre, {inc_field: 'cate_id'});
mongoose.model('Categories', categoriesSchema);