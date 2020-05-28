import produce from "immer";

const workState = (path, state, fn) => {
  if (path && state) {
    let current = path.split(".", 1)[0];
    if (current === path) {
      return fn(current, state);
    }
    else {
      let remaining = path.substr(current.length + 1);
      return workState(remaining, state[current], fn);
    }
  }
};
export const navigateState = (path, state) => {
  return workState(path, state, (prop, state) => state[prop]);
};
export const setState = (path, state, value) => {
  return workState(path, state, (prop, state) => {
    state[prop] = value;
    return state;
  });
};
export const splatReducer = produce((draft, action) => {
  switch (action.type) {
    case "set-process-state":
      console.log(action.type, action.state);
      return action.state;
    case "update":
      console.log(action.type + " " + action.path + " =>", action.value);
      setState(action.path, draft, action.value);
      return;
    case "invoke-action":
      console.log("invoke action " + action.name);
      return;
    default:
      console.log("unknown action type " + action.type);
      return;
  }
});
