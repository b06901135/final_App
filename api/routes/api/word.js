const express = require('express');
const router = express.Router();

const Word = require('../../models/Word');

// @route   GET api/word
// @desc    Get all words
// @access  Public
router.get('/', (req, res) => {
    Word.find((error, data) => {
        if (error) {
            res.json({ error: error });
        } else {
            res.json({ success: 'fecth all words', data: data });
        }
    })
})

// @route   GET api/word/:filter/:sort/:startnum/:endnum
// @desc    Get all words
// @access  Public
router.get('/:filter/:sort/:startnum/:endnum', (req, res) => {
    let { filter, sort, startnum, endnum } = req.params;
    Word.find((() => {
        let query = {};
        if (filter !== 'all') {
            query.name = new RegExp(`^${filter}`, 'gi');
        }
        if (sort === 'flag') {
            query.flag = true;
        }
        return query;
    })())
        .skip(parseInt(startnum))
        .limit(parseInt(endnum - startnum))
        .sort((() => {
            if (sort === 'date') {
                return { created_date: -1 };
            } else if (sort === 'asc') {
                return { name: 1 }
            } else { return null; }
        })())
        .then(docs => {
            res.json({ success: 'fetch words', data: docs });
        })
        .catch(err => {
            console.log(err);
        });
});

// @route   POST api/word/:method
// @desc    Create new word
// @access  Public
router.post('/:method', (req, res) => {
    const { method } = req.params;
    if (method === 'list') {
        const { data } = req.body;
        let promises = [];
        console.log('data', data);
        data.forEach(ele => {
            promises.push(new Promise(resolve => {
                let newWord = new Word({
                    name: ele.name,
                    definition: ele.definition
                });
                newWord.save()
                    .then(() => {
                        resolve();
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({error: err});
                    });
            }));
        });
        Promise.all(promises).then(() => {
            res.json({success: 'words added'});
        });
    } else {
        const { name, definition } = req.body;
        let newWord = new Word({
            name: name,
            definition: definition
        });
        newWord.save()
            .then(() => {
                res.json({ success: 'word added' });
            });
    }
});

// @route   PUT api/word/:id
// @desc    Update a word
// @access  Public
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { word, definition, flag } = req.body;
    Word.findById(id)
    .then(item => {
        console.log('word', word);
        if (word !== undefined) item.word = word;
        if (definition !== undefined) item.definition = definition;
        if (flag !== undefined) item.flag = flag;
        item.save()
            .then((ele) => {
                res.json({success: `update ${id}`, data: ele});
            });
    })
    .catch(err => {
        res.json({error: err});
    });
});


module.exports = router;
