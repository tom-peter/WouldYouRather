import React from 'react';
import { connect } from 'react-redux';

import { Poll, SINGLE } from './Poll';
import ErrorPage from './ErrorPage'

class SinglePoll extends React.Component {

  render() {
  
    console.log('Single / render / props: ', this.props)
    const { authedUser, poll, name, avatar, answer } = this.props;

    if (!this.props.questionsLoaded) return null;
    if (this.props.noMatch) return <ErrorPage />;

    return (
      <div>
        <h3>SinglePoll</h3>
        <Poll 
          poll={poll} 
          name={name} 
          avatar={avatar} 
          answer={answer}
          type={SINGLE} 
          authedUser={authedUser}
          dispatch={this.props.dispatch}
        />                 
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const id = props.match.params.question_id;
  const poll = questions[id];
  const questionsLoaded = Object.keys(questions).length;
  let name, avatar, answer, noMatch;

  if ( questionsLoaded ) {
    if (poll === undefined) return { questionsLoaded, noMatch: true };
    name = users[poll.author].name;
    avatar = users[poll.author].avatarURL;
    answer = users[authedUser].answers[id] || null;
  } 
  return { authedUser, id, poll, name, avatar, answer, questionsLoaded, noMatch: false };
}

export default connect(mapStateToProps)(SinglePoll);
