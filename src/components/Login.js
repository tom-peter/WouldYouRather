import React from 'react';
import { connect } from 'react-redux';

import { setAuthedUser } from '../actions/authedUser'

class Login extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
	  this.props.dispatch(setAuthedUser({ authedUser: '12345'}))
  };
  
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
  console.log('mapState', state);
  return ( state === null ) ? { authedUser: null } : state;
}

export default connect(mapStateToProps)(Login);
