import { all } from 'redux-saga/effects';
import {
  quizSaga,
  fetchByIdSaga,
  onAnswerClick,
  timeUpWatcher,
} from './quizSagas';
import authSaga from './authSagas';

export default function* rootSaga() {
  yield all([
    quizSaga(),
    authSaga(),
    fetchByIdSaga(),
    onAnswerClick(),
    timeUpWatcher(),
  ]);
}
