import { types } from "./types";


export const getUserRequest = ()=>({
    type:types.GET_USER_REQUEST
});

export const getUserSuccess= ({items})=>({
    type:types.GET_USER_SUCCESS,
    payload: items
});

export const createUserRequest = ({firstName, lastName}) => ({
    type: types.CREATE_USER_REQUEST,
    payload: {
        firstName, 
        lastName
    }
});

export const deleteUserRequest = (userId) => ({
    type: types.DELETE_USER_REQUEST,
    payload: {userId}
});

export const userError = ({error}) => ({
    type: types.USER_ERROR,
    payload: error
});