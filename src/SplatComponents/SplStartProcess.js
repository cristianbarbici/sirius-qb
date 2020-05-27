import React, { useReducer, useState } from "react";
import MuiButton from "@material-ui/core/Button";
import { useStyles } from "../Hooks/useStyles";
import {
  startProcess,
  getCorrelationId,
  updateProcess,
  executeAction,
} from "../lib/splatComms";
import {
  SplProcessDispatchCtx,
  SplProcessTypeCtx,
  SplProcessStateCtx,
  setState,
} from "./SplProcess";
import produce from "immer";

const splatBackendReducer = produce((draft, action) => {
  switch (action.type) {
    case "set-process-state":
      console.log(action.type, action.state);
      return action.state;

    case "update":
      console.log(action.type + " " + action.path + " => " + action.value);
      // optimistically set state locally
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

const logger = (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  return result;
};

// note that the component might no longer be mounted when this callback is fired...
// see https://github.com/rauldeheer/use-async-effect
const updateState = (next, setLocalState, source, tewsCallback = () => {}) => (
  msg
) => {
  console.log(`from ${source} subscription: `, msg);
  if (msg.type === "TypeEventWithState") {
    setLocalState({
      lastKnownEventId: msg.lastKnownEventId,
      instanceUri: msg.event.origin,
    });
    tewsCallback(msg);
    next({ type: "set-process-state", state: msg.state });
  }
};

const updateBackend = (next, localState, setLocalState, setProcessType) => {
  return (action) => {
    console.log("updateBackend", action, localState);
    switch (action.type) {
      case "start-process":
        const startCorrelationId = getCorrelationId();
        startProcess(action.name, startCorrelationId).subscribe(
          updateState(next, setLocalState, "startProcess", (msg) =>
            setProcessType({ name: action.name, typeData: msg.typeData })
          )
        );
        return;
      case "invoke-action":
        const actionCorrelationId = getCorrelationId();
        executeAction(
          localState.instanceUri,
          action.name,
          actionCorrelationId
        ).subscribe(updateState(next, setLocalState, "executeAction"));
        break;
      case "update":
        const correlationId = getCorrelationId();
        updateProcess(
          localState.instanceUri,
          action.path,
          action.value,
          localState.lastKnownEventId,
          correlationId
        ).subscribe(updateState(next, setLocalState, "updateProcess"));
        break;
      default:
        break;
    }

    // optimistically update local process state,
    // in the hope that the server will later agree
    // (and if not, it will overwrite with the correct state)
    return next(action);
  };
};

export default function SplStartProcess(props) {
  const [state, origDispatch] = useReducer(splatBackendReducer, false);
  const [processType, setProcessType] = useState({ name: props.name });
  const [updateState, setUpdateState] = useState();
  const dispatch = logger(
    updateBackend(origDispatch, updateState, setUpdateState, (t) => {
      console.log("setting processType", t);
      setProcessType(t);
    })
  );
  const disabled = false;
  const classes = useStyles();

  const handler = () => {
    dispatch({ type: "start-process", name: props.name });
  };

  const startButton = (
    <div className={classes.controlContainer}>
      <MuiButton
        variant="contained"
        disabled={disabled}
        color="primary"
        onClick={handler}
      >
        {props.label}
      </MuiButton>
    </div>
  );
  const splProcess = (
    <SplProcessDispatchCtx.Provider value={dispatch}>
      <SplProcessTypeCtx.Provider value={processType}>
        <SplProcessStateCtx.Provider value={state}>
          {props.children}
        </SplProcessStateCtx.Provider>
      </SplProcessTypeCtx.Provider>
    </SplProcessDispatchCtx.Provider>
  );

  return state ? splProcess : startButton;
}
