const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name']
    },
    id: {
        type: Number,
        required: [true, 'create automatically by system']
    },
    Words: {
        type: Array,
        required: [true, 'user word']
    }
})

const User = mongoose.model('vocab', UserSchema);
module.exports = User