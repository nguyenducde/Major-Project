// action types
const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";

// reducer with initial state
const initialState = {
  items: []
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "API_CALL_SUCCESS":
      return {
        ...state,
        items: action.payload.items
      };
    default:
      return state;
  }
}