import React from "react"
import clsx from "clsx"
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 0,
    padding: 0,
  },
  brd_none: {},
  brd_top: {
    borderTop: 'solid 1px rgba(0,0,0,.06)'
  }
}))

export default function Section(props) {
  const { border = 'none', className, ...other } = props
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className, classes['brd_' + border])} {...other} />
  )
}