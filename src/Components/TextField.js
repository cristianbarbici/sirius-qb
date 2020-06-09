import React from "react";
import { useSplatField } from "@splat/splat-react";
import MuiTextField from "@material-ui/core/TextField";
import { useStyles } from "../Hooks/useStyles";

export default function TextField(props) {
  const [value, setValue] = useSplatField();
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
