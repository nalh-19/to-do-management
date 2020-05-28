import { SEARCH } from "../constants/ActionTypes";

const initialState = "";

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return action.keyword;
    default:
      return state;
  }
};

export default searchReducer;
