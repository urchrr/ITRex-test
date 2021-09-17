import {SET_Filter_Values} from "../actions/actionTypes";


const initialState = {
    name: '',
    state: ''
}

const handleChangeValues = (state, action) => {
    const {value, name} = action.payload
    return {...state, [name]: value}
}
export default function filterValues(state = initialState, action) {
    switch (action.type) {
        case SET_Filter_Values:
            return handleChangeValues(state, action);
        default:
            return state;
    }
}
