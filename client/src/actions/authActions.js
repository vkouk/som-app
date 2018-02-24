import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const ROOT_URL = 'http://localhost:5000';

export const emailChanged = text => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = text => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({email, password}) => async dispatch => {
    await axios.post(`${ROOT_URL}/api/login`, { email, password })
        .then(response => {
            dispatch({ type: AUTH_USER });
            AsyncStorage.setItem('token', response.data.token);
        })
        .catch(() => dispatch(authError('Invalid email address or password.')));
};

export const registerUser = ({email, password}) => async dispatch => {
    await axios.post(`${ROOT_URL}/api/register`, { email, password })
        .then(() => {
            dispatch({ type: AUTH_USER });
        })
        .catch(() => dispatch(authError('Invalid form credentials')));
};

export const logoutUser = () => {
  AsyncStorage.removeItem('token');

  return { type: UNAUTH_USER };
};

export const authError = error => {
  return {
      type: AUTH_ERROR,
      payload: error
  };
};