import React from "react";
import { useSplatFieldCtx, useFieldPath, useSplatField } from "../SplatComponents/SplField";
import MuiTextField from "@material-ui/core/TextField";
import { useStyles } from "../Hooks/useStyles";
import { MenuItem } from "@material-ui/core";

export default function Select(props) {
  const [value, setValue] = useSplatFieldCtx();
  const classes = useStyles();
  const emptyIfNull = (arr) => !arr ? [] : arr;
  const valueKey = value ? value[props.optionKey] : {};
  // according to https://material-ui.com/api/select/ :
  // If the value is an object it must have reference equality with the option
  // in order to be selected.
  // If the value is not an object, the string representation must match with
  // the string representation of the option in order to be selected.
  // since we've roundtripped the state to JSON, we must re-establish reference equality
  const matchingValues = emptyIfNull(props.options).filter(
    (option) => option[props.optionKey] === valueKey
  );
  return (
    <MuiTextField
      id={props.id}
      label={props.label}
      variant="filled"
      className={props.className || classes.textField}
      value={matchingValues[0] || ""}
      onChange={setValue}
      fullWidth={props.fullWidth}
      select
    >
      {props.options.map((option) => (
        <MenuItem key={option[props.optionKey]} value={option}>
          {option[props.optionName]}
        </MenuItem>
      ))}
    </MuiTextField>
  );
}
