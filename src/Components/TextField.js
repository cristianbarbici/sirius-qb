import React from "react";
import { useSplatFieldCtx } from "../SplatComponents/SplField";
import MUITextField from "@material-ui/core/TextField";
import { useStyles } from "../Hooks/useStyles";

export default function TextField(props) {
  const [state, handler] = useSplatFieldCtx();
  const classes = useStyles();

  return (
    <MUITextField
      id={props.id}
      label={props.label}
      variant="filled"
      className={props.className || classes.textField}
      value={state}
      onChange={handler}
      fullWidth={props.fullWidth}
      select={props.select}
    >
      {props.children}
    </MUITextField>
  );
}
