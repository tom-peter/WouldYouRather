import { _getQuestions, _saveQuestionAnswer } from '../utils/_DATA';
// import loading bar
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';

// Action creators
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function saveAnswer(authedUser, qid, answer) {
  return {
    type: SAVE_ANSWER,
    authedUser, 
    qid, 
    answer
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

// handle _saveQuestionAnswer async request
export function handleSaveAnswer(authedUser, qid, answer) {	
  return dispatch => {
		// show loading bar
		dispatch(showLoading());
		
    return _saveQuestionAnswer({ authedUser, qid, answer })
		.then(() => {
		  console.log('Answer saved');
		  // take users and add them to the redux store
		  dispatch(saveAnswer(authedUser, qid, answer));
			
			// hide loading bar
      dispatch(hideLoading());
		});
  };
}
