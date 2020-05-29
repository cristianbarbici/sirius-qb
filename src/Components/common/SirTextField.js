import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
    },
  }));

export default function SirTextField(props) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
      <TextField
        className={classes.root}
        variant="outlined"
        size="small"
        InputLabelProps={{ shrink: true }}
        fullWidth
        {...props}  // label, value, onChange
      />
    );
}