import React from 'react';
import { connect } from 'react-redux';

import Poll from './Poll';

class Home extends React.Component {
  state = {
    showUnanswered: true
  }

  changeList(e, showUnanswered) {
    e.target.id === 'unanswered' && showUnanswered === false &&
      this.setState({ showUnanswered: true });
    e.target.id === 'answered' && showUnanswered === true &&
      this.setState({ showUnanswered: false });
  }

  getAnswer(poll, answered) {
    return (answered ? this.props.users[this.props.authedUser].answers[poll.id] : null );
  }

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
            />
          </li>
        )) }
      </ul>
    )
  }

  render() {
    return (
      <div>
        <h3>Home</h3>
        <div id='unanswered' onClick={ (e) => this.changeList(e, this.state.showUnanswered) }>
          Unanswered
        </div>
        <div id='answered' onClick={ (e) => this.changeList(e, this.state.showUnanswered) }>
          Answered
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
