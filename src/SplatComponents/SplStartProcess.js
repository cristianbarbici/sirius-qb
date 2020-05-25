import React, { useReducer, useState } from "react";
import MuiButton from "@material-ui/core/Button";
import { useStyles } from "../Hooks/useStyles";
import { startProcess, getCorrelationId } from "../lib/splatComms";
import { SplProcessReducerCtx, SplProcessTypeCtx, SplProcessStateCtx, setState } from "./SplProcess";
import produce from "immer";

const splatBackendReducer = produce((draft, action) => {
  switch (action.type) {
    case "set-process-state":
      console.log(action.type);
      return action.state;

    case "update":
      console.log(action.type + " " + action.path + " => " + action.value);
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

export default function SplStartProcess(props) {
  const [state, reducer] = useReducer(splatBackendReducer, {});
  const [processType, setProcessType] = useState({ name: props.name });
  const [stateLoaded, setStateLoaded] = useState(false);

  const disabled = false;
  const classes = useStyles();

  const handler = () => {
    const correlationId = getCorrelationId();

    startProcess(props.name, correlationId)
      .subscribe((msg) => {
        console.log("from subscription: ", msg);
        if(msg.type === "TypeEventWithState") {
          setProcessType({name: props.name, typeData: msg.typeData});
          reducer({type: "set-process-state", state: msg.state});
          setStateLoaded(true);
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
    <SplProcessReducerCtx.Provider value={reducer}>
      <SplProcessTypeCtx.Provider value={processType}>
        <SplProcessStateCtx.Provider value={state}>
          {props.children}
        </SplProcessStateCtx.Provider>
      </SplProcessTypeCtx.Provider>
    </SplProcessReducerCtx.Provider>
  );

  return stateLoaded ? splProcess : startButton;
}
