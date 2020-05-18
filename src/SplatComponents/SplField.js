import React, { useContext } from "react";
import { SplProcessCtx, navigateState } from "../SplatComponents/SplProcess";

export const SplFieldCtx = React.createContext({ path: "???" });

export default function SplField(props) {
  const state = useContext(SplProcessCtx);
  console.log("fetched state: " + navigateState(props.field, state));
  let fieldContext = { path: props.field, state };
  
  return (
    <SplFieldCtx.Provider value={fieldContext}>
      {props.children}
    </SplFieldCtx.Provider>
  );
}
