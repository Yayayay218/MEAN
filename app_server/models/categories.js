var mongoose = require('mongoose'), Schema = mongoose.Schema;
var categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastUpdate: Date
});

mongoose.model('Categories', categoriesSchema);