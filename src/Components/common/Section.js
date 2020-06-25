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
  }
}))

export default function Section(props) {
  const { className, ...other } = props
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)} {...other} />
  )
}