import React from "react"
import clsx from "clsx"
import { makeStyles, useTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(3, 4.5),
  },
  label: {
    display: 'block',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(.5),
    fontSize: '12px',
    lineHeight: '16px',
    color: 'rgba(0,0,0,.72)',
    fontWeight: 600,
    letterSpacing: '.5px'
  },
}));

export default function FormRow(props) {
  const { label, children, className } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={clsx(classes.root, className)}>
      <label className={classes.label}>{label}</label>
      {children}
    </div>
  );
}