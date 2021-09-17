import * as aTypes from "./actionTypes";

export const setInitialData = (value) => ({
    type: aTypes.SET_Initial_Data,
    payload: value,
});


export const setInfoFormData = (value) => ({
    type: aTypes.SET_Form_State,
    payload: value,
});

export const setFilterValues = (v) => ({
    type: aTypes.SET_Filter_Values,
    payload: v
})

export const setCurrentPage = (page) => ({
    type: aTypes.SET_Current_Page,
    payload: page
})

export const setSortValues = (v) => ({
    type: aTypes.SET_Sort_Values,
    payload: v
})

