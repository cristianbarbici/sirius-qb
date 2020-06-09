import React from "react";
import { useSplatAction } from "@splat/splat-react";
import MuiButton from "@material-ui/core/Button";
import { useStyles } from "../Hooks/useStyles";

export default function Button(props) {
  const [disabled, handleClick] = useSplatAction();
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
