import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';

// local styles
export const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(3,0),
      //width: '100%',

      '& + &': {
          marginTop: theme.spacing(1.5)
      }
    }
  }));

export default function FormRow(props) {
    const { children } = props;
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <div className={classes.root}>
            {children}
        </div>
    );
}