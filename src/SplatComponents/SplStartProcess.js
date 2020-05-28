import React, { useReducer, useState } from "react";
import MuiButton from "@material-ui/core/Button";
import { useStyles } from "../Hooks/useStyles";
import {
  SplProcessDispatchCtx,
  SplProcessTypeCtx,
  SplProcessStateCtx,
} from "./SplProcess";
import { splatBackendReducer, logger } from "./splatBackendReducer";
import { splatReducer } from "./splatReducer";

export default function SplStartProcess(props) {
  const [state, origDispatch] = useReducer(splatReducer, false);
  const [processType, setProcessType] = useState({ name: props.name });
  const [updateState, setUpdateState] = useState();
  const dispatch = logger(
    splatBackendReducer(origDispatch, updateState, setUpdateState, (t) => {
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
