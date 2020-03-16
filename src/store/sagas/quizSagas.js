import {
  call,
  put,
  takeLatest,
  takeEvery,
  select,
  delay,
} from 'redux-saga/effects';
import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  FETCH_LIST,
  FETCH_BY_ID,
  ON_ANSWER_CLICK,
} from '../actions/actionTypes';

function* fetchQiuzes() {
  try {
    yield put({ type: FETCH_QUIZES_START });
    const response = yield call(axios.get, 'quizes.json');
    const quizes = [];
    Object.keys(response.data).forEach((key, index) => {
      quizes.push({
        id: key,
        name: `Quiz №${index + 1}`,
      });
    });
    yield put(fetchQuizesSuccess(quizes));
  } catch (e) {
    yield put(fetchQuizesError(e));
  }
}

function* fetchQuizById(action) {
  try {
    yield put({ type: FETCH_QUIZES_START });
    const response = yield call(axios.get, `quizes/${action.payload}.json`);
    const quiz = response.data;

    yield put(fetchQuizSuccess(quiz));
  } catch (e) {
    yield put(fetchQuizesError(e));
  }
}

function* timeUp(action) {
  const { quiz } = yield select();
  const question = quiz.quiz[quiz.activeQuestion];
  const results = quiz.results;

  results[question.id] = 'error';
  yield put(quizSetState({ [action.payload]: 'error' }, results));

  if (isQuizFinished(quiz)) {
    yield put(finishQuiz());
  } else {
    yield put(quizNextQuestion(quiz.activeQuestion + 1));
  }
}

function* quizAnswerClick({ payload: answerId }) {
  const { quiz } = yield select();

  if (quiz.answerState) {
    const key = Object.keys(quiz.answerState)[0];
    if (quiz.answerState[key] === 'success') {
      return;
    }
  }
  const question = quiz.quiz[quiz.activeQuestion];
  const results = quiz.results;

  if (question.rightAnswerId === answerId) {
    if (!results[question.id]) {
      results[question.id] = 'success';
    }
    yield put(quizSetState({ [answerId]: 'success' }, results));
    yield delay(1000);

    isQuizFinished(quiz)
      ? yield put(finishQuiz())
      : yield put(quizNextQuestion(quiz.activeQuestion + 1));
  } else {
    results[question.id] = 'error';
    yield put(quizSetState({ [answerId]: 'error' }, results));
  }
}

function* fetchByIdSaga() {
  yield takeEvery(FETCH_BY_ID, fetchQuizById);
}

function* quizSaga() {
  yield takeLatest(FETCH_LIST, fetchQiuzes);
}

function* onAnswerClick() {
  yield takeEvery(ON_ANSWER_CLICK, quizAnswerClick);
}

function* timeUpWatcher() {
  yield takeEvery('TIME_UP', timeUp);
}

export { quizSaga, fetchByIdSaga, onAnswerClick, timeUpWatcher };

function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e,
  };
}

function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  };
}

const isQuizFinished = state => state.activeQuestion + 1 === state.quiz.length;

export const retryQuiz = () => ({
  type: QUIZ_RETRY,
});

export const fetchList = () => ({
  type: FETCH_LIST,
});

export const fetchById = quizId => ({
  type: FETCH_BY_ID,
  payload: quizId,
});

export const onAnswerClickAction = answerId => ({
  type: ON_ANSWER_CLICK,
  payload: answerId,
});
