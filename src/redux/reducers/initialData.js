import {SET_Initial_Data} from "../actions/actionTypes";
import {checkLocalStorage, getFromLocalStorage} from "../../utils/localStorage";
import {dataKey} from "../../utils/constants";

const initialState = checkLocalStorage(dataKey) ? getFromLocalStorage(dataKey) : [];

export default function initialData(state = initialState, action) {
    switch (action.type) {
        case SET_Initial_Data:
            return action.payload;
        default:
            return state;
    }
}

