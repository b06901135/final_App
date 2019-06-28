import { model, models } from "mongoose";

const mongoose = reuqire('mongoose');
const Schema = mongoose.Schema;


const WordSchema = new Shema({
    name: {
        type: String,
        require: true
    },
    definition: {
        type: String,
        require: true
    },
    created_date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('word', WordSchema);
