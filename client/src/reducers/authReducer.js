import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from '../actions/types';

const initialState = {
  email: '',
  password: '',
  error: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case AUTH_USER:
            return { ...state, error: '' };
        case UNAUTH_USER:
            return { ...state, email: '', password: '' };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}