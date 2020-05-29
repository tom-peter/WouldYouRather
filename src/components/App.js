import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import Login from './Login';
import Nav from './Nav';
import Home from './Home';
import SinglePoll from './SinglePoll';
import NewPoll from './NewPoll';
import Leaderboard from './Leaderboard';
import ErrorPage from './ErrorPage';
import Footer from './Footer';
import '../App.css';

import { setAuthedUser } from '../actions/authedUser'

class App extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setAuthedUser(null));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <LoadingBar />
          {this.props.authedUser === null ? (
            <Login />
          ) : (
            <Fragment>              
              <Route component={Nav} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/questions/:question_id" component={SinglePoll} />
                <Route path="/add" component={NewPoll} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route component={ErrorPage} />
              </Switch>
              <Route component={Footer} />
            </Fragment>
          )}  
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return ( state === null ) ? {} : state;
}

export default connect(mapStateToProps)(App);
