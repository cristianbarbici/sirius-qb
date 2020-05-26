import React, { useReducer, useState } from "react";
import MuiButton from "@material-ui/core/Button";
import { useStyles } from "../Hooks/useStyles";
import { startProcess, getCorrelationId, updateProcess } from "../lib/splatComms";
import { SplProcessDispatchCtx, SplProcessTypeCtx, SplProcessStateCtx, setState } from "./SplProcess";
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

const logger = next => action => {
  console.log("dispatching", action);
  let result = next(action);
  return result;
}

const updateBackend = (next, localState, setLocalState) => {
  return (action) => {
    console.log("updateBackend", action, localState);
    switch (action.type) {
      case "update":
        const correlationId = getCorrelationId();
        // optimistically update local process state, 
        // in the hope that the server will later agree
        // (and if not, it will overwrite with the correct state)
        next(action);
        updateProcess(
          localState.instanceUri,
          action.path,
          action.value,
          localState.lastKnownEventId,
          correlationId
        ).subscribe((msg) => {
          console.log("from updateProcess subscription: ", msg);
          if (msg.type === "TypeEventWithState") {
            setLocalState({
              lastKnownEventId: msg.lastKnownEventId,
              instanceUri: msg.event.origin,
            });
            next({ type: "set-process-state", state: msg.state });
          }
        });
        return;
      default:
        break;
    }
    return next(action);
  };
};

export default function SplStartProcess(props) {
  const [state, origDispatch] = useReducer(splatBackendReducer, {});
  const [processType, setProcessType] = useState({ name: props.name });
  const [stateLoaded, setStateLoaded] = useState(false);
  const [updateState, setUpdateState] = useState({});
  const dispatch = logger(
    updateBackend(origDispatch, updateState, setUpdateState)
  );
/**
  const correlationId = getCorrelationId();

  updateProcess(
    instanceUri,
    action.path,
    action.value,
    lastKnownEventId,
    correlationId
  ).subscribe((msg) => console.log(msg));
 */
  const disabled = false;
  const classes = useStyles();

  const handler = () => {
    const correlationId = getCorrelationId();

    var subscription = startProcess(props.name, correlationId)
      .subscribe((msg) => {
        console.log("from subscription: ", msg);
        if(msg.type === "TypeEventWithState") {
          setProcessType({name: props.name, typeData: msg.typeData});
          dispatch({ type: "set-process-state", state: msg.state });
          setUpdateState({
            lastKnownEventId: msg.lastKnownEventId,
            instanceUri: msg.event.origin,
          });
          setStateLoaded(true);
          // if is it possible to receive further state after this,
          // then perhaps we shouldn't unsubscribe?
          subscription.unsubscribe();
        }
      });
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

  return stateLoaded ? splProcess : startButton;
}
