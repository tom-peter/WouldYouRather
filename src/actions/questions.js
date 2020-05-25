import { _getQuestions } from '../utils/_DATA';
// import loading bar
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

// Action creators
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

// handle initial question data with redux-thunk pattern, 
// because we want to make an async request
export function handleInitialQuestionData() {	
  return dispatch => {
		// show loading bar
		dispatch(showLoading());
		
    return _getQuestions()
		.then((questions) => {
		  console.log(questions);
		  // take users and add them to the redux store
		  dispatch(receiveQuestions(questions));
			
			// hide loading bar
      dispatch(hideLoading());
		});
  };
}
