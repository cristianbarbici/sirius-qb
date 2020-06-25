import React from "react"
import clsx from 'clsx'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { rgbSecondary, hexSecondary } from "../../Styles/colors";
import { Tooltip, Link } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  link: {
    fontSize: '.825rem',
    padding: theme.spacing(.5, 1),
    borderRadius: theme.spacing(.5),
    '&:hover': {
      textDecoration: 'none'
    }
  },
  linkClear: {
    color: 'rgba(0,0,0,.6)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.04)'
    }
  },
  linkOk: {
    color: hexSecondary,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: `rgba(${rgbSecondary}, .04)`
    }
  }
}));

export default function CtrlActions(props) {
  const { titleClear, titleOk, callbackClear, callbackOk, className } = props
  const classes = useStyles()
  return (
    <span className={className}>
        <Tooltip title={titleClear}>
          <Link className={clsx(classes.link, classes.linkClear)} href='#' onClick={callbackClear}>Clear</Link>
        </Tooltip>
        <Tooltip title={titleOk}>
          <Link className={clsx(classes.link, classes.linkOk)} href='#' onClick={callbackOk}>OK</Link>
        </Tooltip>
    </span>
  );
}
