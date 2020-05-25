import { RECEIVE_QUESTIONS } from '../actions/questions'

// Reducer - specify _how_ the application's state changes 
// in response to actions sent to the store
export default function questions(state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    default:
      return state
  }
}
