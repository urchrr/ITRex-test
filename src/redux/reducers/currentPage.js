import {SET_Current_Page} from "../actions/actionTypes";


const initialState = 1


export default function currentPage(state = initialState, action) {
    switch (action.type) {
        case SET_Current_Page:
            return action.payload;
        default:
            return state;
    }
}
