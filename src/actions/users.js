import { _getUsers } from '../utils/_DATA';
// import loading bar
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_USERS = 'RECEIVE_USERS';

// Action creators
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

// handle initial user data with redux-thunk pattern, 
// because we want to make an async request
export function handleInitialUserData() {	
  return dispatch => {
		// show loading bar
		dispatch(showLoading());
		
    return _getUsers()
		.then((users) => {
		  console.log(users);
		  // take users and add them to the redux store
		  dispatch(receiveUsers(users));
			
			// hide loading bar
      dispatch(hideLoading());
		});
  };
}
