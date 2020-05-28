import { SORT } from "../constants/ActionTypes";

const initialState = { by: "", value: 1 };

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT:
      return { by: action.sort.by, value: action.sort.value };
    default:
      return state;
  }
};

export default sortReducer;
