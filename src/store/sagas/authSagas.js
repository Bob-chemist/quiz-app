import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../axios/axios-quiz';
import { AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/actionTypes';
import { loginToken, registerToken } from '../../containers/Auth/API';

function* autoLogin() {
  const token = localStorage.getItem('token');
  const expirationDate = new Date(call(localStorage.getItem, 'expirationDate'));
  if (!token || expirationDate <= new Date()) {
    logout();
  } else {
    yield put({ type: AUTH_SUCCESS, token });
    yield call(
      autoLogout,
      (expirationDate.getTime() - new Date().getTime()) / 1000
    );
  }
}

export function* auth(email, password, isLogin) {
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${registerToken}`;
  if (isLogin) {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${loginToken}`;
  }

  const response = yield call(axios.post, url, authData);
  const data = response.data;
  const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

  localStorage.setItem('token', data.idToken);
  localStorage.setItem('userId', data.localId);
  localStorage.setItem('expirationDate', expirationDate);

  yield put(AUTH_SUCCESS, data.idToken);
  yield call(autoLogout, data.expiresIn);
}

export function* autoLogout(time) {
  yield call(setTimeout, () => call(logout), time * 1000);
}

export function* logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  yield put(AUTH_LOGOUT);
}

function* authSaga() {
  yield takeLatest('AUTO_LOGIN', autoLogin);
}

export default authSaga;
