import React from 'react';
import { connect } from 'react-redux';

import { setAuthedUser } from '../actions/authedUser'
import { handleInitialUserData } from '../actions/users'
import { handleInitialQuestionData } from '../actions/questions'

class Login extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    let id = 'robinson';
    this.props.dispatch(setAuthedUser(id))
    // Get initial question data
    this.props.dispatch(handleInitialQuestionData());
  };
  
  componentDidMount() {
	  // Get initial user data
    this.props.dispatch(handleInitialUserData());
  }

  render() {

    console.log('Login render props', this.props)

    return (      
      <div>
        <h3>Login</h3>
        <button onClick={this.handleSubmit} className="btn" type="button">
          Login
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ( state === null ) ? {} : state;
}

export default connect(mapStateToProps)(Login);
