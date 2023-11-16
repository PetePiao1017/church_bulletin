import { RETRIEVE_DATA } from '../actions/types';

const initialState = {
    retrived_data: []
};

function retrieveReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_DATA:
      return {
        ...state,
        retrived_data: payload
      }
    default:
      return state;
  }
}

export default retrieveReducer;