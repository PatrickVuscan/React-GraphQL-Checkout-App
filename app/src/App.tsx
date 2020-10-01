import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div>
                        <h1>Hello</h1>
                    </div>
                </Route>
                <Route path="/about">
                    <div>
                        <h1>Test</h1>
                    </div>
                </Route>
                <Route path="/dashboard">
                    <div>
                        <h1>Test</h1>
                    </div>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
