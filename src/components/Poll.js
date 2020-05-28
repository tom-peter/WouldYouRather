import React from 'react';
import { Link } from 'react-router-dom'

import { handleSaveAnswer } from '../actions/questions'

export const SINGLE = 'single';
export const LIST = 'list';

export class Poll extends React.Component {

  // 3 options for building up Poll DOM:
  // - type: LIST, when polls are listed from Home
  // - type: SINGE + answer: null, when single UNANSWERED poll is shown
  // - type: SINGE + answer, when single ANSWERED poll is shown
  options(type, answer) {
    const { optionOne, optionTwo } = this.props.poll;
    const canClick = (type === SINGLE && answer === null);
    const selected = (type === SINGLE && answer !== null) ? answer : false;
    
    return (
      <div className="poll-options">
        <div 
          id={ type === SINGLE ? 'optionOne' : undefined }
          onClick={ canClick ? (e) => this.selectOption(e) : undefined }
          className={ this.classNameSelector('optionOne', canClick, selected) }
        >{ optionOne.text }</div>
        <div className="poll-or">OR</div>
        <div 
          id={ type === SINGLE ? 'optionTwo' : undefined }
          onClick={ canClick ? (e) => this.selectOption(e) : undefined }
          className={ this.classNameSelector('optionTwo', canClick, selected) }
        >{ optionTwo.text }</div>        
      </div>      
    )
  }

  classNameSelector(option, canClick, selected) {
    if ( selected === option) return 'poll-option selected';
    if ( canClick ) return 'poll-option pointer';
    return 'poll-option';
  }

  selectOption(e) {
    this.props.dispatch(handleSaveAnswer(this.props.authedUser, this.props.poll.id, e.target.id));
  }

  // Results for SINGE, ANSWERED polls
  results() {
    const votesOne = this.props.poll.optionOne.votes.length;
    const votesTwo = this.props.poll.optionTwo.votes.length;
    const totalVotes = votesOne + votesTwo;
    const percOne = Math.round(votesOne / totalVotes * 10000) / 100;
    const percTwo = Math.round(votesTwo / totalVotes * 10000) / 100;
    
    return (
      <div className="poll-options">
        <div className="poll-result">{`${votesOne} of ${totalVotes} people (${percOne}%) voted for this option.`}</div>
        <div></div>
        <div className="poll-result">{`${votesTwo} of ${totalVotes} people (${percTwo}%) voted for this option.`}</div>
      </div>      
    )
  }

  // Poll button for listed polls
  pollButton(id) {
    return (
      <Link to={`/questions/${id}`}>
        <button className="btn poll-btn">{this.props.answer === null ? 'Answer Poll' : 'View Poll'}</button>
      </Link>
    )
  }

  render() {
    console.log('Poll: ', this.props);
    const { id } = this.props.poll;
    const { type, answer } = this.props;

    return (
      <div className="poll">
        <div className="poll-header">
          <img className="poll-avatar" src={ this.props.avatar } alt={ this.props.name } />
          <div><strong>{ this.props.name }</strong> asks:</div>
        </div> 
        <div className="poll-body">
          <div>Would you rather ...</div>
          { this.options(type, answer) }
          { type === LIST && this.pollButton(id) }
          { type === SINGLE && answer && this.results() }
        </div>
      </div>        
    );
  }
}

export default Poll;
