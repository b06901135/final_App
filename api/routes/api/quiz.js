const express = require('express');
const router = express.Router();

const Word = require('../../models/Word');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

router.get('/:num', (req, res) => {
    Word.find()
        .then(words => {
            shuffle(words);
            return res.json({
                success: 'get random words',
                data: words.slice(0, parseInt(req.params.num))
            })
        })
});

module.exports = router;
