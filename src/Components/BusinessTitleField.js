import React from "react";
import TextField from './TextField'
import { useStyles } from "../Hooks/useStyles";

export default function BusinessTitleField(props) {
  const classes = useStyles();
  return (
    <div>
      <TextField
        id="BusinessTitle"
        label="Business Title"
        className={classes.fullWidthTextField}
        fullWidth
      />
    </div>
  );
}
