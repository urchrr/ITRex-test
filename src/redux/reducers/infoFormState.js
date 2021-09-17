import {SET_Form_State} from "../actions/actionTypes";

const initialState = {
    description: 'Description',
    email: 'email@email.com',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: '(999)999-9999',
    adress: {
        city: "City",
        state: "State",
        streetAddress: "Street",
        zip: "00000"
    }
};

export default function infoFormState(state = initialState, action) {
    switch (action.type) {
        case SET_Form_State:
            return action.payload;
        default:
            return state;
    }
}
