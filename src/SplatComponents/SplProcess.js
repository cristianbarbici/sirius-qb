import React, { useReducer, useContext } from 'react';
import produce from "immer"
import splat from '../Data/Splat-data'

export const SplProcessStateCtx = React.createContext();
export const SplProcessTypeCtx = React.createContext();
export const SplProcessReducerCtx = React.createContext();

const workState = (path, state, fn) => {
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

export const setState = (path, state, value) => {
  return workState(path, state, (prop, state) => {
      state[prop] = value;
      return state;
    });
};

const splatReducer = produce((draft, action) => {
  switch (action.type) {
    case "update":
      console.log(
        action.type + " " + action.path + " => " + action.value
      );
      setState(action.path, draft, action.value);
      return;

    case "invoke-action":
      console.log("invoke action " + action.name);
      return

    default:
      console.log("unknown action type " + action.type);
      return;
  }
});

export const useProcessState = () => useContext(SplProcessStateCtx);
export const useProcessType = () => useContext(SplProcessTypeCtx);
export const useProcessReducer = () => useContext(SplProcessReducerCtx);

export default function SplProcess(props) {
  const [state, reducer] = useReducer(splatReducer, splat.state);
  const processType = {name: props.name, typeData: splat.typeData};
  return (
    <SplProcessReducerCtx.Provider value={reducer}>
      <SplProcessTypeCtx.Provider value={processType}>
        <SplProcessStateCtx.Provider value={state}>
          {props.children}
        </SplProcessStateCtx.Provider>
      </SplProcessTypeCtx.Provider>
    </SplProcessReducerCtx.Provider>
  );
}
