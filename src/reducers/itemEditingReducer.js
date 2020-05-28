import { EDIT_TASK } from "../constants/ActionTypes";

const initialState = { id: "", name: "", status: false };

const itemEditingReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_TASK:
      return action.task;
    default:
      return state;
  }
};

export default itemEditingReducer;
