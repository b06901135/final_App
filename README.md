# WordApp

## How to use
1. Open the website, and add your words
2. Choose custom category, default to 'all'
3. Choose custom sort method, default to 'date'
4. Flag and unflag words for easy access
5. Set sort method to flag to see only flagged words
6. Delete words that you no longer need

## How to build

1. Clone the repository
2. Install dependencies and run server
```bash
cd ./api

# Install dependencies for server
npm install

# Run server
npm start

# Build react app for client
# open another console
cd ./client
npm install

# Build
npm run build

# Run client
npm start
```
3. Server starts at `http://localhost:5000`
4. Client starts at `http://licalhost:3000`

## 簡介影片
https://youtu.be/6tvoHw9wZjQ
https://www.dropbox.com/h?preview=React+App+-+Google+Chrome+2019-06-30+19-16-27.mp4
因為youtube上傳慢，所以新增dropbox連結

## Module used

### client
react
react-router
axios
Bootstrap

### server
express
cors
body-parser
morgan
dotenv
mongoose
mongodb
papaparse
common-json

## My contribution
client有使用到Bootstrap提供CSS的樣式，其餘的部分就是react-router和react用來render畫面。
server完全手刻，基本上使用上課有教到的套件再加上一些讀取local檔案的parser而已，並沒有特別的地方。

### 分工
李威緒負責server和製作影片，陳宣叡負責client和一部分的server

## 心得
這次的final project做的很趕，在繳交的當下，影片還來不及上傳完畢。這次一起寫final寫得很緊張，因為我們分frontend和backend寫，所以在進行測試的時候發現有bug要對方修，還要等到對方回訊息，非常的沒有效率，還好最後還是作出了一點東西。