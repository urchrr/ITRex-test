import {SET_Sort_Values} from "../actions/actionTypes";


const initialState = {
    ascending: true,
    column: 'id'
};

export default function sortValues(state = initialState, action) {
    switch (action.type) {
        case SET_Sort_Values:
            return action.payload;
        default:
            return state;
    }
}
