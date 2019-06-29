const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    flag: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('word', WordSchema);