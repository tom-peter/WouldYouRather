import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import authedUser from './authedUser';
import users from './users';
import questions from './questions';

// Combine users, questions and authedUser and loadingBar reducer into 
// one root reducer, since the `createStore` function only accepts a single reducer
export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer
});
