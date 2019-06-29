const mongoose = require('mongoose');
const express = require('express');
const config = require('config');

const PORT = process.env.PORT || 5000;

const app = express();

const dbRoute = config.get('mongoURI');

mongoose.connect(dbRoute, { useNewUrlParser: true })
    .then(() => {
        console.log('Mongodb connected...');
    })
    .catch(err => {
        console.log(err);
    });

app.use(express.json());

app.use('/api/word', require('./routes/api/word'));
app.use('/api/quiz', require('./routes/api/quiz'));
app.use(express.static('./client/build'));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
