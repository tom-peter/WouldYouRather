import React from 'react';
import { connect } from 'react-redux';

import Poll from './Poll';

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
                  <Poll 
                    poll={poll} 
                    name={this.props.users[poll.author].name} 
                    avatar={this.props.users[poll.author].avatarURL} 
                    type='unanswered' 
                  />
                </li>
              )) }
            </ul>
          </div>
          <div>
            <h4>Answered</h4>
            <ul>
              { this.props.answeredPolls.map((poll) => (
              <li key={poll.id}>
                <Poll 
                  poll={poll} 
                  name={this.props.users[poll.author].name} 
                  avatar={this.props.users[poll.author].avatarURL} 
                  type='answered' 
                />
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
    unansweredPolls,
    users
  }
}

export default connect(mapStateToProps)(Home);
