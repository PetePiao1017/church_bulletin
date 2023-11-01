import { RETRIEVE_DATA } from "../actions/types";

const initialState = {
    retrieved_data: []
}

function retrievedReducer (state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case RETRIEVE_DATA:
            return {
                ...state,
                retrieved_data : payload
            }
        default:
            return state;
    }
}


export default retrievedReducer