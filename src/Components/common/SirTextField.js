import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from '@material-ui/core/styles';

// local styles
export const useStyles = makeStyles((theme) => ({
    root: {
      // margin: theme.spacing(6)
    }
  }));

export default function SirTextField(props) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
      <TextField
        className={classes.root}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        fullWidth
        {...props}  // label, value, onChange
      />
    );
}