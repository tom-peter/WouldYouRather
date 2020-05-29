import React from 'react';
import { connect } from 'react-redux'

class Leaderboard extends React.Component {

  render() {
    const leaderboard = this.props.leaderboard;

    return (
      <div className="main">
        <h1>Would you rather ...</h1>
        <h2>Leaderboard</h2>
        <ul>
          { leaderboard.map((result) => (
            <li key={result.id}>
              <div className="lb">
                <div className="lb-header">
                  <div>#{ result.rank }</div>
                  <img className="lb-avatar" src={ result.avatar } alt={ result.name } />
                  <div className="lb-name"><strong>{ result.name }</strong></div>
                  <div></div>
                  <div className="lb-points">Points: </div>
                  <div>{ result.total }</div>
                </div> 
                <div className="lb-body">
                  <div className="lb-results">Questions answered: { result.qAnswered }</div>
                  <div className="lb-results">Questions asked: { result.qAsked }</div>
                </div>
              </div>    
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  // Create and sort results from users state
  const leaderboard = 
    Object.values(users)
      .map(user => ({
        id: user.id,
        avatar: user.avatarURL,
        name: user.name,
        qAnswered: Object.values(user.answers).length,
        qAsked: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length
      }))
      .sort((a, b) => b.total - a.total);

  // Add ranking to results
  let rank = 1;
  for (let i=0; i < leaderboard.length; i++) {
    (i > 0) && (leaderboard[i].total < leaderboard[i-1].total) && ( rank = i+1 );
    leaderboard[i].rank = rank;
  }

  return { leaderboard };
}

export default connect(mapStateToProps)(Leaderboard)
