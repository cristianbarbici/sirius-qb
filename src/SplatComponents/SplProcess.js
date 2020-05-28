import React, { useReducer, useContext } from 'react';
import splat from '../Data/Splat-data'
import { splatReducer } from './splatReducer';

export const SplProcessStateCtx = React.createContext();
export const SplProcessTypeCtx = React.createContext();
export const SplProcessDispatchCtx = React.createContext();

export const useProcessState = () => useContext(SplProcessStateCtx);
export const useProcessType = () => useContext(SplProcessTypeCtx);
export const useProcessDispatch = () => useContext(SplProcessDispatchCtx);

export default function SplProcess(props) {
  const [state, dispatch] = useReducer(splatReducer, splat.state);
  const processType = {name: props.name, typeData: splat.typeData};
  return (
    <SplProcessDispatchCtx.Provider value={dispatch}>
      <SplProcessTypeCtx.Provider value={processType}>
        <SplProcessStateCtx.Provider value={state}>
          {props.children}
        </SplProcessStateCtx.Provider>
      </SplProcessTypeCtx.Provider>
    </SplProcessDispatchCtx.Provider>
  );
}
