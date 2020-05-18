import React, { useReducer, useContext } from 'react';
import splat from '../Data/Splat-data'

export const SplProcessCtx = React.createContext({ loaded: false });

export const workState = (path, state, fn) => {
    if (path && state) {
      let current = path.split(".", 1)[0];
      if (current === path) {
        return fn(current, state);
      } else {
        let remaining = path.substr(current.length + 1);
        return workState(remaining, state[current], fn);
      }
    }
  };

export const navigateState = (path, state) => {
  return workState(path, state, (prop, state) => state[prop]);
};

const setState = (path, state, value) => {
  return workState(path, state, (prop, state) => {
      console.log("state[" + prop + "] = " + value + ", was ", state[prop]);
      state[prop] = value;
      console.log("resulting change:", state[prop]);
      return state; 
    });
};

const splatReducer = (state, action) => {
  console.log(action.type + " [" + action.path + "] = " + action.value);
  switch (action.type) {
    case "update":
      // we need to return a _new_ state here, not just a modified one
      let newState = JSON.parse(JSON.stringify(state));
      setState(action.path, newState, action.value);
      return newState;

    default:
      return state;
  }
};

export const useProcessState = () => useContext(SplProcessCtx);

export default function SplProcess(props) {
  const [state, reducer] = useReducer(splatReducer, splat.state);
  const processContext = {state, reducer};
  return (
    <SplProcessCtx.Provider value={processContext}>
      {props.children}
    </SplProcessCtx.Provider>
  );
}
