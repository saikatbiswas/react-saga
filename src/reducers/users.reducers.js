import { types } from "../actions/types";


const INITIAL_STATE = {
    items: [],
    error:''
};

export default function users(state = INITIAL_STATE, action){
    switch(action.type){
        case types.GET_USER_SUCCESS: 
            return {
                ...state,
                items: action.payload
            }
        case types.USER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        
        default:
            return state
        
    }

}