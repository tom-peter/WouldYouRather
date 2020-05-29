import React from 'react';
import { connect } from 'react-redux';

import { setAuthedUser } from '../actions/authedUser'
import { handleInitialUserData } from '../actions/users'
import { handleInitialQuestionData } from '../actions/questions'

class Login extends React.Component {
  state = {
    value: null
  }

  handleChange = e => {
    let value = e.target.value;
    if (value === '0') value = null;
    this.setState({ value });
  }

  handleSubmit = e => {
    e.preventDefault();
    // let id = 'robinson';
    let id = this.state.value;
    this.props.dispatch(setAuthedUser(id))
    // Get initial question data
    this.props.dispatch(handleInitialQuestionData());
  }
  
  componentDidMount() {
	  // Get initial user data
    this.props.dispatch(handleInitialUserData());
  }

  // Select user form
  selectUser() {
    const users = this.props.users;
    const IDs = Object.keys(users);

    return (
      <form onSubmit={this.handleSubmit}>
        <div>Please select your username, and log in.</div>
        <div className="login-select">
          <select onChange={ this.handleChange }>
            <option value="0" key="0"> - - Please select your username - - </option>
            { IDs.map((id) =>(
              <option value={ id } key={ id }>
                { users[id].name }
              </option>
            )) }
          </select>
        </div>
        <button onClick={this.handleSubmit} className="btn" type="button" disabled={ this.state.value === null }>
          Login
        </button>
      </form>
    )
  }
  
  render() {

    const IDs = Object.keys(this.props.users); 

    return (      
      <div className="main">
        <h1>Would you rather ...</h1>
        <div className="login">
          <h2>Login</h2>
          { IDs.length !== 0 && this.selectUser() }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ( state === null ) ? {} : state;
}

export default connect(mapStateToProps)(Login);
