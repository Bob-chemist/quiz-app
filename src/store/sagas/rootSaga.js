import { all } from 'redux-saga/effects';
import {
  quizSaga,
  fetchByIdSaga,
  onAnswerClick,
  retry,
  timeUpWatcher,
} from './quizSagas';
import authSaga from './authSagas';

export default function* rootSaga() {
  yield all([
    quizSaga(),
    authSaga(),
    fetchByIdSaga(),
    onAnswerClick(),
    retry(),
    timeUpWatcher(),
  ]);
}
