import React, { useContext } from "react";
import { navigateState, useProcessState, useProcessReducer } from "../SplatComponents/SplProcess";

export const SplFieldStateCtx = React.createContext("???");
export const SplFieldPathCtx = React.createContext("???");

export const useFieldState = () => useContext(SplFieldStateCtx);
export const useFieldPath = () => useContext(SplFieldPathCtx);

export const useStateHandlerPair = (path, fieldState) => {
  const reducer = useProcessReducer();
  const handler = (event) => {
    reducer({ type: "update", path, value: event.target.value });
  };
  return [fieldState, handler];
};

export const useSplatField = (path) => {
  const processState = useProcessState();
  const fieldState = navigateState(path, processState);
  return useStateHandlerPair(path, fieldState);
};

export const useSplatFieldCtx = () => {
  const path = useFieldPath();
  const fieldState = useFieldState();
  return useStateHandlerPair(path, fieldState);
};

export default function SplField(props) {
  const state = useProcessState();
  const fieldState = navigateState(props.path, state);
  return (
    <SplFieldPathCtx.Provider value={props.path}>
      <SplFieldStateCtx.Provider value={fieldState}>
        {props.children}
      </SplFieldStateCtx.Provider>
    </SplFieldPathCtx.Provider>
  );
}
