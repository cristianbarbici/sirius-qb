import React from "react";
import MuiButton from "@material-ui/core/Button";
import { useStyles } from "../Hooks/useStyles";
import { startProcess, getCorrelationId, subscribeTo } from "../lib/comms";

export default function SplStartProcess(props) {
  const disabled = false;
  const classes = useStyles();

  const handler = () => {
    const correlationId = getCorrelationId();
    subscribeTo(correlationId, (m) => console.log("from subscription: ", m));

    startProcess(props.name, correlationId).then(
      (r) => console.log("response: " + r),
      (err) => console.log(err)
    );
  };

  return (
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
}
