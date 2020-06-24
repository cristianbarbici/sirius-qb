import React from "react"
import clsx from "clsx"
import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(3, 4.5), // theme.spacing(2.5, 4.5),
    height: 'auto',
    transition: 'padding 150ms cubic-bezier(0.4, 0, 0.2, 1)' // TODO: make it work smoother
  },
  rootValid: {
    padding: theme.spacing(1, 4.5),
  },
  label: {
    display: 'block',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(.5),
    fontSize: '.8rem',
    lineHeight: '1rem',
    color: 'rgba(0,0,0,.87)',
    fontWeight: 500,
    letterSpacing: '.5px',

    '& + $hint': {
      marginTop: -theme.spacing(.5)
    }
  },
  labelErr: {
    color: '#b22000'
  },
  labelValid: {
    color: 'rgba(0,0,0,.38)'
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
  const { label, hint, children, className, error = false, valid = false } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={clsx(classes.root, className, {[classes.rootValid]: !error && valid})}>
      <label className={clsx(classes.label, {[classes.labelErr]: error, [classes.labelValid]: !error && valid})}>{label}</label>
      { hint ? <span className={classes.hint}>{hint}</span> : null }
      {children}
    </div>
  );
}