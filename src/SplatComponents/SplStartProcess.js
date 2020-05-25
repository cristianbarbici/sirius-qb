import React from "react";
import MuiButton from "@material-ui/core/Button";
import { useStyles } from "../Hooks/useStyles";
import { startProcess, getCorrelationId } from "../lib/splatComms";

export default function SplStartProcess(props) {
  const disabled = false;
  const classes = useStyles();

  const handler = () => {
    const correlationId = getCorrelationId();
    // subscribeTo(correlationId, (m) => console.log("from subscription: ", m));

    startProcess(props.name, correlationId)
      .subscribe((m) => console.log("from subscription: ", m));
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
