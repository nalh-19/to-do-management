import { createStore } from "redux";

var initialState = {
  status: false,
};

var myReducer = (state = initialState, action) => {
  return state;
};

const store = createStore(myReducer);

console.log(store);
