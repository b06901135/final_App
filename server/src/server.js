import 'dotenv/config'

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
var cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()

import Papa from 'papaparse'
const fs = require('fs')
import shuffle from './util'
import Vocab from './models/vocab'

app.use(cors())


const dbRoute = `mongodb+srv://a015kh:a015khSTM05@cluster0-bckan.mongodb.net/test?retryWrites=true`
// const dbRoute = `localhost:8000`

mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
)

let db = mongoose.connection
// db.dropDatabase()

let cache = {data: [], slot_size: 0}

db.on('error', error => {
    console.log(error)
})
db.once('open', () => console.log('connected to the database'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

mongoose.set('useFindAndModify', false)

if (process.env.INIT === 'True') {

    const processed_csv = 'src/localdb/word.csv'
    let data = Papa.parse(fs.readFileSync(processed_csv).toString())
    console.log('Read data success')
    data.data.map(voc => {
        let word = new Vocab()
        word.word = voc[0]
        word.definition = voc[1]
        word.flag = false
        word.save(err => {
            if (err) {
                console.log(err)
            }
        })
    })
    console.log('DB init success')
}

app.get('/api/words', (req, res) => {
    Vocab.find((err, data) => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true, data: data })
    })
})

app.get('/api/words/:wordnum/page/:pagenum', (req, res) => {
    if(cache.data.length > 0 && parseInt(req.params.wordnum) === cache.slot_size) {
        let page = parseInt(req.params.pagenum)
        let top_n = cache.data.slice((page - 1) * cache.slot_size, page * cache.slot_size)
            return res.json({ success: true, data: top_n })
    }
    else {
        Vocab.find({ flag: false }, (err, data) => {
            if (err) return res.json({ success: false, error: err })
            else {
                shuffle(data)
                cache.data = data
                cache.slot_size = parseInt(req.params.wordnum)
                let top_n = data.slice(0, parseInt(req.params.wordnum))
                return res.json({ success: true, data: top_n })
            }
        })
    }
})

app.get('/api/words/:char/:wordnum', (req, res) => {
    Vocab.find({flag: false}, (err, data) => {
        if (err) return res.json({ success: false, error: err })
        else {
            let selected = []
            shuffle(data)
            selected = data.filter(voc => {
                return voc.word[0] == req.params.char
            })
            let top_n = selected.slice(0, parseInt(req.params.wordnum))
            return res.json({ success: true, data: top_n })
        }
    })
})

app.get('/api/quiz/:wordnum', (req, res) => {
    Vocab.find((err, data) => {
        if (err) return res.json({ success: false, error: err })
        else {
            shuffle(data)
            let top_n = data.slice(0, parseInt(req.params.wordnum))
            return res.json({ success: true, data: top_n })
        }
    })
})

app.post('/api/update', (req, res) => {
    const { word, definition, flag } = req.body
    Vocab.findOneAndUpdate({ word: word }, { definition: definition, flag: flag }, err => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true })
    })
})

app.post('/api/add', (req, res) => {
    let voc = new Vocab()
    const { data } = req.body
    data.map((voc) => {
        voc.word = word
        voc.definition = definition
        voc.flag = false
        voc.save(err => {
            if (err) return res.json({ success: false, error: err })
            return res.json({ success: true })
        })
    })
})

app.post('/api/delete', (req, res) => {
    const { word } = req.body
    Vocab.findOneAndDelete({ word: word }, (err => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true })
    }))
})

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`))
