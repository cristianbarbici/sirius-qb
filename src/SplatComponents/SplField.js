import React, { useContext } from "react";
import { navigateState, useProcessState } from "../SplatComponents/SplProcess";

export const SplFieldCtx = React.createContext({ path: "???" });

export const useFieldState = () => useContext(SplFieldCtx);

export const useSplatField = (path) => {
  const { state, reducer } = useProcessState();
  const fieldState = navigateState(path, state);
  const handler = (event) => {
    console.log("  useSplatField change " + path + " => " + event.target.value);
    reducer({ type: "update", path, value: event.target.value });
  };

  return [
    fieldState,
    handler,
  ];
};

export const useSplatFieldCtx = () => {
  const {path} = useFieldState();
  console.log("useSplatFieldCtx: " + path);
  return useSplatField(path);
};

export default function SplField(props) {
  const {state, reducer} = useProcessState();
  console.log("  SplField: " + props.field);
  let fieldContext = { path: props.field, state: navigateState(props.field, state), reducer };
  console.log("     state: " + fieldContext.state);
  
  return (
    <SplFieldCtx.Provider value={fieldContext}>
      {props.children}
    </SplFieldCtx.Provider>
  );
}
