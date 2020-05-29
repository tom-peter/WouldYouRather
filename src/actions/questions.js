import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA';
// import loading bar
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const SAVE_QUESTION = 'SAVE_QUESTION';

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

export function saveQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question
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
            // take questions and add them to the redux store
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
            // take the answer and add it to the redux store
            dispatch(saveAnswer(authedUser, qid, answer));
            
            // hide loading bar
            dispatch(hideLoading());
          });
  };
}

// handle _saveQuestion async request
export function handleSaveQuestion(author, optionOneText, optionTwoText) {
  return dispatch => {
		// show loading bar
		dispatch(showLoading());

    return _saveQuestion({ author, optionOneText, optionTwoText })
          .then((question) => {
              console.log('Question saved');          
              // take the new question and add it to the redux store
              dispatch(saveQuestion(question));
              
              // hide loading bar
              dispatch(hideLoading());
            }
          );
  };
}
