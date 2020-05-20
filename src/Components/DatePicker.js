import React from "react";
import { DatePicker as MuiDatePicker } from "@material-ui/pickers";
import { useStyles } from "../Hooks/useStyles";

export default function DatePicker(props) {
  const classes = useStyles();
  return (
    <div className={classes.controlContainer}>
      <MuiDatePicker
        id={props.id}
        format="YYYY-MM-DD"
        label={props.label}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}
