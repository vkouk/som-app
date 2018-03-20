import {
    FETCH_SUPPLIES
} from "../actions/types";

export default (state = [], action) => {
    switch(action.type) {
        case FETCH_SUPPLIES:
            return action.payload;
        default:
            return state;
    }
}