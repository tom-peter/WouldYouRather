import React from 'react';
import { connect } from 'react-redux';

import { Poll, LIST } from './Poll';

class Home extends React.Component {
  state = {
    showUnanswered: true
  }

  // Change between poll lists (unanswered or answered)  
  changeList(e, showUnanswered) {
    e.target.id === 'unanswered' && showUnanswered === false &&
      this.setState({ showUnanswered: true });
    e.target.id === 'answered' && showUnanswered === true &&
      this.setState({ showUnanswered: false });
  }

  // Set the active class on poll lists (unanswered or answered)  
  setPollListClassName(list) {
     if (((this.state.showUnanswered === true) && (list === 'unanswered')) ||
        ((this.state.showUnanswered === false) && (list === 'answered'))) {
          return 'poll-list-active'
        } else {
          return 'poll-list'
        }
  }

  // List the selected poll list (unanswered or answered)  
  listSelectedPolls(selectedPolls, answered) {
    return (
      <ul>
        { selectedPolls.map((poll) => (
          <li key={poll.id}>
            <Poll 
              poll={poll} 
              name={this.props.users[poll.author].name} 
              avatar={this.props.users[poll.author].avatarURL} 
              answer={this.getAnswer(poll, answered)}
              type={LIST}
            />
          </li>
        )) }
      </ul>
    )
  }

  getAnswer(poll, answered) {
    return (answered ? this.props.users[this.props.authedUser].answers[poll.id] : null );
  }

  render() {
    return (
      <div className="main">
        <h1>Would you rather ...</h1>
        <div className="poll-list-options">
          <div id="unanswered" className={this.setPollListClassName('unanswered')} onClick={ (e) => this.changeList(e, this.state.showUnanswered) }>
            Unanswered questions
          </div>
          <div id='answered' className={this.setPollListClassName('answered')} onClick={ (e) => this.changeList(e, this.state.showUnanswered) }>
            Answered questions
          </div>
        </div>
        { this.state.showUnanswered ? 
          this.listSelectedPolls(this.props.unansweredPolls, false) :
          this.listSelectedPolls(this.props.answeredPolls, true)
        }
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  // Filter and sort answered and unanswered polls
  const answered = Object.keys(users[authedUser].answers);
  const answeredPolls = Object.values(questions)
    .filter(poll => answered.includes(poll.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unansweredPolls = Object.values(questions)
    .filter(poll => !answered.includes(poll.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    authedUser,
    answeredPolls,
    unansweredPolls,
    users
  }
}

export default connect(mapStateToProps)(Home);
