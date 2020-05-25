import React, { useContext } from "react";
import { navigateState, useProcessState, useProcessDispatch } from "../SplatComponents/SplProcess";

export const SplFieldStateCtx = React.createContext("???");
export const SplFieldPathCtx = React.createContext("???");

export const useFieldState = () => useContext(SplFieldStateCtx);
export const useFieldPath = () => useContext(SplFieldPathCtx);

export const useStateHandlerPair = (path, fieldState, eventValueExtractor) => {
  const dispatch = useProcessDispatch();
  const handler = (event) => {
    dispatch({ type: "update", path, value: eventValueExtractor(event) });
  };
  return [fieldState, handler];
};

export const eventTargetValue = (event) => event.target.value;
export const eventTargetChecked = (event) => event.target.checked;
export const dateFormat = (date) => date.format();

export const useSplatField = (path, eventValueExtractor = (id) => id) => {
  const processState = useProcessState();
  const fieldState = navigateState(path, processState);
  return useStateHandlerPair(path, fieldState, eventValueExtractor);
};

export const useSplatFieldCtx = (eventValueExtractor = eventTargetValue) => {
  const path = useFieldPath();
  const fieldState = useFieldState();
  return useStateHandlerPair(path, fieldState, eventValueExtractor);
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
