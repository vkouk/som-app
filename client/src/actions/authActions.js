import {
    FETCH_USER,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const ROOT_URL = 'https://som-app-server.herokuapp.com';

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

export const fetchUser = () => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const { data } = await axios.get(`${ROOT_URL}/api/current_user`, { headers: { "Authorization" : token  } } );

    dispatch({
        type: FETCH_USER,
        payload: data
    });
};

export const loginUser = ({email, password}) => async dispatch => {
    await axios.post(`${ROOT_URL}/api/login`, { email, password })
        .then(response => {
            dispatch({ type: AUTH_USER });
            AsyncStorage.setItem('token', response.data.token);
        })
        .catch((error) => dispatch(authError(error.response.data.error)));
};

export const registerUser = ({email, password}) => async dispatch => {
    await axios.post(`${ROOT_URL}/api/register`, { email, password })
        .then(() => {
            dispatch({ type: AUTH_USER });
        })
        .catch((error) => dispatch(authError(error.response.data.error)));
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