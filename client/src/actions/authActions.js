import {
    LOGIN_USER,
    LOGIN_USER_FAIL,
    REGISTER_USER,
    REGISTER_USER_FAIL
} from './types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

export const userLogin = () => async dispatch => {
    let token = await axios.get('/api/current_user');
    console.log(token);
};

export const userRegister = () => async dispatch => {

};