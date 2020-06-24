import React from 'react'
import clsx from 'clsx'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { pxFieldHeight } from '../../Styles/colors'

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      fontSize: '0.875rem',
      lineHeight: '1.43',
      height: pxFieldHeight
    },

    '& .MuiInputBase-input': {
      height: 'unset',
      padding: theme.spacing(1, 2)
    },

    '& .MuiOutlinedInput-adornedEnd .MuiSvgIcon-root': {
      color: 'rgba(0,0,0,.24)',
      fontSize: '1.25rem',
    },

    '& .MuiOutlinedInput-adornedStart .MuiSvgIcon-root': {
      color: 'rgba(0,0,0,.24)',
      fontSize: '1.25rem',
    }
  }
}))

export default function SirTextField(props) {
  const { inputRef, className, ...other } = props
  const classes = useStyles()

  return (
    <TextField
      className={clsx(classes.root, className)}
      variant='outlined'
      size='small'
      InputLabelProps={{ shrink: true }}
      fullWidth
      hiddenLabel
      inputRef={inputRef} // must be explicitly set for focus() to work
      {...other}
    />
  )
}