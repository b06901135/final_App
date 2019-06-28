import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddNew from './pages/AddNew';

function App() {
    return (
        <HashRouter>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path='/add-new-word' render={() => <AddNew />}/>
        </HashRouter>
    );
}

export default App;
