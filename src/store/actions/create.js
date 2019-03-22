import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes';
import Axios from '../../axios/axios-quiz';

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION,
  };
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await Axios.post('quizes.json', getState().create.quiz);
  };
}
