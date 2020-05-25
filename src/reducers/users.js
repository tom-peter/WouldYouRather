import { RECEIVE_USERS } from '../actions/users';

// Reducer - specify _how_ the application's state changes 
// in response to actions sent to the store
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    default:
      return state;
  }
}
