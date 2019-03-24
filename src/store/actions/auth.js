import axios from 'axios';
import { loginToken, registerToken } from '../../containers/Auth/API';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureTocen: true,
    };
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${registerToken}`;
    if (isLogin) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${loginToken}`;
    }

    const response = await axios.post(url, authData);
    const data = response.data;
    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => dispatch(logout()), time * 1000);
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT,
  };
}
