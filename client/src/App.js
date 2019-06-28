import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddNew from './pages/AddNew';
import Quiz from './pages/Quiz';

function App() {
    return (
        <HashRouter>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path='/add-new-word' render={() => <AddNew />} />
            <Route exact path='/quiz' render={() => <Quiz />} />
        </HashRouter>
    );
}

export default App;
