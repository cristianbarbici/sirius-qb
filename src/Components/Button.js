import React from "react";
import { useSplatActionCtx } from "../SplatComponents/SplAction";
import MuiButton from "@material-ui/core/Button";
import { useStyles } from "../Hooks/useStyles";

export default function Button(props) {
  const [disabled, handleClick] = useSplatActionCtx();
  const classes = useStyles();

  return (
    <div className={classes.controlContainer}>
      <MuiButton
        variant="contained"
        disabled={disabled}
        color="primary"
        onClick={handleClick}
      >
        {props.label}
      </MuiButton>
    </div>
  );
}
