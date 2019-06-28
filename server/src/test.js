import Papa from 'papaparse'

const fs = require('fs')

const processed_csv = 'src/localdb/vocab_data.csv'
let data = Papa.parse(fs.readFileSync(processed_csv).toString())
console.log(data[0])

