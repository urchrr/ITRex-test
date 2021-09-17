import {combineReducers} from "redux";
import initialData from "./reducers/initialData";
import infoFormState from './reducers/infoFormState'
import filterValues from './reducers/filterValues'
import currentPage from "./reducers/currentPage";
import sortValues from './reducers/sortValues'

export default combineReducers({
    initialData,
    infoFormState,
    filterValues,
    sortValues,
    currentPage
});
