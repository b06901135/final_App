const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const db = config.get('mongoURI');

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(() => {
        console.log('MongoDB Connected...');
    })
    .catch(err => console.log(err));

app.listen(5000, () => console.log(`Dev server start on port 5000 ...`))
