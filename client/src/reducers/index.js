import { combineReducers } from 'redux';
import authReducer from './authReducer';
import supplyReducer from './supplyReducer';

export default combineReducers({
    auth: authReducer,
    supply: supplyReducer
});