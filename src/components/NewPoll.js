import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { handleSaveQuestion } from '../actions/questions';

class NewPoll extends React.Component {
  state = {
    goHome: false,
    optionOne: '',
    optionTwo: ''
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  disableClick() {
    return (this.state.optionOne === '' || this.state.optionTwo === '') ? true : false;
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.optionOne, this.state.optionTwo) 
    this.props.handleSaveQuestion(this.props.authedUser, this.state.optionOne, this.state.optionTwo);

    this.setState({ 
      optionOne: '', 
      optionTwo: '', 
      goHome: true 
    })
  }

  render() {
    const { optionOne, optionTwo } = this.state;
    // Redirect to Home after submitting the new poll
    if (this.state.goHome === true) { return <Redirect to='/' /> };

    return (
      <div className="main">
        <h1>Would you rather ...</h1>
        <div className="new-poll">
          <h2>Create a new poll</h2>

          <form onSubmit={this.handleSubmit}>
            <div>Please give two options, then click the button to create a new poll.</div>
            <p><strong>Would you rather...</strong></p>
            <div className="new-poll-options">
              <input
                id="optionOne"
                type="text"
                value={optionOne}
                placeholder="Option one"
                onChange={this.handleChange}
                size="40"
                required
              />
              <div>OR</div>
              <input
                id="optionTwo"
                type="text"
                value={optionTwo}
                placeholder="Option two"
                onChange={this.handleChange}
                size="40"
                required
              />
            </div>
            <button onClick={this.handleSubmit} className="btn" type="button" disabled={this.disableClick()}>
              Create poll
            </button>
          </form>
          
        </div>
        <div className="back">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps, { handleSaveQuestion })(NewPoll);
