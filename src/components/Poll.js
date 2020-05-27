import React from 'react';
import { Link } from 'react-router-dom'

class Poll extends React.Component {

  render() {
    console.log('Poll: ', this.props);
    const { id, optionOne, optionTwo } = this.props.poll;

    return (
      <div>
        <h3>Poll</h3>
        <img src={ this.props.avatar } alt={ this.props.name } />
        <div>{ this.props.name }</div>
        <div>{ optionOne.text }</div>
        <div>{ optionTwo.text }</div>
        <Link to={`/question/${id}`}>
          <button>{this.props.type === 'answered' ? 'View Poll' : 'Answer Poll'}</button>
        </Link>
      </div>        
    );
  }
}

export default Poll;
