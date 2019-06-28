import 'dotenv/config'

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
var cors = require('cors')

const PORT = process.env.PORT

const app = express()

const csv = require('csv-parser')
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

db.on('error', error => {
    console.log(error)
})
db.once('open', () => console.log('connected to the database'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

mongoose.set('useFindAndModify', false)

if (process.env.INIT === 'True') {
    const obj = []
    const processed_csv = 'src/localdb/word.csv'
    fs.createReadStream(processed_csv).pipe(csv())
        .on('data', (data) => obj.push(data))
        .on('end', () => {
            console.log('read file sucess')
            obj.map(data => {
                let word = new Vocab()
                word.word = data['word']
                word.definition = data['definition']
                word.flag = false
                word.save(err => {
                    if (err) {
                        console.log(err)
                    }
                })
            })
            console.log('init succ') 
        })
}

app.get('/api/words', (req, res) => {
    Vocab.find((err, data) => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true, data: data })
    })
})

app.get('/api/words/:wordnum', (req, res) => {
    Vocab.find({flag: false} ,(err, data) => {
        if (err) return res.json({ success: false, error: err })
        else {
            shuffle(data)
            let top_n = data.slice(0, parseInt(req.params.wordnum))
            return res.json({ success: true, data: top_n })
        }
    })
})

app.get('/api/quiz/:wordnum', (req, res) => {
    Vocab.find((err, data) => {
        if (err) return res.json({ success: false, error: err })
        else {
            shuffle(data)
            let wn = parseInt(req.params.wordnum)
            let top_n = data.slice(0, parseInt(req.params.wordnum))
            return res.json({ success: true, data: top_n })
        }
    })
})

app.post('/api/update', (req, res) => {
    const { word, definition, flag } = req.body
    Vocab.findOneAndUpdate({ word: word }, {flag: flag}, err => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true })
    })
})

app.post('/api/add', (req, res) => {
    let voc = new Vocab()
    const { word, definition} = req.body
    if ((!id && id !== 0)) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS'
        })
    }
    voc.word = word
    voc.definition = definition
    voc.flag = false
    voc.save(err => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true })
    })
})

app.post('/api/delete', (req, res) => {
    const { word } = req.body
    Vocab.findOneAndDelete({word: word}, (err => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true })
    }))
})

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`))
