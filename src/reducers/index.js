import { combineReducers } from "redux";
import tasksReducer from "./tasksReducer";
import formDisplayReducer from "./formDisplayReducer";
import itemEditingReducer from "./itemEditingReducer";
import filterTableReducer from "./filterTableReducer";
import searchReducer from "./searchReducer";
import sortReducer from "./sortReducer";

const rootReducer = combineReducers({
  tasksReducer,
  formDisplayReducer,
  itemEditingReducer,
  filterTableReducer,
  searchReducer,
  sortReducer,
});

export default rootReducer;
