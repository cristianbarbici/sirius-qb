import React from "react";
import { useSplatFieldCtx } from "../SplatComponents/SplField";
import MuiTextField from "@material-ui/core/TextField";
import { useStyles } from "../Hooks/useStyles";

export default function TextField(props) {
  const [value, setValue] = useSplatFieldCtx();
  const classes = useStyles();

  return (
    <MuiTextField
      id={props.id}
      label={props.label}
      variant="filled"
      className={props.className || classes.textField}
      value={value}
      onChange={setValue}
      fullWidth={props.fullWidth}
      select={props.select}
    >
      {props.children}
    </MuiTextField>
  );
}
