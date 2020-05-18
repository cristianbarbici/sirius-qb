import React, { useState } from 'react';
import splat from '../Data/Splat-data'

export const SplProcessCtx = React.createContext({ loaded: false });

export const workState = (path, state, fn) => {
    if (path) {
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
      console.log("state[" + prop + "] = " + value + ", was ", state[prop]);
      state[prop] = value;
      console.log("resulting state:", state[prop]);
      return; 
    });
};

export default function SplProcess(props) {
  console.log("setting state  with title ", splat.state.process_BusinessLayer.BusinessTitle);
  const [state] = useState(splat.state);

  return (
    <SplProcessCtx.Provider value={state}>
      {props.children}
    </SplProcessCtx.Provider>
  );
}
