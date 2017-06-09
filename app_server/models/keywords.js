var mongoose = require('mongoose'), Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var autoIncre = require('mongoose-sequence');

var keywordsSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    updateAt: Date,
    createAt: {
        type: Date,
        default: Date.now()
    },
});

keywordsSchema.plugin(mongoosePaginate);
keywordsSchema.plugin(autoIncre, {inc_field: 'key_id'});

mongoose.model('Keywords', keywordsSchema);/**
 * Created by yayayay on 08/06/2017.
 */
