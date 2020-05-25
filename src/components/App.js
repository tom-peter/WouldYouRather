import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Poll from './Poll';
import NewPoll from './NewPoll';
import Leaderboard from './Leaderboard';
import ErrorPage from './ErrorPage';
import '../App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/questions/:question_id" component={Poll} />
            <Route path="/add" component={NewPoll} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
