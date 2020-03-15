import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
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
} from '../actions/actionTypes';

export function* fetchQiuzes() {
  try {
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

export function* fetchQuizById(action) {
  put(FETCH_QUIZES_START);
  try {
    const response = yield call(axios.get, `quizes/${action.payload}.json`);
    const quiz = response.data;

    yield put(fetchQuizSuccess(quiz));
  } catch (e) {
    yield put(fetchQuizesError(e));
  }
}

function* fetchByIdSaga() {
  yield takeEvery('FETCH_BY_ID', fetchQuizById);
}

function* quizSaga() {
  yield takeLatest(FETCH_QUIZES_START, fetchQiuzes);
}

function* onAnswerClick() {
  yield takeEvery('ANSWER_CLICK', quizAnswerClick);
}

function* timeUpWatcher() {
  yield takeEvery('TIME_UP', timeUp);
}

function* retry() {
  yield takeEvery(QUIZ_RETRY, retryQuiz);
}

export { quizSaga, fetchByIdSaga, onAnswerClick, retry, timeUpWatcher };

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  };
}

function* timeUp(answerId) {
  const state = select().quiz;
  const question = state.quiz[state.activeQuestion];
  const results = state.results;

  results[question.id] = 'error';
  yield call(quizSetState, [{ [answerId]: 'error' }, results]);

  if (isQuizFinished(state)) {
    yield put(finishQuiz());
  } else {
    yield call(quizNextQuestion, state.activeQuestion + 1);
  }
}

function* quizAnswerClick(answerId) {
  const state = select().quiz;
  if (state.answerState) {
    const key = Object.keys(state.answerState)[0];
    if (state.answerState[key] === 'success') {
      return;
    }
  }
  const question = state.quiz[state.activeQuestion];
  const results = state.results;

  if (question.rightAnswerId === answerId) {
    if (!results[question.id]) {
      results[question.id] = 'success';
    }
    yield call(quizSetState, [{ [answerId]: 'success' }, results]);

    const timeout = window.setTimeout(function*() {
      if (isQuizFinished(state)) {
        yield put(finishQuiz());
      } else {
        yield call(quizNextQuestion, state.activeQuestion + 1);
      }
      window.clearTimeout(timeout);
    }, 1000);
  } else {
    results[question.id] = 'error';
    yield call(quizSetState, [{ [answerId]: 'error' }, results]);
  }
}

const isQuizFinished = state => state.activeQuestion + 1 === state.quiz.length;

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  };
}
