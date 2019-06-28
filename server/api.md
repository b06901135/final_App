# API
+ /api/words
  get all words
+ /api/words/:wordnum
  get number of word e.g. api/words/100
+ /api/quiz/:wordnum
  get number of word for quiz e.g. api/quiz/100
+ /api/update
  use for update one word at one time, in form {'word': your_word, 'defiition', your_definition, 'flag': your_flag}
+ /api/add
  use for add one word at one time, in form {'word': your_word, 'defiition', your_definition}
+ /api/delete
  delete one word at one time, in form {'word': your_word}
