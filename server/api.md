# API
+ /api/words
  get all words
  return Array(word)
+ api/words/:wordnum/page/:pagenum
  get number of words, select the page number
  return Array(word)
+ /api/words/:wordnum
  get number of word e.g. api/words/100, Deprecated
+ /api/quiz/:wordnum
  get number of word for quiz e.g. api/quiz/100
  return Array(word), word['id'] is _id assigned by mongoose db
+ /api/update
  use for update one word at one time, input type {'word': your_word, 'defiition', your_definition, 'flag': your_flag}
  return {succes: true/false}
+ /api/add
  use for add list of word at one time, input type {'data': list of {word: your_word, definition: your_definition}}
  return {succes: true/false}
+ /api/delete
  delete one word at one time, in form {'word': your_word}
  return {succes: true/false}
+ /api/words/:char/:wordnum
  select words head with numbers of word head with char e.g. api/words/a/10
  return Array(word)