import json
import pandas as pd

vocab = dict()
voc = []
with open('localdb/vocab_data.csv', encoding='utf-8-sig') as fin:
    for row in fin:
        data = row.rstrip('\n').split(',')
        vocab[data[0]] = ','.join(data[1:])
        voc.append([data[0], ','.join(data[1:])])


json.dump(vocab, open('localdb/vocab.json', 'w'))
df = pd.DataFrame(voc, columns=['word', 'definition'])
df.to_csv('localdb/test.csv', index_label='id')