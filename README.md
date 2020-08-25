# Word Memorizer

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

## Demo Video
View the demo video [here](https://youtu.be/6tvoHw9wZjQ).

## Module used
### Client side
* react
* react-router
* axios
* Bootstrap

### Server side
* express
* cors
* body-parser
* morgan
* dotenv
* mongoose
* mongodb
* papaparse
* common-json

## My contribution
* Use Bootstrap as CSS template, and use react-router and react to render the client side view.
* Server side is an api made from express, with functionality to read local file.

## Work Division
**Wei-Hsu Lee** is responsible of server and making demo vedio, **Hsuan-Jui Chen** is resposible of client and a part of server.

## Thoughts
The amount of time we could spend on doing this final project was really limited, so both of us was on edge during making this project. Fortunately we were able to cooperate well enough to finish the project within the time limit.
