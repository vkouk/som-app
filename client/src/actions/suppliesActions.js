import {
    FETCH_SUPPLIES
} from "./types";
import { Platform } from 'react-native';
import axios from 'axios';

let ROOT_URL = '';
if (Platform.OS === 'ios') {
    ROOT_URL = 'http://localhost:5000';
} else {
    ROOT_URL = 'http://10.0.2.2:5000';
}

export const fetchSupplies = () => async dispatch => {
    const { data } =  await axios.get(`${ROOT_URL}/api/supplies`).catch(error => console.log(error.response.data.error));

    dispatch({ type: FETCH_SUPPLIES, payload: data });
};

export const submitSupply = values => async dispatch => {
    const { data } = await axios.post(`${ROOT_URL}/api/supplies`, values).catch(error => console.log(error.response.data.error));

    dispatch({ type: FETCH_SUPPLIES, payload: data });
};