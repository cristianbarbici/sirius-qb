import React, { useContext } from "react";
import {
  navigateState,
  useProcessType,
  useProcessState,
  useProcessDispatch,
} from "../SplatComponents/SplProcess";

export const SplActionCtx = React.createContext();
export const useAction = () => useContext(SplActionCtx);

export const useSplatActionCtx = () => {
  const action = useAction();
  const dispatch = useProcessDispatch();
  const handleClick = (event) =>
    dispatch({ type: "invoke-action", name: action.name });
  return [action.disabled, handleClick];
}

export default function SplAction(props) {
  const types = useProcessType();
  const processType = types.typeData[types.name];
  const actionType = (processType && processType.actionMap[props.name]) || {};
  const processState = useProcessState();

  const guardState =
    (actionType.guard && navigateState(actionType.guard, processState)) ||
    !actionType.guard;
  const actionCtx = { name: props.name, disabled: !guardState };

  return (
    <SplActionCtx.Provider value={actionCtx}>
      {props.children}
    </SplActionCtx.Provider>
  );
}
