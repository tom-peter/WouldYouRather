import { RECEIVE_USERS } from '../actions/users';
import { SAVE_ANSWER, SAVE_QUESTION } from '../actions/questions'

// Reducer - specify _how_ the application's state changes 
// in response to actions sent to the store
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case SAVE_ANSWER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };
    case SAVE_QUESTION:
      const { id, author } = action.question;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id])
        }
      };
    default:
      return state;
  }
}
