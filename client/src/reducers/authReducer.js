import {
    LOGIN_USER,
    LOGIN_USER_FAIL,
    REGISTER_USER,
    REGISTER_USER_FAIL
} from '../actions/types';

// export default (state = {}, action) => {
//     switch(action.type) {
//         case LOGIN_USER || REGISTER_USER:
//             return { token: action.payload };
//         case LOGIN_USER_FAIL || REGISTER_USER_FAIL:
//             return { token: null };
//         default:
//             return state;
//     }
// }

export default function(state = {}, action) {
    switch(action.type) {
        case LOGIN_USER || REGISTER_USER:
            return { token: action.payload };
        case LOGIN_USER_FAIL || REGISTER_USER_FAIL:
            return { token: null };
        default:
            return state;
    }
}