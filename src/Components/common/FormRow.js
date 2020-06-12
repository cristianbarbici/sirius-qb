import React from "react"
import clsx from "clsx"
import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(2.5, 4.5),
  },
  label: {
    display: 'block',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(.5),
    fontSize: '13.5px',
    lineHeight: '16px',
    color: 'rgba(0,0,0,.6)',
    fontWeight: 500,
    letterSpacing: '.5px',

    '& + $hint': {
      marginTop: -theme.spacing(.5)
    }
  },
  hint: {
    display: 'block',
    fontSize: '12px',
    lineHeight: '16px',
    color: 'rgba(0,0,0,.38)',
    paddingLeft: theme.spacing(.5),
    marginBottom: theme.spacing(2),
    letterSpacing: '.5px',
  }
}));

export default function FormRow(props) {
  const { label, hint, children, className } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={clsx(classes.root, className)}>
      <label className={classes.label}>{label}</label>
      { hint ? <span className={classes.hint}>{hint}</span> : null }
      {children}
    </div>
  );
}