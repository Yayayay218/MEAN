var mongoose = require('mongoose'), Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var autoIncre = require('mongoose-sequence');

var notificationsSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    hour: Number,
    minute: Number,
    updateAt: Date,
    createAt: {
        type: Date,
        default: Date.now()
    },
});

notificationsSchema.plugin(mongoosePaginate);
notificationsSchema.plugin(autoIncre, {inc_field: 'notification_id'});
mongoose.model('Notifications', notificationsSchema);