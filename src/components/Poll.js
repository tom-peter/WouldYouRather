import React from 'react';
import { Link } from 'react-router-dom'

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
      <div>
        <div 
          id={ type === SINGLE ? 'optionOne' : undefined }
          onClick={ canClick ? (e) => this.selectOption(e) : undefined }
          className={ selected === 'optionOne' ? 'option selected' : 'option' }
        >{ optionOne.text }</div>
        <div>OR</div>
        <div 
          id={ type === SINGLE ? 'optionTwo' : undefined }
          onClick={ canClick ? (e) => this.selectOption(e) : undefined }
          className={ selected === 'optionTwo' ? 'option selected' : 'option' }
        >{ optionTwo.text }</div>        
      </div>
    )
  }

  selectOption(e) {
    // TODO: 
    console.log('Target: ', e.target);
  }

  pollButton(id) {
    return (
      <Link to={`/questions/${id}`}>
        <button>{this.props.answer === null ? 'Answer Poll' : 'View Poll'}</button>
      </Link>
    )
  }

  render() {
    console.log('Poll: ', this.props);
    const { id } = this.props.poll;
    const { type, answer } = this.props;

    return (
      <div>
        <h3>Poll</h3>
        <img src={ this.props.avatar } alt={ this.props.name } />
        <div>{ this.props.name }</div>
        { this.options(type, answer) }
        { type === LIST && this.pollButton(id) }
      </div>        
    );
  }
}

export default Poll;
