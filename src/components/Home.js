import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {

  render() {
    return (
      <div>
        <h3>Home</h3>
          <div>
            <h4>Unanswered</h4>
            <ul>
              { this.props.unansweredPolls.map((poll) => (
                <li key={poll.id}>
                { poll.id }
                </li>
              )) }
            </ul>
          </div>
          <div>
            <h4>Answered</h4>
            <ul>
              { this.props.answeredPolls.map((poll) => (
              <li key={poll.id}>
                { poll.id }
              </li>
              )) }
            </ul>          
          </div>
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
    answeredPolls,
    unansweredPolls
  }
}

export default connect(mapStateToProps)(Home);
