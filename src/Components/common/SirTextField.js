import React from 'react'
import clsx from 'clsx'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
  }
}))

export default function SirTextField(props) {
  const { inputRef, className, ...other } = props
  const classes = useStyles()

  return (
    <TextField
      className={clsx(classes.root, className)}
      variant='outlined'
      InputLabelProps={{ shrink: true }}
      fullWidth
      hiddenLabel
      inputRef={inputRef} // must be explicitly set for focus() to work
      {...other}
    />
  )
}