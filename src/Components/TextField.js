import React from "react";
import { useSplatFieldCtx } from "../SplatComponents/SplField";
import MuiTextField from "@material-ui/core/TextField";
import { useStyles } from "../Hooks/useStyles";

export default function TextField(props) {
  const [value, setValue] = useSplatFieldCtx();
  const classes = useStyles();

  return (
    <MuiTextField
      label={props.label}
      variant="outlined"
      value={value || ""}
      onChange={setValue}
      select={props.select}
      InputLabelProps={{ shrink: true }}
    >
      {props.children}
    </MuiTextField>
  );
}
