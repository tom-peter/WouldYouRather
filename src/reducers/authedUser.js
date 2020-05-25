import { SET_AUTHED_USER } from '../actions/authedUser';

export default function authedUser(state = null, action) {
  return (action.type === SET_AUTHED_USER) ? action.id : state;
}
