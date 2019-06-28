const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabSchema = new Schema({
    word: {
        type: String,
        required: [true, 'Only word is filled can you create schema in database.']
    },
    definition: {
        type: String,
        required: [true, 'A word need an discription for test.']
    },
    flag: {
        type: Boolean,
        required: [true, 'User has seen or not']
    }
})

const Vocab = mongoose.model('vocab', VocabSchema);
module.exports = Vocab