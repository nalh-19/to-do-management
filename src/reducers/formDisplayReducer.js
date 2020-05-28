import { TOGGLE_FORM, OPEN_FORM, CLOSE_FORM } from "../constants/ActionTypes";

const initialState = true;

const formDisplayReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FORM:
      return !state;
    case OPEN_FORM:
      return true;
    case CLOSE_FORM:
      return false;
    default:
      return state;
  }
};

export default formDisplayReducer;
