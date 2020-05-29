import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';

// local styles
export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: theme.spacing(3,0),

        '& + &': {
            marginTop: theme.spacing(1.5)
        }
    },
    label: {
        display: 'block',
        marginBottom: theme.spacing(1.25),
        paddingLeft: theme.spacing(.5),
        fontSize: '13px',
        color: 'rgba(0,0,0,.4)'
    },
  }));

export default function FormRow(props) {
    const { label, children } = props;
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <div className={classes.root}>
            <label className={classes.label}>{label}</label>
            {children}
        </div>
    );
}