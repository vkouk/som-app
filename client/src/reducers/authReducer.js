import {
    FETCH_USER,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from '../actions/types';

const initialState = {
  email: '',
  password: '',
  error: '',
  user: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case FETCH_USER:
            return { ...state, user: action.payload };
        case AUTH_USER:
            return { ...state, email: '', password: '', error: '' };
        case UNAUTH_USER:
            return { ...state, email: '', password: '' };
        case AUTH_ERROR:
            return { ...state, error: action.payload, email: '', password: '' };
        default:
            return state;
    }
}