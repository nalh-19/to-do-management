import {
  LIST_ALL,
  SAVE_TASK,
  UPDATE_STATUS,
  DELETE_TASK,
} from "../constants/ActionTypes";

// Create a random string
const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

// Generate an unique ID from random strings
const generateID = () => {
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4()
  );
};

// Find index of tasks that need to be change it status
const findIndex = (tasks, id) => {
  var result = -1;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      result = index;
    }
  });
  return result;
};

var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];

var tasksReducer = (state = initialState, action) => {
  var id = "";
  var index = -1;
  switch (action.type) {
    case LIST_ALL:
      return state;
    case SAVE_TASK:
      const task = {
        id: action.task.id,
        name: action.task.name,
        status: action.task.status === "true" ? true : false,
      };
      if (!task.id) {
        task.id = generateID();
        state.push(task);
      } else {
        index = findIndex(state, task.id);
        state[index] = task;
      }

      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case UPDATE_STATUS:
      id = action.id;
      index = findIndex(state, id);
      state[index] = {
        ...state[index],
        status: !state[index].status,
      };
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case DELETE_TASK:
      id = action.id;
      index = findIndex(state, id);
      state.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
};

export default tasksReducer;
