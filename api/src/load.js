const fs = require('fs');
const axios = require('axios');

let words = JSON.parse(fs.readFileSync('./words.json'));

for (key in words) {
    axios.post('http://localhost:5000/api/words', {
        name: key,
        definition: words[key]
    })
        .then(res => {
            if (res.data.success) {
                console.log('success');
            } else {
                console.log('error');
            }
        })
        .catch(err => {
            console.log('error');
        });
}
